const puppeteer = require("puppeteer");

async function openBrowser() {
  let browser;
  try {
    browser = await puppeteer.launch({
      headless: true,
    });
  } catch (err) {
    console.log("Could not create a browser instance => : ", err);
  }
  return browser;
}

async function closeBrowser(browserInstance) {
  try {
    const browser = await browserInstance;
    await browser.close();
  } catch (err) {
    console.log("Could not close a browser instance => : ", err);
  }
}
module.exports = {
  openBrowser,
  closeBrowser,
};
