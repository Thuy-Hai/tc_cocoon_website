import cart from "../pageobjects/cart.page";
import productData from "../data/productData";

describe("Add to Cart Function", () => {
  beforeEach("open homepage", async () => {
    cart.open();
  });
  it("Verify successful addition of the product to the cart from catalog", async () => {
    await cart.addToCartFromCatalog();
    await cart.checkAddToCartSuccessfully(productData.listTitleProduct.DuongThotNot);
  });
  it("Verify successful increase of product quantity in the shopping cart", async () => {
    await cart.addToCartTwice();
    await cart.checkQuantityProduct(2);
  });
  it("Verify out of stock product cannot be added to cart", async () => {
    await cart.addOutOfStockProductToCart();
    await cart.CheckAddToCartFailed();
  });
  it("Verify successful addition of the product to the cart from homePage", async () => {
    await cart.addToCardFromHomePage();
    await cart.checkAddToCartSuccessfully(productData.listTitleProduct.ComBoGoiXa);
  });
  it("Verify add to card without login", async () => {
    await cart.addToCardWithoutLogin();
    await cart.checkAddToCartSuccessfully(productData.listTitleProduct.ComBoGoiXa);
  });
  it("Verify that the cart is empty of products", async () => {
    await cart.cart();
    await cart.checkCartIsEmpty();
  });
  it("verify remove product in cart successful", async () => {
    await cart.removeProductInCart();
    await cart.checkCartIsEmpty();
  });
  it("Verify after login, product is still in cart", async () => {
    await cart.productIsStillInCart();
    await cart.checkProductIsStillInCart();
  });
  afterEach("Clear Session Data", () => {
    cart.clearData();
  });
});
