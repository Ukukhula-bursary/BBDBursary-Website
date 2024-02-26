const userByEmailButton = document.getElementById("user-by-email-button");
const displayUserByEmail = document.getElementById("user-by-email");

const userExistsButton = document.getElementById("user-exists-button");
const displayUserExists = document.getElementById("user-exists");

userByEmailButton.addEventListener("click", (e) => {
  e.preventDefault();
  const url = "http://localhost:8090/users/get/susan.white@bbd.co.za";
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
