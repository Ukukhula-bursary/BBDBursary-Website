const addNewUniversityButton = document.getElementById("add-new-submit-button");
const getUniverityByIdButton = document.getElementById(
  "get-univerity-by-id-button"
);
const displayUniversityById = document.getElementById("university-by-id");

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

addNewUniversityButton.addEventListener("click", () => {
  const universityName = document.getElementById("university-name");
  const select = document.getElementById("university-status");
  const selectedStatus = select.options[select.selectedIndex].value;

  const url =
    "https://bursary-api-1709020026838.azurewebsites.net/university/add";
  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      universityName: universityName,
      isActiveRecipient: selectedStatus,
    }),
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
