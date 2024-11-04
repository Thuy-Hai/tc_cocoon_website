import homePage from "../pageobjects/home.page";
describe("Login function", () => {
  beforeEach("Open Home Page", () => {
    homePage.open();
  });

 
    it("verify home page display", async () => {
        await homePage.check();
  });
});
