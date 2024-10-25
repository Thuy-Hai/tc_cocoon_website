import searchPage from "../pageobjects/funtional/search.page";
import allureReporter from "@wdio/allure-reporter";

describe("  search function", function () {
  beforeEach("should open the website before search", async () => {
    allureReporter.addFeature("Feature before search");
    await searchPage.open();
  });

  afterEach(async () => {
    await browser.execute(() => localStorage.clear());
    await browser.deleteCookies();
  });
  it('should search successful with input "Sữa rửa mặt"', async () => {
    allureReporter.addFeature("Feature search with input valid");
    await searchPage.searchProduct("Sữa rửa mặt");
    await searchPage.checkIfContainsProductName("Sữa rửa mặt");
  });

  it('should search failed with input "ssss"', async () => {
    allureReporter.addFeature("Feature search with input invalid");
    await searchPage.searchProduct("ssss");
    await searchPage.checkMessageNotFoundDisplayed();
  });
  it("should search failed with input empty", async () => {
    allureReporter.addFeature("Feature search with input empty");
    await searchPage.searchProduct("");
    await searchPage.checkInputIsEmpty();
  });

  it("should search successful with suggestion", async () => {
    allureReporter.addFeature("Feature search with seggestion");
    await searchPage.searchBySuggestion();
    await searchPage.checkIfContainsProductName("Sữa rửa mặt");
  });
});
