const getAllUniversitiesButton = document.getElementById(
  "all-universities-button"
);
const displayAllUniversities = document.getElementById("all-universities");

const addNewUniversityButton = document.getElementById(
  "add-new-university-button"
);
const newUniversityInput = document.getElementById("new-university");

const getUniverityByIdButton = document.getElementById(
  "get-univerity-by-id-button"
);
const displayUniversityById = document.getElementById("university-by-id");

addNewUniversityButton.addEventListener("click", (e) => {
  e.preventDefault();
  const value = newUniversityInput.value;
  const url = "/universities";
  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ UniversityName: value }),
  })
    .then((res) => res.json())
    .then(() => location.reload()) //should get all after posted
    .catch((err) => console.log(err));
});

getUniverityByIdButton.addEventListener("click", (e) => {
  e.preventDefault();

  const url = "/universities/{id}";
  fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => (displayUniversityById.innerHTML += `${data}`))
    .catch((err) => console.log(err));
});
