export default function showPassword(target, e){
    if (target.type === "password") {
        target.type = "text";
        e.target.src = "./image/hide.png";
    } else {
        target.type = "password";
        e.target.src = "./image/show.png";
    }
}