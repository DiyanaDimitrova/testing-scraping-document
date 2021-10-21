const fs = require("fs");

const generatorObject = {
  async generator(browser) {
    const page = await browser.newPage();

    const html = fs.readFileSync(`${__dirname}/assets/template.html`, "utf8");
    await page.setContent(html, {
      waitUntil: "domcontentloaded",
    });

    await page.pdf({
      format: "A4",
      path: `${__dirname}/assets/document.pdf`,
    });
  },
};

module.exports = generatorObject;
