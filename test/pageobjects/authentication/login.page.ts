import { $, browser } from "@wdio/globals";
import Page from "../page";
import { expect } from "chai";
import ErrorType from "../../data/errorType";
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

  public get btnLogout() {
    return $("aria/Đăng xuất");
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


  public async login({ phone, password }: { phone: string; password: string }) {
    await this.btnToLogin.waitForDisplayed({timeout:15000});
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

  public async checkLoginFailed(errorType: string) {
    let errorMessageElement;
    switch (errorType) {
      case ErrorType.Type.PASSWORD:
        errorMessageElement = this.errorMessagePassword;
        break;
      case ErrorType.Type.PHONE:
        errorMessageElement = this.errorMessagePhone;
        break;
      case ErrorType.Type.GENERAL:
      default:
        errorMessageElement = this.errormMessage;
        break;
    }
    await errorMessageElement.waitForDisplayed();
    const isErrorMessageDisplayed = await errorMessageElement.isDisplayed();
    expect(isErrorMessageDisplayed).to.be.true;
  }

  public async loginwithRememberPassword({phone,password}: {phone: string;password: string;}) {
    await this.btnToLogin.waitForDisplayed({timeout:15000});
    await this.btnToLogin.click();
    await this.phoneElement.setValue(phone);
    await this.passwordElement.setValue(password);
    await this.rememberMeCheckbox.waitForDisplayed();
    await this.rememberMeCheckbox.click();
    await this.btnLogin.click();
    await this.checkLoginSuccessful();
  }
  public async checkLoginWithRemenberPassword() {
    await this.accountInfo.waitForClickable({ timeout: 5000 });
    await this.accountInfo.click();
    await this.btnLogout.click();
    await this.btnToLogin.click();
    const phone =await this.phoneElement.getValue();
    const password = await this.passwordElement.getValue();
    console.log(phone,"phone");
    expect(phone).to.equal("0917697809");
    expect(password).to.equal("Hop1010ly@");
  }

  public async showPassword(password: string) {
    await this.btnToLogin.waitForDisplayed({timeout:15000});
    await this.btnToLogin.click();
    await this.passwordElement.setValue(password);
    expect(await this.passwordElement.getAttribute("type")).to.equal(
      "password"
    );
    await this.showPasswordIcon.click();
    expect(await this.passwordElement.getAttribute("type")).to.equal("text");
  }

  public async forgotPassword() {
    await this.btnToLogin.waitForDisplayed({timeout:15000});
    await this.btnToLogin.click();
    await this.lnkForgotPassword.click();
    await this.titleForgotPassword.waitForDisplayed();
    const isDisplayed = await this.titleForgotPassword.isDisplayed();
    expect(isDisplayed).to.be.true;
  }

  public open() {
    return super.open("");
  }

  public async waitBrowerLoad() {
    const videoElement = $(".lazyLoad.isLoaded");
    await videoElement.waitForExist({timeout:15000});
  }
}
export default new LoginPage();
