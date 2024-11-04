import searchPage from "../pageobjects/search.page";
import searchData from "../data/searchData";

describe("search function", function () {
  beforeEach("open website before search", () => {
    searchPage.open();
  });
  it.only("verify search successful with valid input", async () => {
    await searchPage.searchProduct(searchData.listData.validData);
    await searchPage.checkIfContainsProductName(searchData.listData.validData);
  });
  it("verify search failed with invalid input ", async () => {
    await searchPage.searchProduct(searchData.listData.invalidData);
    await searchPage.checkMessageNotFoundDisplayed();
  });
  it("verify search failed with empty input", async () => {
    await searchPage.searchProduct(searchData.listData.emptyData);
    await searchPage.checkInputIsEmpty();
  });
  it("verify search successful with suggestion", async () => {
    await searchPage.searchBySuggestion();
    await searchPage.checkIfContainsProductName(searchData.listData.sussgestionData);
  });
  afterEach("Clear Session Data", () => {
    searchPage.clearData();
  });
});
