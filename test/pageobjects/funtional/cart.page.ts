import Page from "../page";
import { expect } from "chai";

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
  public get qualityProduct() {
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

  public async addToCartInCategory() {
    await this.btnProduct.waitForDisplayed({ timeout: 10000 });
    await this.btnProduct.click();
    await this.linkToAllProduct.waitForDisplayed({ timeout: 10000 });
    await this.linkToAllProduct.click();
    const hrefProduct = await this.linkToAllProduct.getAttribute("href");
    expect(hrefProduct).to.include("/danh-muc/tam-va-duong-the");
    await this.linkSpecificProduct.waitForDisplayed({ timeout: 10000 });
    await this.linkSpecificProduct.click();
    await this.btnAddToCard.waitForClickable({ timeout: 10000 });
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
        timeoutMsg: "Không tìm thấy phần tử span.name trong 5 giây",
      }
    );
    const productNames = await $$("span.name.mr-2").map(
      async (el) => await el.getText()
    );

    const productFound = productNames.some((name) =>
      name.includes(expectedProductName)
    );
    expect(productFound).to.be.true;
  }

  public async checkQualityProduct(expectValue: number) {
    const qualityText = await this.qualityProduct.getText();
    const quality = parseInt(qualityText.trim(), 10);
    console.log(`Current quantity in cart: ${quality}`);
    expect(quality).to.equal(expectValue);
  }
  public async addOutOfStockProductToCart() {
    const addToCartButton = this.btnCartOutOfStock;
    await addToCartButton.waitForClickable();
    await addToCartButton.click();
    const message = this.messageOutOfStock;
    await message.waitForDisplayed();
    expect(await message.isDisplayed()).to.be.true;
    console.log("log:");
  }

  public async addToCardInHomePage() {
    const addToCardBtn = this.btnCartInstock;
    await addToCardBtn.waitForClickable();
    await addToCardBtn.click();
  };

  public async checkAccountNotLoggedIn() {
    const isDisplayed = await this.btnToLogin.isDisplayed();
    expect(isDisplayed).to.be.true;
    console.log("account not loggin")
  }
  public async closeCart() {
    await this.closeCartElement.waitForClickable();
    await this.closeCartElement.click();
    console.log('close cart');

    
  }

  public async checkCountIncard(count: number) {
    await this.cartCountElement.waitForDisplayed(); 
    const cartCountText = await this.cartCountElement.getText();
    const cartCount = parseInt(cartCountText.replace(/[()]/g, ''), 10); 
    console.log("cart count: ",cartCount);
    expect(cartCount).to.equal(count);
  }
  public open() {
    return super.open("");
  }
}
export default new CartPage();
