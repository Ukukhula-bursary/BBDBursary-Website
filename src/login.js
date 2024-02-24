const email = document.getElementById("email");
const password = document.getElementById("password");
const loginSubmitButton = document.getElementById("login-submit");

loginSubmitButton.addEventListener("click", (e) => {
  e.preventDefault();

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email.value,
      password: password.value,
    }).then((res) => res.json()),
  });
});
