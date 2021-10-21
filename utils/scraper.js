const fs = require("fs");

const getTableData = async (page) => {
  const data = await page.$$eval("tr", (rows) => {
    rows = Array.from(rows, (row) => {
      const columns = row.querySelectorAll("td");
      const [iso, currency, usage] = Array.from(
        columns,
        (column) => column.innerText
      );
      const links = row.querySelectorAll("td > a");

      const [link] = Array.from(links, (link) => link.href);

      return {
        iso,
        currency,
        usage,
        link: link,
      };
    });
    return rows;
  });
  return data;
};

const pagePromise = ({ iso, currency, usage, link }, browser) =>
  new Promise(async (resolve, reject) => {
    const dataObj = { iso, currency, usage, link };
    const newPage = await browser.newPage();

    await newPage.goto(link);

    dataObj["rate"] = await newPage.$eval(
      "div.currency",
      (text) => text.textContent
    );
    resolve(dataObj);
    await newPage.close();
  });

const scraperObject = {
  url: "https://www.worlddata.info/currencies",
  async scraper(browser) {
    const scrapedData = [];
    let currentPageData = null;
    const page = await browser.newPage();
    await page.goto(this.url);
    await page.waitForSelector("table > tbody > tr");
    const data = await getTableData(page);

    for (let i = 1, l = data.length; i < l; i++) {
      currentPageData = await pagePromise(data[i], browser);
      scrapedData.push(currentPageData);
    }

    fs.writeFile(
      "data.json",
      JSON.stringify(scrapedData),
      {
        encoding: "utf8",
      },
      (err) => {
        if (err) console.log("Could not finish file writing => ", err);
      }
    );
  },
};

module.exports = scraperObject;
