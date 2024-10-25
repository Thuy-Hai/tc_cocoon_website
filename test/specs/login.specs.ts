import loginPage from "../pageobjects/authentication/login.page";
import allureReporter from "@wdio/allure-reporter";
describe("Login function on home page", () => {
  beforeEach("Open  Home Page", async () => {
    allureReporter.addFeature("Setup: Opening the login page");
    await loginPage.open();
  });

  afterEach("Clear Session Data", async () => {
    await browser.execute(() => localStorage.clear());
    await browser.deleteCookies();
  });

  it("should verify login successfully with correct phone and password", async () => {
    allureReporter.addFeature("Feature login success");
    await loginPage.login("0917697809", "Hop1010ly@");
    await loginPage.checkLoginSuccessful();
  });
  it("should verify login failed with wrong phone number and correct password", async () => {
    allureReporter.addFeature("Feature login failed with wrong phone and corect password");
    await browser.pause(4000);
    await loginPage.login("0958734753", "Hop1010ly@");
    await loginPage.checkLoginFailed("general");
  });
  it("should verify login failed with correct phone number and wrong password", async () => {
    allureReporter.addFeature("Feature login failed with corect phone and wrong password");
    await loginPage.login("0917697809", "Hop1010ly");
    await loginPage.checkLoginFailed("general");
  });

  it("should login failed with invalid password and correct phone", async () => {
    allureReporter.addFeature("Feature login failed with invvalid password");
    await loginPage.login("0917697809", "acc");
    await loginPage.checkLoginFailed("password");
  });

  it("should login failed with invalid phone and invalid password", async () => {
    allureReporter.addFeature("Feature login failed with invaid phone and invalid password");
    await loginPage.login("555", "abc");
    await loginPage.checkLoginFailed("phone");
    await loginPage.checkLoginFailed("password");
  });

  it("should login successful and remember password", async () => {
    allureReporter.addFeature("Feature login successful and remember password");
    await loginPage.loginwithRememberPassword("0917697809", "Hop1010ly@");
    await loginPage.checkLoginSuccessful();

  });

  it("should show password", async () => {
    allureReporter.addFeature("Feature show password");
    await loginPage.showPassword();
  });

  it("should show a forgot password page", async () => {
    allureReporter.addFeature("Feature forgot password");
    await loginPage.forgotPassword();
  });
});
