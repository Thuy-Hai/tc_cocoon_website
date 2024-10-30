describe("Recording 30/10/2024 at 13:00:10", () => {
  it("tests Recording 30/10/2024 at 13:00:10", async () => {
    await browser.setWindowSize(1051, 810)
    await browser.url("https://cocoonvietnam.com/")
    await expect(browser).toHaveUrl("https://cocoonvietnam.com/")
    await browser.$("//*[@id=\"__layout\"]/div/header/div[5]/div/div/form/div[1]/div/input").setValue("0917697809")
    await browser.$("//*[@id=\"__layout\"]/div/header/div[5]/div/div/form/div[2]/div/input").setValue("Hop1010ly@")
    await browser.$("aria/mainmenu").click()
    await browser.$("//*[@id=\"navbar\"]/div[3]/nav/div[1]/div/div/span").click()
    await browser.$("aria/Sữa rửa mặt").click()
  });
});
