const error = document.querySelector('.error_message.name');
const nameWarning = document.getElementById('name_warning');

export default function nameValidation(nameArg){
    if(!nameArg){
        error.textContent = "Это поле не может быть пустым";
    } else{
        error.textContent = "Введите имя верно";
    }

    const regExp = /^[a-zа-я]{1,}$/i.test(nameArg);

    if(!regExp){
        nameWarning.style.display = 'block';
        return false
    } else{
        nameWarning.style.display = 'none';
        return true
    }
}
