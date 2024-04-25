import * as log from '../util/log.js';
// These functions are used to instrument a page to monitor DOM mutations.
// - |injectDOMListener| should be injected into the page context on load, and
//   tracks all mutations to the DOM.
// - |trackDOMUpdate| receives the mutation events from the listener, and stores
//   temporary metadata about which page and element the mutation occurred on
// - |matchDOMUpdateToAd| matches mutation events to a list of provided known
//   ads.
const pageToHandleToDOMMutatorUrls = new Map();
/**
* Injects MutationEvent listeners into the page to detect DOM changes
* (potentially) made by 3rd party scripts. DOM updates are relayed to puppeteer
* context by exposing the trackDOMUpdate function to the page.
* @param page Page to listen for DOM changes in.
*/
export async function injectDOMListener(page) {
    log.debug(`${page.url()}: Injecting DOM listeners`);
    await page.exposeFunction('sendToPuppeteer', (data) => {
        trackDOMUpdate(page, data);
    });
    await page.evaluateOnNewDocument(() => {
        if (window.top !== window.self) {
            return;
        }
        let idCounter = 1;
        function reportDOMMutation(type, target, stack) {
            if (!stack) {
                return; // Update data is useless if we don't have a stack.
            }
            // Get the new Element, or the new Node's parent Element.
            let element;
            if (target instanceof Element) {
                element = target;
            }
            else {
                let node = target;
                if (!node.parentElement) {
                    return;
                }
                element = node.parentElement;
            }
            // Label the element with an id if necessary so that puppeteer can get a
            // handle to it.
            element.setAttribute('mutatedelement', idCounter.toString());
            // @ts-ignore
            sendToPuppeteer({ eventType: type, elementId: idCounter, stack: stack });
            idCounter++;
        }
        document.addEventListener('DOMNodeInserted', (e) => {
            const stack = new Error().stack; // Record stack trace of modifying code
            const event = e;
            if (!event.target) {
                return;
            }
            reportDOMMutation('DOMNodeInserted', event.target, stack);
        });
        document.addEventListener('DOMNodeRemoved', (e) => {
            const stack = new Error().stack;
            const event = e;
            reportDOMMutation('DOMNodeRemoved', event.relatedNode, stack);
        });
        document.addEventListener('DOMCharacterDataModified', (e) => {
            const stack = new Error().stack;
            const event = e;
            reportDOMMutation('DOMCharacterDataModified', event.relatedNode, stack);
        });
    });
}
/**
 * Puppeteer-side handler for receiving DOM mutation updates, for tracking
 * third party scripts that change the DOM.
 * Takes a browser-side stack trace and DOM element ID from a MutationEvent,
 * extracts the JS resource URLs from the stack trace, and stores a mapping
 * of ElementHandle to URLs in the globally scoped DOM update map.
 * @param page           Page the DOM update occurred on
 * @param data.eventType Type of the detected MutationEvent
 * @param data.elementId ID of the mutated element or its parent
 * @param data.stack     Stack trace of the mutation event
 */
export async function trackDOMUpdate(page, data) {
    try {
        const handle = await page.$(`[mutatedelement="${data.elementId}"]`);
        if (!handle) {
            return;
        }
        // Extract URLs from stack trace
        const lines = data.stack.split('\n').slice(1);
        const urls = lines
            .map((line) => line.substring(7)) // Remove 'at' text at beginning of each line
            .filter((line) => line.includes('http://') || line.includes('https://')) // URL lines only
            .map((line) => {
            if (line.includes('(') && line.includes(')')) {
                // Extract URL from inside parentheses
                const parensContentRegEx = /\(([^()]*)\)/g;
                const regexResult = parensContentRegEx.exec(line);
                if (regexResult && regexResult[1].startsWith('http')) {
                    return regexResult[1];
                }
                else {
                    return null;
                }
            }
            else if (line.startsWith('http')) {
                // Or just grab it from the start of the line
                return line;
            }
            else {
                return null;
            }
        })
            .filter((line) => line !== null)
            .map((line) => line.split(':').slice(0, 2).join(':')) // Remove line numbers
            .filter((url) => new URL(url).hostname !== new URL(page.url()).hostname); // Filter 1st party scripts
        const urlSet = new Set(urls);
        // Look up this page's DOM update map
        let handleToURLs = pageToHandleToDOMMutatorUrls.get(page);
        if (!handleToURLs) {
            handleToURLs = new Map();
            pageToHandleToDOMMutatorUrls.set(page, handleToURLs);
        }
        // Store elementHandle->URLs mapping, merge with existing URLs if they exist
        let prevUrls = handleToURLs.get(handle);
        if (!prevUrls) {
            handleToURLs.set(handle, urlSet);
        }
        else {
            handleToURLs.set(handle, new Set([...prevUrls, ...urlSet]));
        }
    }
    catch (e) {
        log.error(e);
    }
}
/**
 * Given a list of element handles to ads, returns a list of DOM mutations
 * to those elements.
 * @param page The page the ad(s) appeared on
 * @param adHandleToAdId Handles to ads
 */
export async function matchDOMUpdateToAd(page, adHandleToAdId) {
    const adHandleToDOMMutatorUrls = new Map();
    const handleToDOMMutatorUrls = pageToHandleToDOMMutatorUrls.get(page);
    if (!handleToDOMMutatorUrls) {
        return [];
    }
    // Iterate through mutations
    for (let [mutatedHandle, mutatorUrls] of handleToDOMMutatorUrls) {
        // Check if ad handle matches mutated element handle
        for (let [adHandle,] of adHandleToAdId) {
            let match = await page.evaluate((mutated, detectedAd) => {
                let current = mutated;
                while (current !== document.body && current.parentElement !== null) {
                    if (current === detectedAd) {
                        return true;
                    }
                    current = current.parentElement;
                }
                return false;
            }, mutatedHandle, adHandle);
            if (match) {
                const adHandleUrlSet = adHandleToDOMMutatorUrls.get(adHandle);
                if (!adHandleUrlSet) {
                    adHandleToDOMMutatorUrls.set(adHandle, mutatorUrls);
                }
                else {
                    adHandleToDOMMutatorUrls.set(adHandle, new Set([...adHandleUrlSet, ...mutatorUrls]));
                }
                break;
            }
        }
    }
    const mutations = [];
    // Export list of mutations
    for (let [adHandle, mutatorUrls] of adHandleToDOMMutatorUrls) {
        const adId = adHandleToAdId.get(adHandle);
        if (!adId) {
            continue;
        }
        for (let url of mutatorUrls) {
            log.debug(`Ad ${adId} was mutated by ${url}`);
            mutations.push({
                ad_id: adId,
                url: url,
                hostname: new URL(url).hostname,
                type: 'DOM_mutation'
            });
        }
    }
    return mutations;
}
//# sourceMappingURL=dom-monitor.js.map