const userByEmailButton = document.getElementById("user-by-email-button");
const displayUserByEmail = document.getElementById("user-by-email");

const userExistsButton = document.getElementById("user-exists-button");
const displayUserExists = document.getElementById("user-exists");

const addNewUserButton = document.getElementById("add-new-user-button");

const updateUserButton = document.getElementById("update-user-button");

const updateRoleButton = document.getElementById("update-role-button");

userByEmailButton.addEventListener("click", (e) => {
  e.preventDefault();
  const url =
    "https://bursary-api-1709020026838.azurewebsites.net/users/get/susan.white@bbd.co.za";
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

  const url = "http://localhost:8090/users/exists/david.green@bbd.co.za";

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

addNewUserButton.addEventListener("click", (e) => {
  e.preventDefault();
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const userRoleId = document.getElementById("userRoleID").value;
  const phoneNumber = document.getElementById("phoneNumber").value;
  const email = document.getElementById("email").value;

  const url = "http://localhost:8090/users/new";

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
    }),
  })
    .then((res) => {
      console.log(res.json());
      res.json();
    })
    .then(() => {
      console.log("user added");
    })
    .catch((err) => console.log(err, "this is err"));
});

updateUserButton.addEventListener("click", (e) => {
  e.preventDefault();

  //get edit button
});
