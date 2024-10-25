import addToCartPage from "../pageobjects/funtional/cart.page";
import loginPage from "../pageobjects/authentication/login.page";
import allureReporter from "@wdio/allure-reporter";

describe("add to card function", () => {
  beforeEach(
    "should open the website before adding products to cart",
    async () => {
      allureReporter.addFeature("Feature before add to cart");
      console.log("Navigating to the website...");
      await addToCartPage.open();
    }
  );

  afterEach(async () => {
    await browser.execute(() => localStorage.clear());
    await browser.deleteCookies();
});


  it("should add product to cart successfully from category", async () => {
    allureReporter.addFeature("Feature add to cart from category");
    await addToCartPage.addToCartInCategory();
    await addToCartPage.checkAddToCartSuccess("Đường thốt nốt An Giang");
  });

  it("should increase product quantity in cart", async () => {
    allureReporter.addFeature("Feature increase quantity of product in cart");
    await addToCartPage.addToCartInCategory();
    await addToCartPage.checkAddToCartSuccess("Đường thốt nốt An Giang");
    await browser.refresh();
    await addToCartPage.addToCartInCategory();
    await addToCartPage.checkAddToCartSuccess("Đường thốt nốt An Giang");
    await addToCartPage.checkQualityProduct(2);
  });

  it("should fail to add out of stock product to cart", async () => {
    allureReporter.addFeature("Feature add out of stock product to card");
    await addToCartPage.addOutOfStockProductToCart();
  });

  it("should add product to cart successfully from homePage", async () => {
    allureReporter.addFeature("Feature add to cart from homepage");
    await addToCartPage.addToCardInHomePage();
    await addToCartPage.checkAddToCartSuccess("Combo gội xả bưởi không sulfate");
  });

  it("should add to card without login", async () => {
    allureReporter.addFeature("Feature add to cart without login");
    await addToCartPage.checkAccountNotLoggedIn();
    await addToCartPage.addToCardInHomePage();
    await addToCartPage.checkAddToCartSuccess(
      "Combo gội xả bưởi không sulfate"
    );
  });

  it("After logging in, there are still products in the cart", async () => {
    allureReporter.addFeature("Feature product is still in the cart after login" );
    await addToCartPage.checkAccountNotLoggedIn();
    await addToCartPage.addToCardInHomePage();
    await addToCartPage.checkAddToCartSuccess( "Combo gội xả bưởi không sulfate" );
    await addToCartPage.closeCart();
    await addToCartPage.checkCountIncard(1);
    await loginPage.login("0917697809", "Hop1010ly@");
    await loginPage.checkLoginSuccessful();
    await addToCartPage.checkCountIncard(1);
  });

  it.only("sould remove product in cart successful", async () => {
    await addToCartPage.addToCardInHomePage();
    await addToCartPage.checkAddToCartSuccess("Combo gội xả bưởi không sulfate");
    
  })


});
