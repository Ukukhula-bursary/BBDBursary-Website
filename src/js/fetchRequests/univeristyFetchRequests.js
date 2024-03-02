const addNewUniversityButton = document.getElementById(
  "add-new-university-button"
);
const universityIdInput = document.getElementById("uni-id");
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

addNewUniversityButton.addEventListener("click", (e) => {
  e.preventDefault();
  const universityName = document.getElementById("university-name").value;
  const isActive = document.getElementById("is-active-recipient").value;

  const url =
    "https://bursary-api-1709020026838.azurewebsites.net/university/add";
  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      universityName: universityName,
      isActiveRecipient: isActive,
    }),
  })
    .then((res) => res.json())
    .then((data) => console.log(data)) //should get all after posted
    .catch((err) => console.log(err));
});

getUniverityByIdButton.addEventListener("click", () => {
  const universityId = universityIdInput.value;
  const url = `https://bursary-api-1709020026838.azurewebsites.net/university/${universityId}`;
  fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      displayUniversityById.innerHTML += `${data}`;
      console.log(data);
    })
    .catch((err) => console.log(err));
});
