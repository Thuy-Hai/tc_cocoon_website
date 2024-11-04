import addToCartPage from "../pageobjects/cart.page";
import productData from "../data/productData";

describe("Add to Cart Functionality", () => {
  beforeEach("open the website before adding products to cart", async () => {
    addToCartPage.open();
  });
  it("Verify successful addition of the product to the cart from catalog", async () => {
    await addToCartPage.addToCartInCategory();
    await addToCartPage.checkAddToCartSuccess(productData.listTitleProduct.DuongThotNot);
  });
  it("Verify successful increase of product quantity in the shopping cart", async () => {
    await addToCartPage.addToCartTwice();
    await addToCartPage.checkQuantityProduct(2);
  });
  it("Verify out of stock product cannot be added to cart", async () => {
    await addToCartPage.addOutOfStockProductToCart();
    await addToCartPage.CheckAddToCartFail();
  });
  it("Verify successful addition of the product to the cart from homePage", async () => {
    await addToCartPage.addToCardInHomePage();
    await addToCartPage.checkAddToCartSuccess(productData.listTitleProduct.ComBoGoiXa);
  });
  it("Verify add to card without login", async () => {
    await addToCartPage.checkAccountNotLoggedIn();
    await addToCartPage.addToCardInHomePage();
    await addToCartPage.checkAddToCartSuccess(productData.listTitleProduct.ComBoGoiXa);
  });
  it("Verify that the cart is empty of products", async () => {
    await addToCartPage.checkCardWhenHaveNotProduct();
  });
  it("verify remove product in cart successful", async () => {
    await addToCartPage.removeProductInCart();
    await addToCartPage.checkProductRemoveInCart();
  });
  it("Verify after login, product is still in cart", async () => {
    await addToCartPage.ProductIsStillInCart();
    await addToCartPage.checkProductIsStillInCart();
  });
  afterEach("Clear Session Data", () => {
    addToCartPage.clearData();
  });
});
