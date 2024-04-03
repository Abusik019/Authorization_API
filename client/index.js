import nameValidation from "./utils/name-validation.js";
import warningMessage from "./utils//warningMessage.js";
import emailValidation from "./utils/email-validation.js";
import surnameValidation from "./utils/surname-validation.js";
import passwordValidation from "./utils/password-validation.js";

//Buttons
const regBtn = document.querySelector(".reg_btn"),
    authBtn = document.querySelector(".auth_btn"),
    submitBtn = document.getElementById("submit_btn");
//Forms
const regForm = document.forms.reg_form,
    authForm = document.forms.auth_form;
//Inputs
const regName = document.forms.reg_form.name,
    regSurname = document.forms.reg_form.surname,
    regEmail = document.forms.reg_form.email,
    regPassword = document.forms.reg_form.password;
//Images
const nameWarning = document.getElementById("name_warning"),
    surnameWarning = document.getElementById("surname_warning"),
    emailWarning = document.getElementById("email_warning"),
    passwordWarning = document.getElementById("password_warning"),
    showPassword = document.getElementById("show_password");
//Error messages
const errorMessageName = document.querySelector(".error_message.name"),
    errorMessageSurname = document.querySelector(".error_message.surname"),
    errorMessageEmail = document.querySelector(".error_message.email"),
    errorMessagePassword = document.querySelector(".error_message.password");

regBtn?.addEventListener("click", () => {
    regForm.style.display = "flex";
    authForm.style.display = "none";
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
        warningMessage(emailWarning, errorMessageEmail);
    }

    return;
});

regPassword?.addEventListener("input", () => {
    if (!passwordValidation(regPassword.value)) {
        warningMessage(passwordWarning, errorMessagePassword);
    }

    return;
});

showPassword.addEventListener("click", (e) => {
    if (regPassword.type === "password") {
        regPassword.type = "text";
        e.target.src = "./image/hide.png";
    } else {
        regPassword.type = "password";
        e.target.src = "./image/show.png";
    }
});

//POST request
async function postData() {
    try {
        const response = await axios.post(
            "http://localhost:5500/authorization",
            JSON.stringify({
                name: regName.value,
                surname: regSurname.value,
                email: regEmail.value,
                password: regPassword.value,
            })
        );

        console.log("Ответ сервера:", response.status, response.statusText, response.data);
    } catch (error) {
        console.error("Ошибка запроса:", error.response.status, error.response.statusText);
    }
}

submitBtn.addEventListener("click", async (e) => {
    e.preventDefault();

    await postData();
});
