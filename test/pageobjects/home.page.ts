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

  public get divNavbar() {
    return $("#navbar");
  }

  public async checkNavbarVisualize() {
    const result = await browser.checkElement(this.divNavbar, "navbar");
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
