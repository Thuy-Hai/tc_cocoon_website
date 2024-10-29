import searchPage from "../pageobjects/funtional/search.page";
import allureReporter from "@wdio/allure-reporter";
import searchData from "../data/searchData";
describe("search function", function () {
  beforeEach("open website before search", async () => {
    allureReporter.addFeature("Setup: Open website");
    searchPage.open();
  });

  afterEach("Clear session data", async () => {
    await browser.execute(() => localStorage.clear());
    await browser.deleteCookies();
  });
  it("verify search successful with valid input", async () => {
    allureReporter.addFeature("Feature search with input valid");
    await searchPage.searchProduct(searchData.listData.validData);
    await searchPage.checkIfContainsProductName(searchData.listData.validData);
  });

  it("verify search failed with invalid input ", async () => {
    allureReporter.addFeature("Feature search with input invalid");
    await searchPage.searchProduct(searchData.listData.invalidData);
    await searchPage.checkMessageNotFoundDisplayed();
  });
  it("verify search failed with empty input", async () => {
    allureReporter.addFeature("Feature search with input empty");
    await searchPage.searchProduct(searchData.listData.emptyData);
    await searchPage.checkInputIsEmpty();
  });

  it("verify search successful with suggestion", async () => {
    allureReporter.addFeature("Feature search with suggestion");
    await searchPage.searchBySuggestion();
    await searchPage.checkIfContainsProductName(searchData.listData.sussgestionData);
  });
});
