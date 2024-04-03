const error = document.querySelector('.error_message.surname');
const surnameWarning = document.getElementById('surname_warning');

export default function surnameValidation(nameArg){
    if(!nameArg){
        error.textContent = "Это поле не может быть пустым";
    } else{
        error.textContent = "Введите фамилию верно";
    }

    const regExp = /^[a-zа-я]{1,}$/i.test(nameArg);

    if(!regExp){
        surnameWarning.style.display = 'block';
        return false
    } else{
        surnameWarning.style.display = 'none';
        return true
    }
}
