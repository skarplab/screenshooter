const puppeteer = require('puppeteer');
const strftime = require('strftime');
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

async function run(url) {

    const now = strftime('%Y%m%d%H%M%S');
    const screenshotFile = `screenshot_${now}.jpg`;

    let browser = await puppeteer.launch();
    let page = await browser.newPage();
    await page.setViewport({
        width: 2200,
        height: 1700
    });
    
    console.log(`Going to ${url}...`)
    await page.goto(url, {
        waitUntil: "networkidle2"
    });

    console.log('Pause for page rendering...')
    await page.waitFor(5000)

    console.log('Taking screenshot...')
    await page.screenshot({
        path: `./${screenshotFile}`,
        type: 'jpeg',
        fullPage: true
    });

    console.log('Closing browser...')
    await browser.close();

    console.log(`Your screenshot is available as ${screenshotFile}.` )
}


readline.question('What is the URL of the site you\'d like to screenshot? ', (url) => {
    run(url);
    readline.close();
})
