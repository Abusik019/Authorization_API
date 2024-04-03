const   error = document.querySelector('.error_message.email'),
        emailWarning = document.getElementById('email_warning');


export default function emailValidation(emailArg){
    if(!emailArg){
        error.textContent = "Это поле не может быть пустым";
    } else{
        error.textContent = "Введите почту верно";
    }

    const regExp = /^\w+@\w+\.\w+$/.test(emailArg);

    if(!regExp){
        emailWarning.style.display = 'block';
        return false
    } else{
        emailWarning.style.display = 'none';
        return true
    }
}
