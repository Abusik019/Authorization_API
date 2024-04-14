export default async function getUsers(url, container) {
    container.innerHTML = "";

    const { data } = await axios(url);
    return data.forEach((user) => {
        const li = document.createElement("li");
        li.innerHTML = `
                <img src="../client/image/user.png" alt="user"/>
                <h1>${user.name}</h1>
                <h2>${user.email}</h2>
            `;
        const status = document.createElement("img");
        status.className = "verify";
        status.setAttribute(
            "src",
            `${
                user.isLogin
                    ? "../client/image/verify.png"
                    : "../client/image/noverify.svg"
            }`
        );

        status.addEventListener("click", async () => {
            await axios.patch(`http://localhost:1339/api/users?id=${user.id}`, {
                isLogin: user.isLogin ? false : true,
            });
        });

        const deleteItem = document.createElement('img');
        deleteItem.className = 'delete_item';
        deleteItem.src = '../client/image/delete.svg';

        deleteItem.addEventListener('click', async () => {
            await axios.delete(`http://localhost:1339/api/users?id=${user.id}`);
            alert('User has been deleted successfully');
        })


        li.appendChild(status);
        li.appendChild(deleteItem);

        container.appendChild(li);
    });
}
