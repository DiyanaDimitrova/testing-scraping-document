const puppeteer = require("puppeteer");

describe("Currency Test", () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: false,
      slowMo: 300,
    });

    page = await browser.newPage();
    await page.goto("https://www.worlddata.info/currencies");
  });

  it("check table length", async () => {
    const table = await page.$$("table > tbody > tr");
    expect(table).toHaveLength(163);
  });

  it("select Bulgarian Lev", async () => {
    let urls = await page.$$eval("tr > td > a", (rows) =>
      rows.map((el) => el.href)
    );
    let url = urls.find((item) => item.includes("bgn"));
    await page.goto(url);

    const pageURL = await page.url();
    expect(pageURL).toEqual(url);
  });

  it("convert currency", async () => {
    const input = await page.$eval(
      "input[name=amount]",
      (el) => (el.value = 100)
    );

    expect(input).toEqual(100);
  });

  afterAll(() => {
    browser.close();
  });
});
