import Page from "./page";

class HomePage extends Page {
  public get btnToLoginPage() {
    return $("button=Đăng nhập");
  }
  public get lnkAccountInfo() {
    return $("div=Tài khoản");
  }
  public get btnLogout() {
    return $("aria/Đăng xuất");
  }
  public get btnProduct() {
    return $("button=Sản phẩm");
  }

  public get btnToCartPage() {
    return $("aria/Giỏ hàng");
  }

  public async check() {
    await expect(browser).toMatchScreenSnapshot("partialPage");
    await expect($("#navbar")).toMatchElementSnapshot("navbar");
    await this.checkLinkCartDisplay();
    await this.checkLinkLoginDisplay();
    await this.checkLinkProductDisplay();
  }

  public async checkLinkLoginDisplay() {
    const login = await this.btnToLoginPage;
    const result = await browser.checkElement(login, "login");
    await expect(result).toBeLessThan(0.05);
  }

  public async checkLinkCartDisplay() {
    const cart = await this.btnToCartPage;
    const result = await browser.checkElement(cart, "cart");
    await expect(result).toBeLessThan(0.05);
  }

  public async checkLinkProductDisplay() {
    const product = await this.btnProduct;
    const result = await browser.checkElement(product, "product");
    await expect(result).toBeLessThan(0.05);
  }
  public open() {
    return super.openAndWait();
  }
}

export default new HomePage();
