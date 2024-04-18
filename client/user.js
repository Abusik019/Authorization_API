import getUsers from "./utils/get_users.js"

const BASE_API_URL = "http://localhost:1339/api";
// Buttons
const sortBtn = document.getElementById("sort_btn"),
    allUsersBtn = document.getElementById("all_users"),
    regUsersBtn = document.getElementById("reg_users"),
    resetBtn = document.getElementById('reset_btn');
// Containers
const sortList = document.querySelector(".sort"),
    usersContainer = document.querySelector(".users");
// Items
const sortListChildren = sortList.querySelectorAll("li"),
    users = usersContainer.querySelectorAll("li"),
    sortByName = document.getElementById("sort_name"),
    sortByEmail = document.getElementById("sort_email"),
    sortByReg = document.getElementById("sort_reg");
// Drop List
sortBtn.addEventListener("mouseenter", () => {
    sortList.classList.add("active");
    sortListChildren.forEach((li) => {
        li.style.display = "block";
    });
});

sortBtn.addEventListener("mouseleave", () => {
    sortList.classList.remove("active");
    sortListChildren.forEach((li) => {
        li.style.display = "none";
    });
});

sortList.addEventListener("mouseenter", () => {
    sortList.classList.add("active");
    sortListChildren.forEach((li) => {
        li.style.display = "block";
    });
});

sortList.addEventListener("mouseleave", () => {
    sortList.classList.remove("active");
    sortListChildren.forEach((li) => {
        li.style.display = "none";
    });
});

// Users scroll
if (users?.length > 9) {
    usersContainer.style.overflowY = "scroll";
} else {
    usersContainer.style.overflowY = "auto";
}

// Load DOM
document.addEventListener('DOMContentLoaded', async () => {
    await getUsers(`${BASE_API_URL}/users`, usersContainer);   
})

// All users
allUsersBtn.addEventListener("click", async () => {
    await getUsers(`${BASE_API_URL}/users`, usersContainer);   
});

// Only registered users
regUsersBtn.addEventListener("click", async () => {
    await getUsers(`${BASE_API_URL}/users?reg=true`, usersContainer);
});

// Users sort by name
sortByName.addEventListener("click", async () => {
    await getUsers(`${BASE_API_URL}/users?filter=name`, usersContainer);
});

// Users sort by reg
sortByReg.addEventListener("click", async () => {
    await getUsers(`${BASE_API_URL}/users?filter=reg`, usersContainer);
});

// Users sort by email
sortByEmail.addEventListener("click", async () => {
    await getUsers(`${BASE_API_URL}/users?filter=email`, usersContainer);
});

resetBtn.addEventListener('click', async () => {
    await axios.post(`http://localhost:1339/api/users/reset`);
})