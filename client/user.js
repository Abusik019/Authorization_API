import getUsers from "./utils/get_users.js"

const USERS_URL = "http://localhost:1339/api/users";
// Buttons
const sortBtn = document.getElementById("sort_btn"),
    allUsersBtn = document.getElementById("all_users"),
    regUsersBtn = document.getElementById("reg_users");
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

// All users
allUsersBtn.addEventListener("click", () => {
    getUsers(USERS_URL, usersContainer);   
});

// Only registered users
regUsersBtn.addEventListener("click", () => {
    getUsers(`${USERS_URL}?reg=true`, usersContainer);
});

// Users sort by name
sortByName.addEventListener("click", () => {
    getUsers(`${USERS_URL}?filter=name`, usersContainer);
});

// Users sort by reg
sortByReg.addEventListener("click", () => {
    getUsers(`${USERS_URL}?filter=reg`, usersContainer);
});

// Users sort by email
sortByEmail.addEventListener("click", () => {
    getUsers(`${USERS_URL}?filter=email`, usersContainer);
});
