import Page from "./page";
import { expect } from "chai";
class SearchPage extends Page {
  public get iconSearch() {
    return $(".icon-search");
  }
  public get inputSearch() {
    return $('input[type="text"].text-2xl');
  }
  public get productList() {
    return $("div.animate-fade-in.mt-4");
  }
  public get messageNotFoundProduct() {
    return $(
      "div=Thật không may, chúng tôi không thể tìm thấy bất kỳ kết quả nào cho tìm kiếm của bạn."
    );
  }
  public get txtSuggestion() {
    return $("aria/Nước tẩy trang");
  }
  public get txtTitleSearch() {
    return $("aria/Nhập từ khóa bạn muốn tìm kiếm");
  }

 
  public async searchProduct(input: string) {
    await this.iconSearch.waitForClickable({ timeout: 10000 });
    await this.iconSearch.click();
    await this.inputSearch.setValue(input);
  }
  public async checkIfContainsProductName(productName: string) {
    const divText = await this.productList.getText();
    const containsProductName = divText.includes(productName);
    expect(containsProductName).to.be.true;
  }
  public async checkMessageNotFoundDisplayed() {
    await this.messageNotFoundProduct.waitForDisplayed({ timeout: 5000 });
    const isMessegeNotFoundDisplay =
      await this.messageNotFoundProduct.isDisplayed();
    expect(isMessegeNotFoundDisplay).to.be.true;
  }
  public async checkInputIsEmpty() {
    const inputValue = await this.inputSearch.getValue();
    expect(inputValue).to.equal("");
    const isMessegeNotFoundDisplay =
      await this.messageNotFoundProduct.isDisplayed();
    expect(isMessegeNotFoundDisplay).to.be.false;
  }
  public async searchBySuggestion() {
    await this.iconSearch.waitForClickable({ timeout: 10000 });
    await this.iconSearch.click();
    await this.txtSuggestion.click();
  }
  public open() {
    return super.openAndWait();
  }
  public clearData() {
    return super.clearData();
  }
}
export default new SearchPage();
