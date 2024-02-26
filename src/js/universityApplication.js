const getApplicationByIdButton = document.getElementById(
  "get-application-by-id"
);
const displayApplication = document.getElementById("display-university-id");

getApplicationByIdButton.addEventListener("click", (e) => {
  e.preventDefault();

  const url = "/universities/application/{id}";
  fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => (displayApplication.innerHTML += `${data}`))
    .catch((err) => console.log(err));
});
