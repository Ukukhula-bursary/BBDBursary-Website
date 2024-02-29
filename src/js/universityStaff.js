const allUniversitiesStaffButton = document.getElementById(
  "all-universities-staff-button"
);
const allUniversityStaff = document.getElementById("all-university-staff");

const addUniversityStaffButton = document.getElementById(
  "add-university-staff-button"
);

const universitySstaffByIdButton = document.getElementById(
  "university-staff-by-id-button"
);
const universityStaffId = document.getElementById("university-staff-by-id");

allUniversitiesStaffButton.addEventListener("click", () => {
  const url =
    "https://bursary-api-1709020026838.azurewebsites.net/universitystaff/all";

  fetch(url, {
    method: "GET",
    mode: "cors",
  })
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
});
