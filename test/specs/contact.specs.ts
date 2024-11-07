import contactPage from "../pageobjects/contact.page";
import contactData from "../data/contactData";
describe("Contact function", function () {
  this.timeout(20000);
  beforeEach("open homepage", async () => {
    await contactPage.open();
  });

  it("verify contact successful with valid infomation", async () => {
    await contactPage.contact(contactData.validInformation);
    await contactPage.ckeckContactSuccessful();
  });
  it("verify contact failed with name empty", async () => {
    await contactPage.contact(contactData.nameEmpty);
    await contactPage.checkContactFailedWithNameEmpty();
  });

  it("verify contact failed with  name too short", async () => {
    await contactPage.contact(contactData.nameTooShort);
    await contactPage.checkContactFailedWithNameTooShort();
  });

  after("Clear session", async () => {
    await contactPage.close();
  });
});
