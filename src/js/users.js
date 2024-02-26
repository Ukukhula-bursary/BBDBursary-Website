const userByEmailButton = document.getElementById("user-by-email-button");
const displayUserByEmail = document.getElementById("user-by-email");

userByEmailButton.addEventListener("click", (e) => {
  e.preventDefault();

  const url = "localhost:8090/users/get/susan.white@bbd.co.za";
  fetch(url, {
    method: "GET",
    headers: {
      " Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => (displayUserByEmail.innerHTML += `${data}`))
    .catch((err) => console.log(err));
});
