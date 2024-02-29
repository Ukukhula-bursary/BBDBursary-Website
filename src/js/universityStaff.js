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

addUniversityStaffButton.addEventListener("click", () => {
  const url =
    "https://bursary-api-1709020026838.azurewebsites.net/universitystaff/add";

  fetch(url, {
    method: "POST",
    mode: "cors",
    body: JSON.stringify({
      firstName: document.getElementById("fname").value,
      lastName: document.getElementById("lname").value,
      phoneNumber: document.getElementById("phone-number").value,
      email: document.getElementById("email").value,
      universityName: document.getElementById("university-name").value,
      departmentName: document.getElementById("department-name").value,
    }),
  })
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
});
