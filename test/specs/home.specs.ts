import homePage from "../pageobjects/home.page";
describe("home page visualize", () => {
  before("open brower", async () => {
    homePage.open();
  });

  it("should compare a tabbable screenshot successful with baseline ", async () => {
    await homePage.checkTabbablePage();
  });

  it("should compare a full page screenshot successful with baseline ", async () => {
    await browser.checkFullPageScreen("full-page-tag")
  })
  it("should compare a element navbar successful with baseline", async () => {
    await homePage.checkNavbarDisplay();
  });

  it("should compare a element banner successful with baseline", async () => {
    await homePage.checkOverviewBannerDisplay();
  });
});
