const error = document.querySelector('.error_message.password');
const passwordWarning = document.getElementById('password_warning');

export default function passwordValidation(nameArg){
    if(!nameArg){
        error.textContent = "Это поле не может быть пустым";
    } else{
        error.textContent = "Введите пароль верно";
    }

    const regExp = /^(?=.*[a-zA-Zа-яА-Я])(?=.*\d).{8,}$/.test(nameArg);

    if(!regExp){
        passwordWarning.style.display = 'block';
        return false
    } else{
        passwordWarning.style.display = 'none';
        return true
    }
}
