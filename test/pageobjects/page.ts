import { browser } from "@wdio/globals";

export default class Page {
  public async openAndWait() {
    await browser.url(`https://cocoonvietnam.com/`);
    await browser.setWindowSize(1680, 1050);
    const videoElement = $(".lazyLoad.isLoaded");
    await videoElement.waitForExist({ timeout: 15000 });
  }
  public async clearData() {
    try {
      await browser.execute(() => localStorage.clear());
      console.log("deleted localStorage.");
      await browser.deleteCookies();
      console.log("deleted cookies.");
    } catch (error) {
      console.error("error when delete data:", error);
    }
  }
}
