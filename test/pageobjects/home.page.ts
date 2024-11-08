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
  public get promoBanner() {
    return $(".absolute.flex.flex-col.w-full.lg\\:flex-row.lg\\:h-full");
  }
  public get footer() {
    return $("#__layout > div > footer")
  }
  public get imageInBanner() {
    return $(".image-block");
  }
  public get navbar() {
    return $("#navbar");
  }
  public async checkNavbarDisplay() {
    const navbar = this.navbar;
    await expect(navbar).toMatchElementSnapshot("navbar");
    await this.checkBtnToLoginPageDisplay();
    await this.checkBtnProductDisplay();
    await this.checkBtnToCartPageDisplay();
  }
  public async checkBtnToLoginPageDisplay() {
    const btnToLoginPage = await this.btnToLoginPage;
    const result = await browser.checkElement(btnToLoginPage, "btnToLoginPage");
    await expect(result).toBeLessThan(0.05);
  }
  public async checkBtnProductDisplay() {
    const btnProduct = await this.btnProduct;
    const result = await browser.checkElement(btnProduct, "btnProduct");
    await expect(result).toBeLessThan(0.05);
  }
  public async checkBtnToCartPageDisplay() {
    const btnToCartPage = await this.btnToCartPage;
    const result = await browser.checkElement(btnToCartPage, "btnToCartPage");
    await expect(result).toBeLessThan(0.05);
  }
  public async checkOverviewBannerDisplay() {
    await this.checkPromoBannerDisplay();
    await this.checkImageInBannerDisplay();
  }
  public async checkPromoBannerDisplay() {
    const promoBanner = await this.promoBanner;
    const result = await browser.checkElement(promoBanner, "promoBanner");
    await expect(result).toBeLessThan(0.05);
  }
  public async checkImageInBannerDisplay() {
    const imageInBanner = await this.imageInBanner;
    const result = await browser.checkElement(imageInBanner, "imageInBanner");
    await expect(result).toBeLessThan(0.05);
  }
  public async checkFotterDisplay() {
    const footer = await this.footer;
    const result = await browser.checkElement(footer, "footer");
    await expect(result).toBeLessThan(0.05);
  }
  public async checkTabbablePage() {
    await browser.pause(10000);
    await browser.saveTabbablePage("tabbable-page-tag");
  }
  public open() {
    return super.openAndWait();
  }
}

export default new HomePage();
