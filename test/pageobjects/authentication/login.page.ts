import { $, browser } from "@wdio/globals";
import Page from "../page";
import { expect } from "chai";
class LoginPage extends Page {
  public get btnToLogin() {
    return $("button=Đăng nhập");
  }
  public get phoneElement() {
    return $('input[name="phone"]');
  }

  public get passwordElement() {
    return $('input[name="password"]');
  }

  public get btnLogin() {
    return $("button=đăng nhập");
  }

  public get errormMessage() {
    return $("span=Tài khoản không tồn tại hoặc sai mật khẩu.");
  }

  public get errorMessagePassword() {
    return $(
      "span=Vui lòng nhập mật khẩu có ít nhất 8 ký tự, ít nhất 1 ký tự hoa, 1 ký tự thường và 1 số!"
    );
  }
  public get errorMessagePhone() {
    return $("span=Vui lòng nhập số điện thoại hợp lệ!");
  }

  public get accountInfo() {
    return $("div=Tài khoản");
  }


  public get rememberMeCheckbox() {
    return $("[data-v-4a114c7c]");
  }

  public get showPasswordIcon() {
    return $(".icon-eye");
  }

  public get hidePasswordIcon() {
    return $(".icon-eye-slash");
  }

  public get lnkForgotPassword() {
    return $(".forgot-password");
  }

  public get titleForgotPassword() {
    return $("span.title");
  }

  private async waitForBtnToLogin() {
    await this.btnToLogin.waitForClickable({ timeout: 10000 });
    await browser.waitUntil(async () => await this.btnToLogin.isClickable(), {
      timeout: 10000,
      timeoutMsg: "Button to Login not clickable after 10s",
    });
  }

  public async login(phone: string, password: string) {
    await this.waitForBtnToLogin();
    await this.btnToLogin.click();
    await this.phoneElement.setValue(phone);
    await this.passwordElement.setValue(password);
    await this.btnLogin.click();
  }

  public async checkLoginSuccessful() {
    await this.accountInfo.waitForDisplayed();
    const isAccountDisplayed = await this.accountInfo.isDisplayed();
    expect(isAccountDisplayed).to.be.true;
  }

  public async checkLoginFailed(errorType: "general" | "password" | "phone") {
    let errorMessageElement;

    switch (errorType) {
      case "password":
        errorMessageElement = this.errorMessagePassword;
        break;
      case "phone":
        errorMessageElement = this.errorMessagePhone;
        break;
      case "general":
      default:
        errorMessageElement = this.errormMessage;
        break;
    }
    await errorMessageElement.waitForDisplayed();
    const isErrorMessageDisplayed = await errorMessageElement.isDisplayed();
    expect(isErrorMessageDisplayed).to.be.true;
  }

  public async loginwithRememberPassword(phone: string, password: string) {
    await this.waitForBtnToLogin();
    await this.btnToLogin.click();
    await this.phoneElement.setValue(phone);
    await this.passwordElement.setValue(password);
    await this.rememberMeCheckbox.waitForDisplayed();
    await this.rememberMeCheckbox.click();
    // await browser.waitUntil(async () => await this.checkboxElement.isSelected(), {
    //   timeout: 5000,
    //   timeoutMsg: "Checkbox was not selected after 5s",
    // });
    // const isChecked = await this.checkboxElement.isSelected();
    // expect(isChecked).to.be.true;
    await this.btnLogin.click();
  }

  public async showPassword() {
    await this.waitForBtnToLogin();
    await this.btnToLogin.click();
    await this.passwordElement.setValue("Hop1010ly@");
    expect(await this.passwordElement.getAttribute("type")).to.equal(
      "password"
    );
    await this.showPasswordIcon.click();
    expect(await this.passwordElement.getAttribute("type")).to.equal("text");
    await this.hidePasswordIcon.click();
    expect(await this.passwordElement.getAttribute("type")).to.equal(
      "password"
    );
  }

  public async forgotPassword() {
    await this.waitForBtnToLogin();
    await this.btnToLogin.click();
    await this.lnkForgotPassword.click();
    await this.titleForgotPassword.waitForDisplayed({ timeout: 10000 });
    const isDisplayed = await this.titleForgotPassword.isDisplayed();
    expect(isDisplayed).to.be.true;
  }

  public open() {
    return super.open("");
  }
}
export default new LoginPage();
