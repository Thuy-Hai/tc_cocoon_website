import Page from "../page";
import { expect } from "chai";
class SearchPage extends Page {
  public get btnIconSearch() {
    return $(".icon-search");
  }

  public get inputSearch() {
    return $('input[type="text"].text-2xl');
  }

  public get productList() {
    return $("div.animate-fade-in.mt-4");
  }

  public get messageNotFound() {
    return $(
      "div=Thật không may, chúng tôi không thể tìm thấy bất kỳ kết quả nào cho tìm kiếm của bạn."
    );
  }

  public get suggestionElement() {
    return $("aria/Nước tẩy trang");
  }

  private async waitForSearchButtonClickable() {
    await browser.waitUntil(
      async () => await this.btnIconSearch.isClickable(),
      {
        timeout: 60000,
        timeoutMsg: "Button to search not clickable after 25s",
      }
    );
  }

  public async searchProduct(input: string) {
    await this.waitForSearchButtonClickable();
    await this.btnIconSearch.click();
    await this.inputSearch.setValue(input);
  }

  public async checkIfContainsProductName(productName: string) {
    const divText = await this.productList.getText();
    const containsProductName = divText.includes(productName);
    expect(containsProductName).to.be.true;
  }

  public async checkMessageNotFoundDisplayed() {
    await this.messageNotFound.waitForDisplayed({ timeout: 5000 });
    const isMessegeNotFoundDisplay = await this.messageNotFound.isDisplayed();
    expect(isMessegeNotFoundDisplay).to.be.true;
  }

  public async checkInputIsEmpty() {
    const isProductListDisplayed = await this.productList.isDisplayed();
    expect(isProductListDisplayed).to.be.true;
    const isMessegeNotFoundDisplay = await this.messageNotFound.isDisplayed();
    expect(isMessegeNotFoundDisplay).to.be.false;
  }

  public async searchBySuggestion() {
    await this.waitForSearchButtonClickable();
    await this.btnIconSearch.click();
    await this.suggestionElement.click();
  }

  public open() {
    return super.open("");
  }
}

export default new SearchPage();
