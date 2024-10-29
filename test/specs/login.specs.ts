import loginPage from "../pageobjects/authentication/login.page";
import allureReporter from "@wdio/allure-reporter";
import loginData from "../data/loginData";
import errorType from "../data/errorType";
describe("Login function on home page", () => {
  beforeEach("Open Home Page", async () => {
    allureReporter.addFeature("Setup: Opening the home page");
    await loginPage.open();
    await loginPage.waitBrowerLoad();
  });

  afterEach("Clear Session Data", async () => {
    await browser.execute(() => localStorage.clear());
    await browser.deleteCookies();
  });

  it("verify login successfully with correct phone and password", async () => {
    allureReporter.addFeature("Feature login success");
    await loginPage.login(loginData.phoneNPasswordCorrect);
    await loginPage.checkLoginSuccessful();
  });
  it("verify login failed with wrong phone number and correct password", async () => {
    allureReporter.addFeature("Feature login failed with wrong phone and corect password");
    await loginPage.login(loginData.wrongPhoneNcorrectPassword);
    await loginPage.checkLoginFailed(errorType.Type.GENERAL);
  });
  it("verify login failed with correct phone number and wrong password", async () => {
    allureReporter.addFeature("Feature login failed with corect phone and wrong password");
    await loginPage.login(loginData.correctPhoneNwrongPassword);
    await loginPage.checkLoginFailed(errorType.Type.GENERAL);
  });

  it("verify login failed with correct phone and invalid password  ", async () => {
    allureReporter.addFeature("Feature login failed with correct phone and invvalid password");
    await loginPage.login(loginData.correctPhoneNinvalidPassword);
    await loginPage.checkLoginFailed(errorType.Type.PASSWORD);
  });
  it("verify login failed with invalid phone and correct password", async () => {
    allureReporter.addFeature("Feature login failed with invalid phone and correct password");
    await loginPage.login(loginData.invalidPhoneNcorrectPassword);
    await loginPage.checkLoginFailed(errorType.Type.PHONE);
  });

  it("verify login failed with invalid phone and invalid password", async () => {
    allureReporter.addFeature("Feature login failed with invalid phone and invalid password");
    await loginPage.login(loginData.invalidPhoneNinvalidPassword);
    await loginPage.checkLoginFailed(errorType.Type.PHONE);
    await loginPage.checkLoginFailed(errorType.Type.PASSWORD);
  });

  it("verify login successful and remember password", async () => {
    allureReporter.addFeature("Feature login successful and remember password");
    await loginPage.loginwithRememberPassword(loginData.phoneNPasswordCorrect);
    await loginPage.checkLoginWithRemenberPassword();
  });

  it("verify show password when login", async () => {
    allureReporter.addFeature("Feature show password");
    await loginPage.showPassword(loginData.phoneNPasswordCorrect.password);
  });

  it("verify show a forgot password page", async () => {
    allureReporter.addFeature("Feature forgot password");
    await loginPage.forgotPassword();
  });
});
