import nameValidation from "./utils/name-validation.js";
import warningMessage from "./utils//warningMessage.js";
import emailValidation from "./utils/email-validation.js";
import surnameValidation from "./utils/surname-validation.js";
import passwordValidation from "./utils/password-validation.js";
import showPassword from "./utils/show-password.js";

//Buttons
const   regBtn = document.querySelector(".reg_btn"),
        authBtn = document.querySelector(".auth_btn"),
        submitRegBtn = document.getElementById("submit_reg_btn"),
        submitAuthBtn = document.getElementById("submit_auth_btn");
//Forms
const regForm = document.forms.reg_form,
    authForm = document.forms.auth_form;
//Inputs
const regName = document.forms.reg_form.name,
    regSurname = document.forms.reg_form.surname,
    regEmail = document.forms.reg_form.email,
    regPassword = document.forms.reg_form.password;

const   authEmail = document.forms.auth_form.email,
        authPassword = document.forms.auth_form.password; 
//Images
const nameWarning = document.getElementById("name_warning"),
    surnameWarning = document.getElementById("surname_warning"),
    emailRegWarning = document.getElementById("email_reg_warning"),
    emailAuthWarning = document.getElementById("email_auth_warning"),
    passwordWarningReg = document.getElementById("password_reg_warning"),
    passwordWarningAuth = document.getElementById("password_auth_warning"),
    showAuthPassword = document.getElementById("show_auth_password"),
    showRegPassword = document.getElementById("show_reg_password");
//Error messages
const errorMessageName = document.querySelector(".error_message.name"),
    errorMessageSurname = document.querySelector(".error_message.surname"),
    errorMessageEmailReg = document.querySelector(".error_message.email.reg"),
    errorMessageEmailAuth = document.querySelector(".error_message.email.auth"),
    errorMessagePasswordReg = document.querySelector(".error_message.password.reg"),
    errorMessagePasswordAuth = document.querySelector(".error_message.password.auth");

regBtn?.addEventListener("click", () => {
    regForm.style.display = "flex";
    authForm.style.display = "none";
    authBtn.style.display = "none";
    regBtn.style.display = "none";
});

authBtn?.addEventListener("click", () => {
    regForm.style.display = "none";
    authForm.style.display = "flex";
    authBtn.style.display = "none";
    regBtn.style.display = "none";
});

//Inputs checks
regName?.addEventListener("input", () => {
    if (!nameValidation(regName.value)) {
        warningMessage(nameWarning, errorMessageName);
    }

    return;
});

regSurname?.addEventListener("input", () => {
    if (!surnameValidation(regSurname.value)) {
        warningMessage(surnameWarning, errorMessageSurname);
    }

    return;
});

regEmail?.addEventListener("input", () => {
    if (!emailValidation(regEmail.value)) {
        warningMessage(emailRegWarning, errorMessageEmailReg);
    }

    return;
});

regPassword?.addEventListener("input", () => {
    if (!passwordValidation(regPassword.value)) {
        warningMessage(passwordWarningReg, errorMessagePasswordReg);
    }

    return;
});

authEmail?.addEventListener("input", () => {
    if (!emailValidation(authEmail.value)) {
        warningMessage(emailAuthWarning, errorMessageEmailAuth);
    }

    return;
});

authPassword?.addEventListener("input", () => {
    if (!passwordValidation(authPassword.value)) {
        warningMessage(passwordWarningAuth, errorMessagePasswordAuth);
    }

    return;
});


showAuthPassword.addEventListener("click", (e) => {
    showPassword(authPassword, e)
});

showRegPassword.addEventListener("click", (e) => {
    showPassword(regPassword, e)
});

//POST request
async function postRegData() {
    try {
        const response = await axios.post(
            "http://localhost:1339/api/user/signup",
            JSON.stringify({
                name: regName.value,
                surname: regSurname.value,
                email: regEmail.value,
                password: regPassword.value,
            })
        );

        // http://localhost:5500/api/user/auth
        
        alert('Reg form')

        console.log("Ответ сервера:", response.status, response.statusText, response.data);
    } catch (error) {
        console.error("Ошибка запроса:", error);
    }
}

regForm?.addEventListener("submit", async (e) => {
    e.preventDefault(); 
    e.stopPropagation();  
    e.stopImmediatePropagation();

    await postRegData();

    window.history.back();
});


//PATCH request
async function postAuthData() {
    try {
        const response = await axios.post(
            "http://localhost:1339/api/user/login",
            JSON.stringify({
                email: authEmail.value,
                password: authPassword.value,
                isLogin: true
            })
        )

        response.then((res) => {
            console.log(res)
        })
    } catch (error) {
        console.error("Ошибка запроса:", error.response.status, error.response.statusText);
    }
}

submitAuthBtn?.addEventListener("click", async (e) => {
    e.preventDefault();

    await postAuthData();
});
