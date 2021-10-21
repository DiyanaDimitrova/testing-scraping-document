const browserObject = require("./utils/browser");
const scraperController = require("./controller/scraperController");
const generatorController = require("./controller/generatorController");

async function init() {
  try {
    // Open the browser and create a browser instance
    let browserInstance = browserObject.openBrowser();

    // Pass the browser instance to the scraper and generator controller
    await scraperController(browserInstance);
    await generatorController(browserInstance);

    // Close the browser and create a browser instance
    await browserObject.closeBrowser(browserInstance);
  } catch (err) {
    console.log("Error was found =>: ", err);
  }
}

init();
