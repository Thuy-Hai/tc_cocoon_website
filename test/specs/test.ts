describe("thirth record", () => {
    it("tests thirth record", async () => {
      await browser.url("https://cocoonvietnam.com/")
      await expect(browser).toHaveUrl("https://cocoonvietnam.com/")
      await browser.$("//*[@id=\"__layout\"]/div/div[1]/main/main/div[8]/div[2]/div[1]/div/div/div[2]/div/div/div/div[2]/div[2]/button").click()
    });
  });
  