import fs from 'fs';
import { publicIpv4, publicIpv6 } from 'public-ip';
import puppeteerExtra from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import sourceMapSupport from 'source-map-support';
import { findArticle, findPageWithAds } from './pages/find-page.js';
import { PageType, scrapePage } from './pages/page-scraper.js';
import DbClient from './util/db.js';
import * as log from './util/log.js';
import { createAsyncTimeout, sleep } from './util/timeout.js';
import { scrapeAdsOnPage } from './ads/ad-scraper.js';
import path from 'path';
import csvParser from 'csv-parser';

// Ritik
import Xvfb from 'xvfb';

sourceMapSupport.install();
;
function setupGlobals(crawlerFlags) {
    globalThis.FLAGS = crawlerFlags;
    // How long the crawler can spend on each clickthrough page
    globalThis.CLICKTHROUGH_TIMEOUT = 30 * 1000; // 30s
    // How long the crawler should wait for something to happen after clicking an ad
    globalThis.AD_CLICK_TIMEOUT = 10 * 1000; // 10s
    // How long the crawler can spend waiting for the HTML of a page.
    globalThis.PAGE_CRAWL_TIMEOUT = 180 * 1000; // 3min
    // How long the crawler can spend waiting for the HTML and screenshot of an ad.
    // must be greater than |AD_SLEEP_TIME|
    globalThis.AD_CRAWL_TIMEOUT = 20 * 1000; // 20s
    // How long the crawler should sleep before scraping/screenshotting an ad
    globalThis.AD_SLEEP_TIME = 5 * 1000; // 5s
    // How long the crawler should sleep before crawling a page
    globalThis.PAGE_SLEEP_TIME = 10 * 1000; // 10s
    // Size of the viewport
    globalThis.VIEWPORT = { width: 1366, height: 768 };
}
export async function crawl(flags) {
    // Initialize global variables and clients
    // console.log(flags);
    setupGlobals(flags);
    // Validate arguments
    if (!fs.existsSync(flags.outputDir)) {
        console.log(`${flags.outputDir} is not a valid directory`);
        process.exit(1);
    }
    const db = await DbClient.initialize(flags.pgConf);
    let crawlList = [];
    let crawlListAdIds = [];
    if (!fs.existsSync(flags.crawlListFile)) {
        console.log(`${flags.crawlListFile} does not exist.`);
        process.exit(1);
    }
    if (flags.crawlListHasReferrerAds) {
        await (new Promise((resolve, reject) => {
            fs.createReadStream(flags.crawlListFile)
                .pipe(csvParser())
                .on('data', data => {
                crawlList.push(data.url);
                crawlListAdIds.push(data.ad_id);
            }).on('end', () => {
                resolve();
            });
        }));
        console.log(crawlList);
        console.log(crawlListAdIds);
    }
    else {
        crawlList = fs.readFileSync(flags.crawlListFile).toString().trimEnd().split('\n');
    }
    let i = 1;
    for (let url of crawlList) {
        try {
            // url = 'http://' + url;
            new URL(url);
        }
        catch (e) {
            log.strError(`Invalid URL in ${flags.crawlListFile}, line ${i}: ${url}`);
            process.exit(1);
        }
    }
    // Now that the length of the crawl list is known, set the global timeout
    const OVERALL_TIMEOUT = crawlList.length * 15 * 60 * 1000;
    // Set up crawl entry, or resume from previous.
    // let crawlId: number;
    let crawlListStartingIndex = 0;
    if (!FLAGS.crawlId) {
        globalThis.CRAWL_ID = await db.insert({
            table: 'crawl',
            returning: 'id',
            data: {
                job_id: FLAGS.jobId,
                name: FLAGS.name,
                start_time: new Date(),
                completed: false,
                crawl_list: FLAGS.crawlListFile,
                crawl_list_current_index: 0,
                crawl_list_length: crawlList.length,
                profile_dir: FLAGS.chromeOptions.profileDir,
                crawler_hostname: FLAGS.crawlerHostname,
                crawler_ip: await getPublicIp()
            }
        });
    }
    else {
        const prevCrawl = await db.postgres.query('SELECT * FROM crawl WHERE id=$1', [FLAGS.crawlId]);
        if (prevCrawl.rowCount !== 1) {
            console.log(`Invalid crawl_id: ${FLAGS.crawlId}`);
            process.exit(1);
        }
        if (path.basename(prevCrawl.rows[0].crawl_list) != path.basename(FLAGS.crawlListFile)) {
            console.log(`Crawl list file provided does not the have same name as the original crawl. Expected: ${path.basename(prevCrawl.rows[0].crawl_list)}, actual: ${path.basename(FLAGS.crawlListFile)}`);
            process.exit(1);
        }
        if (prevCrawl.rows[0].crawl_list_length != crawlList.length) {
            console.log(`Crawl list file provided does not the have same number of URLs as the original crawl. Expected: ${prevCrawl.rows[0].crawl_list_length}, actual: ${crawlList.length}`);
            process.exit(1);
        }
        globalThis.CRAWL_ID = FLAGS.crawlId;
        crawlListStartingIndex = prevCrawl.rows[0].crawl_list_current_index;
    }
    // Open browser
    log.info('Launching browser...');
    
    // Ritik
    
    var xvfb = new Xvfb({
        silent: true,
        reuse: true,
        xvfb_args: ["-screen", "0", '1280x720x24', "-ac"],
    });
    xvfb.startSync((err)=>{if (err) console.error(err)})

    var p_args;
    if (FLAGS.chromeOptions.extnPath === 'control'){
        p_args = [
	    '--display='+xvfb._display,
	    '--no-sandbox',
	    '--disable-gpu',
            '--disable-dev-shm-usage', 
            '--start-maximized',
            '--disable-extensions-except=./extn_src/consent',
            '--load-extension=./extn_src/consent',
	    '--remote-debugging-port=9222'
        ];
    }
    else{
        p_args= [
	    '--no-sandbox',
	    '--disable-gpu',
            '--disable-dev-shm-usage', 
            '--start-maximized',
            `--disable-extensions-except=./extn_src/${FLAGS.chromeOptions.extnPath},./extn_src/consent`,
            `--load-extension=./extn_src/${FLAGS.chromeOptions.extnPath}, ./extn_src/consent`
        ];
    }
    // console.log(FLAGS.chromeOptions.executablePath);

    puppeteerExtra.default.use(StealthPlugin());
    globalThis.BROWSER = await puppeteerExtra.default.launch({
        args: p_args, // Ritik
        // defaultViewport: null, // Ritik
        defaultViewport: VIEWPORT,
        headless: FLAGS.chromeOptions.headless,
        handleSIGINT: false,
        userDataDir: FLAGS.chromeOptions.profileDir
        ,
        executablePath: FLAGS.chromeOptions.executablePath,
        dumpio: true,
	timeout: 60000,
        // executablePath: '/usr/bin/google-chrome'
    });
    process.on('SIGINT', async () => {
        console.log('SIGINT received, closing browser...');
        await BROWSER.close();
        process.exit();
    });
    const version = await BROWSER.version();
    log.info('Running ' + version);

    // Ritik 
    if (FLAGS.chromeOptions.extnPath === 'adblock'){
        await sleep(10000);
    } else {
        await sleep(2000);
    }

    try {
        const test = await BROWSER.newPage();
        await test.setViewport({ width: 1280, height: 720 });
        await test.goto('chrome://extensions', { timeout: 120000 });
        await test.screenshot({
            path: 'out/extension_verification.jpg'
        });
    } catch (e) {
        await BROWSER.close();
        throw e;
    };

    try {
        // Main loop through crawl list
        for (let i = crawlListStartingIndex; i < crawlList.length; i++) {
            const url = crawlList[i];
            
            // Ritik
            // await sleep(5000);
            var url_key = "";
            // extract url_key to name screenshot folders 
            let pattern = /:\/\/(ww[\w\d]\.?)/;
            let match = url.match(pattern);
            
            if (match){
                url_key = url.split(match[0])[1];
            } else {
                url_key = url.split('://')[1];
            }
            if (url_key == ""){
                continue;
            }
            url_key = url_key.split('/')[0]
            FLAGS['dir_path'] = url_key;

            let prevAdId = FLAGS.crawlListHasReferrerAds ? crawlListAdIds[i] : -1;
            // Set overall timeout for this crawl list item
            let [urlTimeout, urlTimeoutId] = createAsyncTimeout(`${url}: overall site timeout reached`, OVERALL_TIMEOUT);
            let seedPage = await BROWSER.newPage();
            try {
                let _crawl = (async () => {
                    // Insert record for this crawl list item
                    try {
                        // Open the URL and scrape it (if specified)
                        let pageId;
                        if (FLAGS.crawlListHasReferrerAds) {
                            pageId = await loadAndHandlePage(url, seedPage, { pageType: PageType.LANDING, referrerAd: prevAdId });
                        }
                        else {
                            pageId = await loadAndHandlePage(url, seedPage, { pageType: PageType.MAIN });
                        }
                        // Open additional pages (if specified) and scrape them (if specified)
                        if (FLAGS.crawlOptions.crawlAdditionalArticlePage) {
                            const articleUrl = await findArticle(seedPage);
                            if (articleUrl) {
                                const articlePage = await BROWSER.newPage();
                                await loadAndHandlePage(articleUrl, articlePage, {
                                    pageType: PageType.SUBPAGE,
                                    referrerPageId: pageId,
                                    referrerPageUrl: seedPage.url()
                                });
                                await articlePage.close();
                            }
                            else {
                                log.strError(`${url}: Couldn't find article`);
                            }
                        }
                        if (FLAGS.crawlOptions.crawlAdditionalPageWithAds) {
                            const urlWithAds = await findPageWithAds(seedPage);
                            if (urlWithAds) {
                                const adsPage = await BROWSER.newPage();
                                await loadAndHandlePage(urlWithAds, adsPage, {
                                    pageType: PageType.SUBPAGE,
                                    referrerPageId: pageId,
                                    referrerPageUrl: seedPage.url()
                                });
                                await adsPage.close();
                            }
                            else {
                                log.strError(`${url}: Couldn't find article`);
                            }
                        }
                    }
                    catch (e) {
                        log.error(e);
                        throw e;
                    }
                    finally {
                        clearTimeout(urlTimeoutId);
                    }
                })();
                await Promise.race([_crawl, urlTimeout]);
            }
            catch (e) {
                log.error(e);
            }
            finally {
                await seedPage.close();
                await db.postgres.query('UPDATE crawl SET crawl_list_current_index=$1 WHERE id=$2', [i + 1, CRAWL_ID]);
            }
        }
        await BROWSER.close();
        await db.postgres.query('UPDATE crawl SET completed=TRUE, completed_time=$1 WHERE id=$2', [new Date(), CRAWL_ID]);
        
	// Ritik
	await xvfb.stopSync();
    }
    catch (e) {
        await BROWSER.close();
        throw e;
    }
}
/**
 *
 * @param url URL to visit in the page
 * @param page Tab/Page that the URL should be visited in
 * @param metadata Crawl metadata
 * @returns The page ID of the crawled page in the database
 */
async function loadAndHandlePage(url, page, metadata) {
    log.info(`${url}: Loading page`);
    // if (FLAGS.scrapeOptions.scrapeAds) {
    //   await domMonitor.injectDOMListener(page);
    // }
    // Set up request interception for capturing third party requests
    await page.setRequestInterception(true);
    let requests = [];
    const captureThirdPartyRequests = async (request) => {
        // Exit if request capture is disabled
        if (!FLAGS.scrapeOptions.captureThirdPartyRequests) {
            request.continue(undefined, 0);
            return;
        }
        // Exit if request is navigating this tab
        if (request.isNavigationRequest() && request.frame() === page.mainFrame()) {
            request.continue(undefined, 0);
            return;
        }
        // Exclude same origin requests
        if (new URL(request.url()).origin == new URL(page.url()).origin) {
            request.continue(undefined, 0);
            return;
        }
        requests.push({
            timestamp: new Date(),
            parent_page: -1,
            initiator: page.url(),
            target_url: request.url(),
            resource_type: request.resourceType(),
        });
        request.continue(undefined, 0);
    };
    page.on('request', captureThirdPartyRequests);
    await page.goto(url, { timeout: 120000 });
    await sleep(PAGE_SLEEP_TIME);
    log.info(`${url}: Page finished loading`);
    await scrollDownPage(page);
    // Crawl the page
    let pageId;
    if (FLAGS.scrapeOptions.scrapeSite) {
        pageId = await scrapePage(page, {
            crawlListUrl: url,
            pageType: metadata.pageType,
            referrerAd: metadata.referrerAd
        });
    }
    else {
        // If we're not scraping page, still create a database entry (without)
        // any of the scraped contents
        const db = DbClient.getInstance();
        pageId = await db.archivePage({
            job_id: FLAGS.jobId,
            crawl_id: CRAWL_ID,
            timestamp: new Date(),
            url: page.url(),
            crawl_list_url: url,
            page_type: metadata.pageType,
            referrer_ad: metadata.referrerAd,
            referrer_page: metadata.referrerPageId,
            referrer_page_url: metadata.referrerPageUrl
        });
    }
    if (FLAGS.scrapeOptions.scrapeAds) {
        await scrapeAdsOnPage(page, {
            crawlListUrl: url,
            pageType: metadata.pageType,
            parentPageId: pageId,
        });
    }
    // Save third party requests
    if (FLAGS.scrapeOptions.captureThirdPartyRequests) {
        log.info(`${url}: Saving same-site and cross-site requests`);
        const db = DbClient.getInstance();
        for (let request of requests) {
            request.parent_page = pageId;
            await db.archiveRequest(request);
        }
    }
    // Clean up event listeners
    page.removeAllListeners('request');
    await page.setRequestInterception(false);
    return pageId;
}
async function scrollDownPage(page) {
    log.info(`${page.url()}: Scrolling page from top to bottom`);
    let innerHeight = await page.evaluate(() => window.innerHeight);
    let scrollY = await page.evaluate(() => window.scrollY);
    let scrollHeight = await page.evaluate(() => document.body.scrollHeight);
    let i = 0;
    // Scroll until at the bottom of the page or 30 iterations pass
    while (scrollY + innerHeight < scrollHeight && i < 45) {
        // set a screen position to scroll from
        let xloc = randrange(50, 100);
        let yloc = randrange(50, 100);
        // Scroll a random amount
        let ydelta = randrange(100, 200);
        // puppeteer provides current mouse position to wheel mouse event
        await page.mouse.move(xloc, yloc);
        await page.mouse.wheel({ deltaY: ydelta });
        await sleep(1000);
        // innerHeight = await page.evaluate(() => window.innerHeight);
        scrollY = await page.evaluate(() => window.scrollY);
        // scrollHeight = await page.evaluate(() => document.body.scrollHeight);
        i += 1;
    }
}
function randrange(low, high) {
    return Math.random() * (high - low) + low;
}
async function getPublicIp() {
    try {
        let v4 = await publicIpv4();
        if (v4) {
            return v4;
        }
    }
    catch (e) {
        console.log(e);
        try {
            let v6 = await publicIpv6();
            if (v6) {
                return v6;
            }
        }
        catch (e) {
            console.log(e);
            return null;
        }
    }
}
//# sourceMappingURL=crawler.js.map
