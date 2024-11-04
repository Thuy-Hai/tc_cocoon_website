import { $ } from "@wdio/globals";
import Page from "./page";
import homePage from "./home.page";
import { expect } from "chai";

class LoginPage extends Page {
  public get inputPhoneElement() {
    return $('input[name="phone"]');
  }
  public get inputPasswordElement() {
    return $('input[name="password"]');
  }
  public get btnLogin() {
    return $("button=đăng nhập");
  }
  public get invalidAccountError() {
    return $("span=Tài khoản không tồn tại hoặc sai mật khẩu.");
  }
  public get invalidPasswordError() {
    return $("span=Vui lòng nhập mật khẩu có ít nhất 8 ký tự, ít nhất 1 ký tự hoa, 1 ký tự thường và 1 số!");
  }
  public get invalidPhoneError() {
    return $("span=Vui lòng nhập số điện thoại hợp lệ!");
  }

  public get rememberMeCheckbox() {
    return $("[data-v-4a114c7c]");
  }
  public get iconShowPassword() {
    return $(".icon-eye");
  }
  public get iconHidePassword() {
    return $(".icon-eye-slash");
  }
  public get lnkForgotPassword() {
    return $(".forgot-password");
  }
  public get txtTitleForgotPassword() {
    return $("span.title");
  }
  public async login({ phone, password }: { phone: string; password: string }) {
    await homePage.btnToLoginPage.waitForClickable({ timeout: 15000 });
    await homePage.btnToLoginPage.click();
    await this.inputPhoneElement.setValue(phone);
    await this.inputPasswordElement.setValue(password);
    await this.btnLogin.click();
  }
  public async checkLoginSuccess() {
    await homePage.lnkAccountInfo.waitForDisplayed();
    const isAccountDisplayed = await homePage.lnkAccountInfo.isDisplayed();
    expect(isAccountDisplayed).to.be.true;
  }
  public async checkLoginFail() {
    const errorMessageElement = this.invalidAccountError;
    await errorMessageElement.waitForDisplayed();
    const isErrorMessageDisplayed = await errorMessageElement.isDisplayed();
    expect(isErrorMessageDisplayed).to.be.true;
  }
  public async checkInvalidPasswordError() {
    const errorMessageElement = this.invalidPasswordError;
    await errorMessageElement.waitForDisplayed();
    const isErrorMessageDisplayed = await errorMessageElement.isDisplayed();
    expect(isErrorMessageDisplayed).to.be.true;
  }
  public async checkInvalidPhoneError() {
    const errorMessageElement = this.invalidPhoneError;
    await errorMessageElement.waitForDisplayed();
    const isErrorMessageDisplayed = await errorMessageElement.isDisplayed();
    expect(isErrorMessageDisplayed).to.be.true;
  }
  public async loginwithRememberPassword({ phone, password, }: { phone: string; password: string; }) {
    await homePage.btnToLoginPage.waitForDisplayed({ timeout: 15000 });
    await homePage.btnToLoginPage.click();
    await this.inputPhoneElement.setValue(phone);
    await this.inputPasswordElement.setValue(password);
    await this.rememberMeCheckbox.waitForDisplayed();
    await this.rememberMeCheckbox.click();
    await this.btnLogin.click();
    await this.checkLoginSuccess();
  }
  public async checkLoginWithRemenberPasswordSuccess() {
    await homePage.lnkAccountInfo.waitForClickable({ timeout: 5000 });
    await homePage.lnkAccountInfo.click();
    await homePage.btnLogout.click();
    await homePage.btnToLoginPage.click();
    const phone = await this.inputPhoneElement.getValue();
    const password = await this.inputPasswordElement.getValue();
    console.log(phone, "phone");
    expect(phone).to.equal("0917697809");
    expect(password).to.equal("Hop1010ly@");
  }
  public async showPassword(password: string) {
    await homePage.btnToLoginPage.waitForDisplayed({ timeout: 15000 });
    await homePage.btnToLoginPage.click();
    await this.inputPasswordElement.setValue(password);
  }
  public async checkShowPasswordSuccess() {
    expect(await this.inputPasswordElement.getAttribute("type")).to.equal("password");
    await this.iconShowPassword.click();
    expect(await this.inputPasswordElement.getAttribute("type")).to.equal("text");
  }
  public async forgotPassword() {
    await homePage.btnToLoginPage.waitForDisplayed({ timeout: 15000 });
    await homePage.btnToLoginPage.click();
    await this.lnkForgotPassword.click();
  }
  public async checkForgotPasswordSuccess() {
    await this.txtTitleForgotPassword.waitForDisplayed();
    const isDisplayed = await this.txtTitleForgotPassword.isDisplayed();
    expect(isDisplayed).to.be.true;
  }
  public open() {
    return super.openAndWait();
  }
  public clearData() {
    return super.clearData();
  }
}
export default new LoginPage();
