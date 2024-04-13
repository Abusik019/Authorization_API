const   errorReg = document.querySelector('.error_message.email.reg'),
        errorAuth = document.querySelector('.error_message.email.auth'),
        emailRegWarning = document.getElementById('email_reg_warning'),
        emailAuthWarning = document.getElementById('email_auth_warning');


export default function  emailValidation(emailArg){
    if(!emailArg){
        errorReg.textContent = "Это поле не может быть пустым";
        errorAuth.textContent = "Это поле не может быть пустым";
    } else{
        errorReg.textContent = "Введите почту верно";
        errorAuth.textContent = "Введите почту верно";
    }

    const regExp = /^\w+@\w+\.\w+$/.test(emailArg);

    if(!regExp){
        emailRegWarning.style.display = 'block';
        emailAuthWarning.style.display = 'block';
        return false
    } else{
        emailRegWarning.style.display = 'none';
        emailAuthWarning.style.display = 'none';
        return true
    }
}
