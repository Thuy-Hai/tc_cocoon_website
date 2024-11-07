class ContactData {
  validInformation = {
    name: "Thuy Hai",
    phone: "0958689486",
    email: "tranthuyhai@gmail.com",
    question: "Gia cua sua rua mat",
  };

  nameEmpty = {
    name: "",
    phone: "0958689486",
    email: "tranthuyhai@gmail.com",
    question: "Gia cua sua rua mat",
  };

  nameTooShort = {
    name: "ha",
    phone: "0958689486",
    email: "tranthuyhai@gmail.com",
    question: "Gia cua sua rua mat",
  };
}

export default new ContactData;
