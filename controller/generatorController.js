const generator = require("../utils/generator");

async function generatePDF(browserInstance) {
  try {
    const browser = await browserInstance;
    await generator.generator(browser);
  } catch (err) {
    console.log("Could not resolve the generator browser instance => ", err);
  }
}

module.exports = (browserInstance) => generatePDF(browserInstance);
