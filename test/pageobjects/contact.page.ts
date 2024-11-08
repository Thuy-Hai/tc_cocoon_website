import { initBrowser } from "../../setup/standalone";
import * as assert from "node:assert";
class ContactPage {
  private browser!: WebdriverIO.Browser;
  public async init() {
    this.browser = await initBrowser();
  }
  public async open() {
    await this.init();
    await this.browser.url("https://cocoonvietnam.com/");
  }
  public get btnToContactPage() {
    return this.browser.$("button=Liên hệ");
  }
  public get inputNameElement() {
    return this.browser.$('input[name="name"]');
  }
  public get inputPhoneElement() {
    return this.browser.$('//*[@id="__layout"]/div/header/div[6]/div/div/div/form/div[1]/div[2]/div/input');
  }
  public get inputEmailElement() {
    return this.browser.$('input[name="email"]');
  }
  public get inputQuestionElement() {
    return this.browser.$('//*[@id="__layout"]/div/header/div[6]/div/div/div/form/div[3]/div/textarea');
  }
  public get btnContact() {
    return this.browser.$("button=Gửi COCOON");
  }
  public get dialogSuccess() {
    return this.browser.$(".contact-dialog");
  }
  public get emptyNameError() {
    return this.browser.$("span=Vui lòng nhập tên của bạn!"); 
  }
  public get tooShortNameError() {
    return this.browser.$("span=Tên bạn nhập quá ngắn!"); 
  }
  public async contact({ name, phone, email, question }: { name: string, phone: string, email: string, question: string }) {
    await this.btnToContactPage.waitForClickable({timeout:5000});
    await this.btnToContactPage.click();
    await this.inputNameElement.setValue(name);
    await this.inputPhoneElement.waitForEnabled({ timeout: 5000 });
    await this.inputPhoneElement.setValue(phone);
    await this.inputEmailElement.setValue(email);
    await this.inputQuestionElement.setValue(question);
    await this.btnContact.click();
  }
  public async ckeckContactSuccessful() {
    const dialogSuccess = await this.dialogSuccess.isDisplayed();
    assert.equal(dialogSuccess,true);
  }
  public async checkContactFailedWithNameEmpty() {
    const emptyNameError = await this.emptyNameError.isDisplayed();
    assert.equal(emptyNameError, true);
  }
  public async checkContactFailedWithNameTooShort() {
    const tooShortNameError = await this.tooShortNameError.isDisplayed();
    assert.equal(tooShortNameError, true);
  }
  public async close() {
    await this.browser.deleteSession();
  }
}
export default new ContactPage();
