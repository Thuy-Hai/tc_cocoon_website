import addToCartPage from "../pageobjects/funtional/cart.page";
import loginPage from "../pageobjects/authentication/login.page";
import allureReporter from "@wdio/allure-reporter";
import loginData from "../data/loginData";
import productData from "../data/productData";

describe("Add to Cart Functionality",async () => {
  beforeEach("open the website before adding products to cart", async () => {
    allureReporter.addFeature("Feature before add to cart");

     await addToCartPage.open();
     await addToCartPage.waitBrowerLoad();
  
  });

  afterEach("Clear Session Data", async () => {
    await browser.execute(() => {
      localStorage.clear();
      sessionStorage.clear();
  });
  await browser.deleteCookies();
  });


  it("verify increase product quantity in cart", async () => {
    allureReporter.addFeature("Feature increase quantity of product in cart");
    await addToCartPage.addToCartTwice();
    await addToCartPage.checkQuantityProduct(2);
  });
  it("verify add product to cart successfully from category", async () => {
    allureReporter.addFeature("Feature add to cart from category");
    await addToCartPage.addToCartInCategory();
    await addToCartPage.checkAddToCartSuccess(productData.listTitleProduct.DuongThotNot);
  });
  it("verify fail to add out of stock product to cart", async () => {
    allureReporter.addFeature("Feature add out of stock product to card");
    await addToCartPage.addOutOfStockProductToCart();
    await addToCartPage.CheckAddToCartFail();
  });

  it("verify add product to cart successfully from homepage", async () => {
    allureReporter.addFeature("Feature add to cart from homepage");
    await addToCartPage.addToCardInHomePage();
    await addToCartPage.checkAddToCartSuccess(productData.listTitleProduct.ComBoGoiXa);
  });

  it("verify add to card without login", async () => {
    allureReporter.addFeature("Feature add to cart without login");
    await addToCartPage.checkAccountNotLoggedIn();
    await addToCartPage.addToCardInHomePage();
    await addToCartPage.checkAddToCartSuccess(productData.listTitleProduct.ComBoGoiXa);
  });




  it("verify do not have product in cart", async () => {
    allureReporter.addFeature("Feature  do not have product in cart");
    await addToCartPage.checkCardWhenHaveNotProduct();
  });

  it("verify remove product in cart successful", async () => {
    allureReporter.addFeature("Feature remove product in cart successful");
    await addToCartPage.addToCardInHomePage();
    await addToCartPage.checkAddToCartSuccess(productData.listTitleProduct.ComBoGoiXa);
     await addToCartPage.removeProductInCart();
     await addToCartPage.checkProductRemoveInCart();
  });

  it("verify after login, product still has products in cart", async () => {
    allureReporter.addFeature( "Feature product is still in the cart after login");
    await addToCartPage.checkAccountNotLoggedIn();
    await addToCartPage.addToCardInHomePage();
    await addToCartPage.checkAddToCartSuccess(productData.listTitleProduct.ComBoGoiXa);
    await addToCartPage.closeCart();
    await addToCartPage.checkCountInCard(1);
    await loginPage.login(loginData.phoneNPasswordCorrect);
    await loginPage.checkLoginSuccessful();
    await addToCartPage.checkCountInCard(1);
  });
});
