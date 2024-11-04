class LoginData {
    correctPhoneAndPassword = {
        phone: "0917697809",
        password:"Hop1010ly@",
    }
    wrongPhoneAndCorrectPassword = {
        phone: "0958734753",
        password:"Hop1010ly@",
    }
    correctPhoneAndWrongPassword = {
        phone: "0917697809",
        password:"Hop1010ly",
    }
    correctPhoneAndInvalidPassword= {
        phone: "0917697809",
        password: "acc",
    }
    invalidPhoneAndCorrectPassword = {
        phone: "091397809",
        password: "Hop1010ly@",
    }
    invalidPhoneAnddPassword = {
        phone: "123",
        password: "abc",
    }
}

export default new LoginData;