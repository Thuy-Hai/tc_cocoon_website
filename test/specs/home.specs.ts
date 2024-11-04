import homePage from "../pageobjects/home.page";
describe("homePage Visualize", () => {
  beforeEach("Open Home Page", () => {
    homePage.open();
  });

    it("verify element in home page display", async () => {
        await homePage.checkNavbarVisualize();
  });
});
