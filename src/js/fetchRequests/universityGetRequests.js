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
