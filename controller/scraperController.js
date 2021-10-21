const scraper = require("../utils/scraper");

async function scrapeAll(browserInstance) {
  try {
    const browser = await browserInstance;
    await scraper.scraper(browser);
  } catch (err) {
    console.log("Could not resolve the scraping browser instance => ", err);
  }
}

module.exports = (browserInstance) => scrapeAll(browserInstance);
