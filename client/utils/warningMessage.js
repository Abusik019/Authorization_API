export default function warningMessage(target, messageItem){
    target?.addEventListener('mouseenter', () => {
        messageItem.style.display = 'block';
    })

    target.addEventListener('mouseleave', () => {
        messageItem.style.display = 'none';
    })
}