import Page from "../page";
import { expect } from "chai";
import productData from "../../data/productData";

class CartPage extends Page {
  public get btnToLogin() {
    return $("button=Đăng nhập");
  }
  public get btnProduct() {
    return $("button=Sản phẩm");
  }
  public get linkToAllProduct() {
    return $("#tam-va-duong-the a");
  }
  public get btnAddToCard() {
    return $("button.add-to-cart");
  }
  public get linkSpecificProduct() {
    return $(
      'a[href="/san-pham/duong-thot-not-an-giang-lam-sach-da-chet-co-the-200ml-1"]'
    );
  }
  public get quatityProduct() {
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

  public get cartCountElement() {
    return $("button.nav-link span");
  }

  public get closeCartElement() {
    return $(".shopping-cart__topbar__close");
  }

  public get accountElement() {
    return $("div=Tài khoản");
  }

  public get btnRemoveProduct() {
    return $(".cart__icon-close");
  }

  public get btnContinueBuy() {
    return $("aria/TIẾP TỤC MUA SẮM");
  }

  public get txtTitle() {
    return $('div.title');
  }

  public get btnToCart() {
    return $("aria/Giỏ hàng");
  }

  public async addToCartInCategory() {
    await this.btnProduct.click();
    await this.linkToAllProduct.click();
    await this.linkSpecificProduct.click();
    await this.btnAddToCard.click();
  }

  public async checkAddToCartSuccess(expectedProductName: string) {
    await browser.waitUntil(
      async () => {
        const productNameElements = $$("span.name.mr-2");
        return (await productNameElements.length) > 0;
      },
      {
        timeout: 5000,
        timeoutMsg: "Not found span.name in 5s",
      }
    );
    const productNames = await $$("span.name.mr-2").map(async (el) => await el.getText());
    const productFound = productNames.some((name) =>name.includes(expectedProductName));
    console.log("Available products in cart:", productNames);
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
    const qualityText = await this.quatityProduct.getText();
    const quality = parseInt(qualityText.trim(), 10);
    console.log(`Current quantity in cart: ${quality}`);
    expect(quality).to.equal(expectValue);
  }
  public async addOutOfStockProductToCart() {
    const addToCartButton = this.btnCartOutOfStock;
    await addToCartButton.waitForClickable();
    await addToCartButton.click();
  }

  public async CheckAddToCartFail() {
    const message = this.messageOutOfStock;
    await message.waitForDisplayed();
    expect(await message.isDisplayed()).to.be.true;
    console.log("log:");
  }

  public async addToCardInHomePage() {
    const addToCardBtn = this.btnCartInstock;
    await addToCardBtn.waitForClickable();
    await addToCardBtn.click();
  }

  public async checkAccountNotLoggedIn() {
    const isDisplayed = await this.btnToLogin.isDisplayed();
    expect(isDisplayed).to.be.true;
    console.log("account not loggin");
  }
  public async closeCart() {
    await this.closeCartElement.waitForClickable({ timeout: 5000 });
    await this.closeCartElement.click();
    console.log("close cart");
  }

  public async checkCountInCard(count: number) {
    await this.cartCountElement.waitForDisplayed();
    const cartCountText = await this.cartCountElement.getText();
    const cartCount = parseInt(cartCountText.replace(/[()]/g, ""), 10);
    console.log("cart count: ", cartCount);
    expect(cartCount).to.equal(count);
  }

  public async removeProductInCart() {
    await this.btnRemoveProduct.waitForClickable();
    await this.btnRemoveProduct.click();
  }

  public async checkProductRemoveInCart() {
    await this.txtTitle.waitForDisplayed({timeout:15000});
    const isDisplayed = await this.txtTitle.isDisplayed();
    expect(isDisplayed).to.be.true;
  }

  public async checkCardWhenHaveNotProduct() {
    await this.btnToCart.waitForDisplayed();
    await this.btnToCart.click();
    await this.checkProductRemoveInCart();
  }
  public open() {
    return super.open("");
  }

  public async waitBrowerLoad()  {
    const videoElement = $('.lazyLoad.isLoaded');
    await videoElement.waitForExist();
  }
}
export default new CartPage();
