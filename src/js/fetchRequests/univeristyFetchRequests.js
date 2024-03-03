const addNewUniversityButton = document.getElementById("add-new-submit-button");
const universityIdInput = document.getElementById("uni-id");
const getUniverityByIdButton = document.getElementById(
  "get-univerity-by-id-button"
);
const displayUniversityById = document.getElementById("university-by-id");

const univerityNameInput = document.getElementById("uni-name");
const getUniverityByNameButton = document.getElementById(
  "get-univerity-by-name-button"
);
const displayUniversityName = document.getElementById("university-by-name");

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
  console.log(universityName);
  const url =
    "https://bursary-api-1709020026838.azurewebsites.net/university/add";
  fetch(url, {
    method: "POST",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      universityName: universityName,
    }),
  })
    .then((res) => console.log(res.json()))
    .then((data) => data)
    .catch((err) => console.log(err));
});

// getUniverityByIdButton.addEventListener("click", () => {
//   const universityId = universityIdInput.value;
//   const url = `https://bursary-api-1709020026838.azurewebsites.net/university/${universityId}`;
//   fetch(url, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   })
//     .then((res) => res.json())
//     .then((data) => {
//       displayUniversityById.innerHTML += `${data}`;
//       console.log(data);
//     })
//     .catch((err) => console.log(err));
// });

// getUniverityByNameButton.addEventListener("click", () => {
//   const universityName = univerityNameInput.value;
//   const url = `https://bursary-api-1709020026838.azurewebsites.net/university/name=${universityName}`;
//   fetch(url, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   })
//     .then((res) => res.json())
//     .then((data) => {
//       // displayUniversityName.innerHTML += `${data}`;
//       console.log(data);
//     })
//     .catch((err) => console.log(err));
// });
