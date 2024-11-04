import Page from "./page";
import { expect } from "chai";
import productData from "../data/productData";
import loginPage from "./login.page";
import loginData from "../data/loginData";
import homePage from "./home.page";
class CartPage extends Page {

  public get lnkToAllProduct() {
    return $("#tam-va-duong-the a");
  }
  public get btnAddToCard() {
    return $("button.add-to-cart");
  }
  public get lnkSpecificProduct() {
    return $(
      'a[href="/san-pham/duong-thot-not-an-giang-lam-sach-da-chet-co-the-200ml-1"]'
    );
  }
  public get txtQuatityProduct() {
    return $("span.quantity__number");
  }
  public get btnCartOutOfStock() {
    return $('div[data-index="1"] button.button-square');
  }
  public get btnCartInstock() {
    return $('div[data-index="2"] button.button-square');
  }
  public get messageOutOfStock() {
    return $("aria/Sản phẩm đã hết hàng");
  }
  public get txtNumberOfProductsInCart() {
    return $("button.nav-link span");
  }
  public get btnCloseCart() {
    return $(".shopping-cart__topbar__close");
  }
  public get btnRemoveProduct() {
    return $(".cart__icon-close");
  }
  public get btnContinueBuy() {
    return $("aria/TIẾP TỤC MUA SẮM");
  }
  public get txtTitle() {
    return $("div.title");
  }

  public get listNameProduct() {
    return $$("span.name.mr-2");
  }
  public async addToCartInCategory() {
    await homePage.btnProduct.click();
    await this.lnkToAllProduct.click();
    await this.lnkSpecificProduct.click();
    await this.btnAddToCard.click();
  }
  public async checkAddToCartSuccess(expectedProductName: string) {
    await $("span.name.mr-2").waitForDisplayed();
    const productNames = await this.listNameProduct.map(async (el) => await el.getText());
    const productFound = productNames.some((name) =>name.includes(expectedProductName));
    expect(productFound).to.be.true;
  }
  public async addToCartTwice() {
    await this.addToCartInCategory();
    await this.checkAddToCartSuccess(productData.listTitleProduct.DuongThotNot);
    await this.closeCart();
    await this.btnAddToCard.click();
    await browser.pause(5000);
    await this.checkAddToCartSuccess(productData.listTitleProduct.DuongThotNot);
  }
  public async checkQuantityProduct(expectValue: number) {
    const qualityText = await this.txtQuatityProduct.getText();
    const quality = parseInt(qualityText.trim(), 10);
    expect(quality).to.equal(expectValue);
  }
  public async addOutOfStockProductToCart() {
    const addToCartButton = this.btnCartOutOfStock;
    await addToCartButton.scrollIntoView();
    await addToCartButton.waitForClickable({ timeout: 10000 });
    await addToCartButton.click();
  }
  public async CheckAddToCartFail() {
    const message = this.messageOutOfStock;
    await message.waitForDisplayed();
    expect(await message.isDisplayed()).to.be.true;
  }
  public async addToCardInHomePage() {
    const addToCardBtn = this.btnCartInstock;
    await addToCardBtn.waitForClickable();
    await addToCardBtn.click();
  }
  public async closeCart() {
    await this.btnCloseCart.waitForClickable({ timeout: 5000 });
    await this.btnCloseCart.click();
  }
  public async checkCountInCard(count: number) {
    await this.txtNumberOfProductsInCart.waitForDisplayed();
    const cartCountText = await this.txtNumberOfProductsInCart.getText();
    const cartCount = parseInt(cartCountText.replace(/[()]/g, ""), 10);
    expect(cartCount).to.equal(count);
  }
  public async removeProductInCart() {
    await this.addToCardInHomePage();
    await this.checkAddToCartSuccess(productData.listTitleProduct.ComBoGoiXa);
    await this.btnRemoveProduct.waitForClickable();
    await this.btnRemoveProduct.click();
  }
  public async checkProductRemoveInCart() {
    await this.txtTitle.waitForDisplayed({ timeout: 10000 });
    const isDisplayed = await this.txtTitle.isDisplayed();
    expect(isDisplayed).to.be.true;
  }
  public async checkCardWhenHaveNotProduct() {
    await homePage.btnToCartPage.waitForDisplayed();
    await homePage.btnToCartPage.click();
    await this.checkProductRemoveInCart();
  }
  public async checkAccountNotLoggedIn() {
    const isDisplayed = await homePage.btnToLoginPage.isDisplayed();
    expect(isDisplayed).to.be.true;
  }
  public async ProductIsStillInCart() {
    await this.checkAccountNotLoggedIn();
    await this.addToCardInHomePage();
    await this.checkAddToCartSuccess(productData.listTitleProduct.ComBoGoiXa);
    await this.closeCart();
    await this.checkCountInCard(1);
  }
  public async checkProductIsStillInCart() {
    await loginPage.login(loginData.correctPhoneAndPassword);
    await loginPage.checkLoginSuccess();
    await this.checkCountInCard(1);
  }
  public open() {
    return super.openAndWait();
  }
  public clearData() {
    return super.clearData();
  }
}
export default new CartPage();