const getApplicationById = document.getElementById("get-application-by-id");
const displayApplicationSection = document.getElementById(
  "display-university-id"
);

getApplicationById.addEventListener("click", (e) => {
  e.preventDefault();

  const url = "/universities/application/{id}";
  fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => (displayApplicationSection.innerHTML += `${data}`))
    .catch((err) => console.log(err));
});
