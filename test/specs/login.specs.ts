import loginPage from "../pageobjects/login.page";
import loginData from "../data/loginData";

describe("Login function", () => {
  beforeEach("Open Home Page", () => {
    loginPage.open();
  });
  it("verify login successfully with correct phone and password", async () => {
    await loginPage.login(loginData.correctPhoneAndPassword);
    await loginPage.checkLoginSuccessfully();
  });
  it("verify login failed with wrong phone number and correct password", async () => {
    await loginPage.login(loginData.wrongPhoneAndCorrectPassword);
    await loginPage.checkLoginFailed();
  });
  it("verify login failed with correct phone number and wrong password", async () => {
    await loginPage.login(loginData.correctPhoneAndWrongPassword);
    await loginPage.checkLoginFailed();
  });
  it("verify login failed with correct phone and invalid password  ", async () => {
    await loginPage.login(loginData.correctPhoneAndInvalidPassword);
    await loginPage.checkInvalidPasswordError();
  });
  it("verify login failed with invalid phone and correct password", async () => {
    await loginPage.login(loginData.invalidPhoneAndCorrectPassword);
    await loginPage.checkInvalidPhoneError();
  });
  it("verify login failed with invalid phone and invalid password", async () => {
    await loginPage.login(loginData.invalidPhoneAnddPassword);
    await loginPage.checkInvalidPasswordAndPhoneErrors();
  });
  it("verify login successful and remember password", async () => {
    await loginPage.loginAndRememberPassword(loginData.correctPhoneAndPassword);
    await loginPage.checkLoginAndRemenberPasswordSuccessfully();
  });
  it("verify show password when login", async () => {
    await loginPage.showPassword(loginData.correctPhoneAndPassword.password);
    await loginPage.checkShowPasswordSuccessfully();
  });
  it("verify show a forgot password page", async () => {
    await loginPage.forgotPassword();
    await loginPage.checkForgotPasswordSuccessfully();
  });



  afterEach("Clear cookies data", () => {
    loginPage.clearData();
  });
});
