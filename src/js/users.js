const searchUserEmail = document.getElementById("search-user-email");
const userByEmailButton = document.getElementById("user-by-email-button");
const displayUserByEmail = document.getElementById("user-by-email");

const userExistsButton = document.getElementById("user-exists-button");
const displayUserExists = document.getElementById("user-exists");

const getAllUsersButton = document.getElementById("all-users-button");
const displayAllUsers = document.getElementById("all-users");

const addNewUserButton = document.getElementById("add-new-user-button");

const updateUserButton = document.getElementById("update-user-button");

const updateRoleButton = document.getElementById("update-role-button");

userByEmailButton.addEventListener("click", (e) => {
  e.preventDefault();
  const userEmail = searchUserEmail.value;
  const url = `https://bursary-api-1709020026838.azurewebsites.net/users/get/${userEmail}`;
  fetch(url, {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "Application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      displayUserByEmail.innerHTML += `${data}`;
    })
    .catch((err) => console.log(err));
});

userExistsButton.addEventListener("click", (e) => {
  e.preventDefault();
  const userEmail = searchUserEmail.value;
  const url = `https://bursary-api-1709020026838.azurewebsites.net/users/exists/${userEmail}`;

  fetch(url, {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "Application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      displayUserExists.innerHTML += `${data}`;
    })
    .catch((err) => console.log(err));
});

getAllUsersButton.addEventListener("click", (e) => {
  e.preventDefault();
  const url = "https://bursary-api-1709020026838.azurewebsites.net/users/all";

  fetch(url, {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "Application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      displayAllUsers.innerHTML += `${data}`;
    })
    .catch((err) => console.log(err));
});

addNewUserButton.addEventListener("click", (e) => {
  e.preventDefault();
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const userRoleId = document.getElementById("userRoleID").value;
  const phoneNumber = document.getElementById("phoneNumber").value;
  const email = document.getElementById("email").value;
  const activeID = document.getElementById("isActiveID").value;

  const url = "https://bursary-api-1709020026838.azurewebsites.net/users/new";

  fetch(url, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "Application/json",
    },
    body: JSON.stringify({
      firstName: firstName,
      lastName: lastName,
      userRoleId: userRoleId,
      phoneNumber: phoneNumber,
      email: email,
      isActiveID: activeID,
    }),
  })
    .then((res) => res.json())
    .then(() => {
      console.log("user added");
    })
    .catch((err) => console.log(err, "this is err"));
});

updateUserButton.addEventListener("click", (e) => {
  e.preventDefault();

  //get edit button
});
