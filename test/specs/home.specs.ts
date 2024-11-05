import homePage from "../pageobjects/home.page";
describe("home page visualize", () => {
  before("open brower", async () => {
    homePage.open();
  });
  it("verify navbar display", async () => {
    await homePage.checkNavbarDisplay();
  });

  it("verify banner display", async () => {
    await homePage.checkOverviewBannerDisplay();
  });
});
