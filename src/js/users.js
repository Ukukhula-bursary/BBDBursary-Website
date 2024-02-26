const userByEmailButton = document.getElementById("user-by-email-button");
const displayUserByEmail = document.getElementById("user-by-email");

userByEmailButton.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("clicked");
  const url = "http://localhost:8090/users/get/susan.white@bbd.co.za";
  fetch(url, {
    method: "GET",
    mode: "no-cors",
    headers: {
      "Content-Type": "Application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      displayUserByEmail.innerHTML += `${data}`;
    })
    .catch((err) => console.log(err, "hi"));
});
