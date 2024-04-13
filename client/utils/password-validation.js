const errorReg = document.querySelector(".error_message.password.reg"),
    errorAuth = document.querySelector(".error_message.password.auth"),
    passwordWarningReg = document.getElementById("password_reg_warning"),
    passwordWarningAuth = document.getElementById("password_auth_warning");

export default function passwordValidation(nameArg) {
    if (!nameArg) {
        errorReg.textContent = "Это поле не может быть пустым";
        errorAuth.textContent = "Это поле не может быть пустым";
    } else {
        errorReg.textContent = "Введите пароль верно";
        errorAuth.textContent = "Введите пароль верно";
    }

    const regExp = /^(?=.*[a-zA-Zа-яА-Я])(?=.*\d).{8,}$/.test(nameArg);

    if (!regExp) {
        passwordWarningReg.style.display = "block";
        passwordWarningAuth.style.display = "block";
        return false;
    } else {
        passwordWarningReg.style.display = "none";
        passwordWarningAuth.style.display = "none";
        return true;
    }
}
