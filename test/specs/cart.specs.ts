import addToCartPage from "../pageobjects/funtional/cart.page";
import productData from "../data/productData";
describe("Add to Cart Functionality",  () => {
  beforeEach("open the website before adding products to cart", async () => {
    addToCartPage.open();
  });
  it("verify add product to cart successfully from category", async () => {
    await addToCartPage.addToCartInCategory();
    await addToCartPage.checkAddToCartSuccess(productData.listTitleProduct.DuongThotNot);
  });
  it("verify increase product quantity in cart", async () => {
    await addToCartPage.addToCartTwice();
    await addToCartPage.checkQuantityProduct(2);
  });
  it("verify fail to add out of stock product to cart", async () => {
    await addToCartPage.addOutOfStockProductToCart();
    await addToCartPage.CheckAddToCartFail();
  });

  it("verify add product to cart successfully from homepage", async () => {
    await addToCartPage.addToCardInHomePage();
    await addToCartPage.checkAddToCartSuccess(productData.listTitleProduct.ComBoGoiXa);
  });

  it("verify add to card without login", async () => {
    await addToCartPage.checkAccountNotLoggedIn();
    await addToCartPage.addToCardInHomePage();
    await addToCartPage.checkAddToCartSuccess(productData.listTitleProduct.ComBoGoiXa);
  });

  it("verify do not have product in cart", async () => {
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
  afterEach("Clear Session Data",  () => {
    addToCartPage.clearData();
  });
});
