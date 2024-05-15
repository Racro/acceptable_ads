import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { v4 as uuidv4 } from 'uuid';
import DbClient from '../util/db.js';
import getCrawlOutputDirectory from '../util/getCrawlOutputDirectory.js';
import * as log from '../util/log.js';
import { createAsyncTimeout, sleep } from '../util/timeout.js';
import { identifyAdsInDOM } from './ad-detection.js';
import { splitChumbox } from './chumbox-handler.js';
import { clickAd } from './click.js';
import { scrapeIFramesInElement } from './iframe-scraper.js';
export async function scrapeAdsOnPage(page, metadata) {
    const db = DbClient.getInstance();
    // Detect ads
    const ads = await identifyAdsInDOM(page);
    // console.log('debug');
    // console.log(ads);

    const adHandleToAdId = new Map();
    log.info(`${page.url()}: ${ads.size} ads identified`);
    let i = 1;

    // Ritik
    var url_dict = {}; // store landing URLs of ads
    var ad_dimension = {}; // store coordinates of ads

    // Main loop through all ads on page
    for (let ad of ads) {
        log.info(`${page.url()}: Scraping ad ${i} of ${ads.size}`);
        // An ad can contain multiple sub-ads (a "chumbox"). We store the handles
        // in case this happens.
        let adHandles;
        let chumboxId;
        let platform;
        // Check and see if the ad is a chumbox.
        let chumbox = await splitChumbox(ad);
        if (chumbox) {
            // If it is a chumbox, create the metadata in the database...
            chumboxId = await db.insert({
                table: 'chumbox',
                returning: 'id',
                data: { platform: chumbox.platform, parent_page: metadata.parentPageId }
            });
            platform = chumbox.platform;
            // And use the array of ad handles for the next part.
            adHandles = chumbox.adHandles;
        }
        else {
            // Otherwise, the array is just the one ad.
            adHandles = [{ clickTarget: ad, screenshotTarget: ad }];
        }
        for (let adHandle of adHandles) {
            let adId = -1;
            try {
                // Scrape the ad
                const scrapeTarget = adHandle.screenshotTarget
                    ? adHandle.screenshotTarget
                    : adHandle.clickTarget;
                adId = await scrapeAd(scrapeTarget, page, {
                    pageType: metadata.pageType,
                    parentPageId: metadata.parentPageId,
                    crawlListUrl: metadata.crawlListUrl,
                    chumboxId: chumboxId,
                    platform: platform
                }, ad_dimension);
                adHandleToAdId.set(ad, adId);
            }
            catch (e) {
                log.warning('Couldn\'t scrape ad: ' + e);
                i += 1;
                continue;
            }
            try {
                if (FLAGS.scrapeOptions.clickAds !== 'noClick') {
                    // Abort if the ad is non-existent or too small
                    const bounds = await adHandle.clickTarget.boundingBox();
                    if (!bounds) {
                        log.warning(`Aborting click on ad ${adId}: no bounding box`);
                        continue;
                    }
                    if (bounds.height < 30 || bounds.width < 30) {
                        log.warning(`Aborting click on ad ${adId}: bounding box too small (${bounds.height},${bounds.width})`);
                        continue;
                    }
                    // Ok, we're cleared to click.
                    await clickAd(adHandle.clickTarget, page, adId, metadata.parentPageId, metadata.crawlListUrl, url_dict);
                }
            }
            catch (e) {
                log.warning('Couldn\'t click ad: ' + e);
            }
            i += 1;
        }
    }
    // const mutations = await matchDOMUpdateToAd(page, adHandleToAdId);
    // if (mutations.length > 0) {
    //   for (let mutation of mutations) {
    //     await db.insert({
    //       table: 'ad_domain',
    //       data: mutation
    //     });
    //   }
    // }

    // Ritik
    // const fs = require("fs");
    const adsDir = path.join(await getCrawlOutputDirectory(), FLAGS.dir_path);
    if (!fs.existsSync(adsDir)) {
        fs.mkdirSync(adsDir, { recursive: true });
    }
 
    try{
        fs.writeFile(
            `${adsDir}/ad_url.json`,
            JSON.stringify(url_dict),
            err => {
                // Checking for errors 
                if (err) throw err;

                // Success 
                console.log("Done writing ad_url");
            });
        fs.writeFile(
            `${adsDir}/ad_dimension.json`,
            JSON.stringify(ad_dimension),
            err => {
                // Checking for errors 
                if (err) throw err;

                // Success 
                console.log("Done writing ad_dimension");
            });
    } catch (err){
        console.error('Error writing to file:', err);
    }
}
/**
 * Scrapes the content and takes a screenshot of an ad embedded in a page,
 * including all sub-frames, and then saves it in the adscraper database.
 * @param ad A handle to the HTML element bounding the ad.
 * @param page The page the ad appears on.
 * @param metadata Crawler metadata linked to this ad.
 * @returns Promise containing the database id of the scraped ad, once it is
 * done crawling/saving.
 */
// export async function scrapeAd(ad, page, metadata)
export async function scrapeAd(ad, page, metadata, ad_dimension) {  // Ritik
    const db = DbClient.getInstance();
    let [timeout, timeoutId] = createAsyncTimeout(`${page.url()}: timed out while crawling ad`, AD_CRAWL_TIMEOUT);
    // Declare adId here - we create an empty row in the database before
    // the ad is scraped, so we can use the id for the directory name.
    // If the process fails at an point, we have the adId in
    // scope so we can delete it.
    let adId;
    const _crawlAd = (async () => {
        try {
            // Create an ad id for the directory
            adId = await db.createEmptyAd();
            // Scroll ad into view, and sleep to give it time to load.
            await page.evaluate((e) => {
                e.scrollIntoView({ block: 'center' });
            }, ad);
            await sleep(AD_SLEEP_TIME);
            // const adsDir = path.join(await getCrawlOutputDirectory(), 'scraped_ads/ad_' + adId);
            const adsDir = path.join(await getCrawlOutputDirectory(), FLAGS.dir_path, 'scraped_ads/ad_' + adId); // Ritik
            if (!fs.existsSync(adsDir)) {
                fs.mkdirSync(adsDir, { recursive: true });
            }
            // Scrape ad content
            const adContent = await scrapeAdContent(page, ad, adsDir, FLAGS.crawlerHostname, FLAGS.scrapeOptions.screenshotAdsWithContext, adId, ad_dimension);
            await db.updateAd(adId, {
                job_id: FLAGS.jobId,
                crawl_id: CRAWL_ID,
                parent_page: metadata.parentPageId,
                parent_page_url: page.url(),
                parent_page_type: metadata.pageType,
                chumbox_id: metadata.chumboxId,
                platform: metadata.platform,
                ...adContent
            });
            log.debug(`${page.url()}: Archived ad content with id ${adId}`);
            // Extract 3rd party domains from ad
            // const adExternals = await extractExternalUrls(ad);
            // await db.archiveExternalUrls(adExternals, adId);
            // Scrape iframe content in ad
            const scrapedIFrames = await scrapeIFramesInElement(ad);
            for (let scrapedIFrame of scrapedIFrames) {
                await db.archiveScrapedIFrame(scrapedIFrame, adId, undefined);
            }
            clearTimeout(timeoutId);
            return adId;
        }
        catch (e) {
            clearTimeout(timeoutId);
            if (adId) {
                db.postgres.query('DELETE FROM ad WHERE id=$1', [adId]);
            }
            throw e;
        }
    })();
    try {
        const res = await Promise.race([timeout, _crawlAd]);
        return res;
    }
    catch (e) {
        if (adId) {
            db.postgres.query('DELETE FROM ad WHERE id=$1', [adId]);
            // const dir = path.join(await getCrawlOutputDirectory(), 'scraped_ads/ad_' + adId);
            const dir = path.join(await getCrawlOutputDirectory(), FLAGS.dir_path, 'scraped_ads/ad_' + adId); // Ritik
            if (fs.readdirSync(dir).length == 0) {
                fs.rmdirSync(dir);
            }
        }
        throw e;
    }
}
/**
 * Collects the content of the ad.
 * - Takes a screenshot
 * - Saves the HTML content of the ad
 * - Collects bid values from prebid.js, if available
 * @param page The page the element appears on
 * @param ad The ad/element to scroll to/scrape
 * @param screenshotDir Where the screenshot should be saved
 * @param screenshotHost The hostname of the machine on which the screenshot
 * will be stored.
 * @param adId The id that references this ad in the database. Optional,
 * uses a UUID otherwise.
 * @returns A promise containing id of the stored ad in the database.
*/
async function scrapeAdContent(page, ad, screenshotDir, 
// externalScreenshotDir: string | undefined,
// screenshotHost, withContext, adId) {
screenshotHost, withContext, adId, ad_dimension) { // Ritik
    // Collect the HTML content
    const html = await page.evaluate((e) => e.outerHTML, ad);
    const screenshotFile = (adId ? 'ad_' + adId : uuidv4()) + '.webp';
    const savePath = path.join(screenshotDir, screenshotFile);
    // const realPath = externalScreenshotDir
    // ? path.join(externalScreenshotDir, screenshotFile)
    // : undefined;
    let screenshotFailed = false;
    let adInContextBB;
    await page.evaluate((e) => {
        e.scrollIntoView({ block: 'center' });
    }, ad);
    const abb = await ad.boundingBox();
    if (!abb) {
        throw new Error('No ad bounding box');
    }
    if (abb.height < 30 || abb.width < 30) {
        throw new Error('Ad smaller than 30px in one dimension');
    }
    const viewport = page.viewport();
    if (!viewport) {
        throw new Error('Page has no viewport');
    }
    // Round the bounding box values in case they are non-integers
    var d = new Date();
    let adBB = {
        left: Math.max(0, Math.floor(abb.x)),
        top: Math.max(0, Math.floor(abb.y)),
        height: Math.ceil(abb.height),
        width: Math.ceil(abb.width),
        time: d.toString()
    };

    ad_dimension[adId] = adBB;

    // Compute bounding box if a margin is desired
    const margin = 150;
    const contextLeft = Math.max(adBB.left - margin, 0);
    const contextTop = Math.max(adBB.top - margin, 0);
    const marginTop = adBB.top - contextTop;
    const marginLeft = adBB.left - contextLeft;
    const marginBottom = adBB.top + adBB.height + margin < viewport.height
        ? margin
        : viewport.height - adBB.height - adBB.top;
    const marginRight = adBB.left + adBB.width + margin < viewport.width
        ? margin
        : viewport.width - adBB.width - adBB.left;
    const contextWidth = adBB.width + marginLeft + marginRight;
    const contextHeight = adBB.height + marginTop + marginBottom;
    const contextBB = {
        left: contextLeft,
        top: contextTop,
        height: contextHeight,
        width: contextWidth
    };
    // Recompute ad bounding box within the crop with context
    if (withContext) {
        adInContextBB = {
            left: adBB.left - contextBB.left,
            top: adBB.top - contextBB.top,
            height: adBB.height,
            width: adBB.width
        };
    }
    const buf = await page.screenshot();
    // Crop to element size (puppeteer's built in implementation caused many
    // blank screenshots in the past)
    await sharp(buf)
        .extract(withContext ? contextBB : adBB)
        .webp({ lossless: true })
        .toFile(savePath);
    const prebid = await getPrebidBidsForAd(ad);
    return {
        timestamp: new Date(),
        screenshot: screenshotFailed ? undefined : savePath,
        screenshot_host: screenshotFailed ? undefined : screenshotHost,
        html: html,
        max_bid_price: prebid?.max_bid_price,
        winning_bid: prebid?.winning_bid,
        with_context: withContext,
        bb_x: adInContextBB?.left,
        bb_y: adInContextBB?.top,
        bb_height: adInContextBB?.height,
        bb_width: adInContextBB?.width
    };
}
/**
 * Attempts to extract the bid price for this ad from the prebid.js library,
 * if available on the page.
 * @param ad The ad to get bid values from.
 */
function getPrebidBidsForAd(ad) {
    try {
        return ad.evaluate((ad) => {
            // Check if the page has prebid
            // @ts-ignore
            if (typeof pbjs === 'undefined' || pbjs.getAllWinningBids === undefined) {
                return { max_bid_price: undefined, winning_bid: undefined };
            }
            function isChildOfAd(element) {
                if (!element) {
                    return false;
                }
                if (element === ad) {
                    return true;
                }
                let current = element;
                while (current !== document.body && current.parentNode !== null) {
                    current = current.parentNode;
                    if (element === ad) {
                        return true;
                    }
                }
                return false;
            }
            // Check if any winning bids match the ad element (or its children).
            // @ts-ignore
            const winningBids = pbjs.getAllWinningBids();
            const matchingWins = winningBids.filter((win) => {
                return isChildOfAd(document.getElementById(win.adUnitCode));
            });
            if (matchingWins.length !== 0) {
                const matchingWin = matchingWins[0];
                return { max_bid_price: matchingWin.cpm, winning_bid: true };
            }
            // Check if any other bids match the children
            // @ts-ignore
            const bidResponses = pbjs.getBidResponses();
            const matches = Object.keys(bidResponses).filter(key => {
                return isChildOfAd(document.getElementById(key));
            });
            if (matches.length === 0) {
                return { max_bid_price: undefined, winning_bid: undefined };
            }
            const match = matches[0];
            if (!bidResponses[match].bids) {
                return { max_bid_price: undefined, winning_bid: undefined };
            }
            return {
                max_bid_price: Math.max(...bidResponses[match].bids.map((b) => b.cpm)),
                winning_bid: false
            };
        });
    }
    catch (e) {
        log.warning('Error in Prebid data collection: ' + e.message);
    }
}
//# sourceMappingURL=ad-scraper.js.map