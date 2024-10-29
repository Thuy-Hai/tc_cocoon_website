class LoginData {
    phoneNPasswordCorrect = {
        phone: "0917697809",
        password:"Hop1010ly@",
    }

    wrongPhoneNcorrectPassword = {
        phone: "0958734753",
        password:"Hop1010ly@",
    }
    correctPhoneNwrongPassword = {
        phone: "0917697809",
        password:"Hop1010ly",
    }
    correctPhoneNinvalidPassword= {
        phone: "0917697809",
        password: "acc",
    }
    invalidPhoneNcorrectPassword = {
        phone: "091397809",
        password: "Hop1010ly@",
    }
    invalidPhoneNinvalidPassword = {
        phone: "123",
        password: "abc",
    }

}

export default new LoginData;