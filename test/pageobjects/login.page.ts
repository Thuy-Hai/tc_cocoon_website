import { $ } from "@wdio/globals";
import Page from "./page";
import homePage from "./home.page";
import { expect } from "chai";
import loginData from "../data/loginData";

class LoginPage extends Page {
  public get inputPhone() {
    return $('input[name="phone"]');
  }
  public get inputPassword() {
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
  public get checkboxRememberMe () {
    return $("[data-v-4a114c7c]");
  }
  public get iconShowPassword() {
    return $(".icon-eye");
  }
  public get iconHidePassword() {
    return $(".icon-eye-slash");
  }
  public get lnkForgotPassword() {
    return $("span=Quên mật khẩu?");
  }
  public get txtTitleForgotPassword() {
    return $("span.title");
  }
  public async inputData(phone: string, password: string) {
    await homePage.btnToLoginPage.waitForClickable({ timeout: 15000 });
    await homePage.btnToLoginPage.click();
    await this.inputPhone.setValue(phone);
    await this.inputPassword.setValue(password);
  }
  public async login({ phone, password }: { phone: string; password: string }) {
    await this.inputData(phone, password);
    await this.btnLogin.click();
  }
  public async checkElementDisplayed(element: ChainablePromiseElement) {
    await element.waitForDisplayed();
    const result = await element.isDisplayed();
    expect(result).to.be.true;
  }
  public async checkLoginSuccessfully() {
    await this.checkElementDisplayed(homePage.lnkAccountInfo);
  }
  public async checkLoginFailed() {
    await this.checkElementDisplayed(this.invalidAccountError);
  }
  public async checkInvalidPasswordError() {
    await this.checkElementDisplayed(this.invalidPasswordError);
  }
  public async checkInvalidPhoneError() {
    await this.checkElementDisplayed(this.invalidPhoneError);
  }
  public async checkInvalidPasswordAndPhoneErrors() {
    await this.checkInvalidPasswordError();
    await this.checkInvalidPhoneError();
  }
  public async loginAndRememberPassword({phone, password,}: {phone: string;password: string;}) {
    await this.inputData(phone, password);
    await this.checkboxRememberMe.click();
    await this.btnLogin.click();
    await this.checkLoginSuccessfully();
  }
  public async logout() {
    await homePage.lnkAccountInfo.waitForClickable({ timeout: 5000 });
    await homePage.lnkAccountInfo.click();
    await homePage.btnLogout.click();
  }
  public async checkLoginAndRememberPasswordSuccessfully() {
    await this.logout();
    await homePage.btnToLoginPage.click();
    const phone = await this.inputPhone.getValue();
    const password = await this.inputPassword.getValue();
    expect(phone).to.equal(loginData.correctPhoneAndPassword.phone);
    expect(password).to.equal(loginData.correctPhoneAndPassword.password);
  }
  public async showPassword(password: string) {
    await homePage.btnToLoginPage.waitForDisplayed({ timeout: 15000 });
    await homePage.btnToLoginPage.click();
    await this.inputPassword.setValue(password);
    expect(await this.inputPassword.getAttribute("type")).to.equal("password");
    await this.iconShowPassword.click();
  }
  public async checkShowPasswordSuccessfully() {
    expect(await this.inputPassword.getAttribute("type")).to.equal("text");
  }
  public async forgotPassword() {
    await homePage.btnToLoginPage.waitForClickable({ timeout: 15000 });
    await homePage.btnToLoginPage.click();
    await this.lnkForgotPassword.click();
  }
  public async checkForgotPasswordSuccessfully() {
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
