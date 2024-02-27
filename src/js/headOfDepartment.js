const form = document.getElementById("generic-form");
const submitButton = document.getElementById("submit-button");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(form);

  const url = "https://bursary-api-1709020026838.azurewebsites.net/";

  fetch(url, {
    method: "POST",
    mode: "cors",
    body: formData,
  })
    .then((res) => res.json())
    .then(() => location.reload())
    .catch((err) => console.log(err));
});
