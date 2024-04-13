export default function getUsers(url, container) {
    container.innerHTML = "";

    axios
        .get(url)
        .then((res) => {
            const data = res.data;
            return data;
        })
        .then((data) => {
            data.forEach((user) => {
                const li = document.createElement("li");
                li.innerHTML = `
                     <img src="../client/image/user.png" alt="user"/>
                     <h1>${user.name}</h1>
                     <h2>${user.email}</h2>
                     <img class="verify" src="${
                         user.isLogin
                             ? "../client/image/verify.png"
                             : "../client/image/noverify.svg"
                     }"/>
                 `;
                container.appendChild(li);
            });
        });
}
