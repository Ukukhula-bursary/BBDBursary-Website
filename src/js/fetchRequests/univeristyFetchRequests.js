const addNewUniversityButton = document.getElementById(
  "add-new-university-button"
);

async function getAllUniversities() {
  const url =
    "https://bursary-api-1709020026838.azurewebsites.net/university/all";
  return fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch((err) => console.log(err)); //alert
}

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
