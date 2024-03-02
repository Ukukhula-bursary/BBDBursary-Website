const allUniversitiesStaffButton = document.getElementById(
  "all-universities-staff-button"
);
const allUniversityStaff = document.getElementById("all-university-staff");

const addUniversityStaffButton = document.getElementById(
  "add-university-staff-button"
);

const universityStaffByIdButton = document.getElementById(
  "university-staff-by-id-button"
);
const universityStaffId = document.getElementById("university-staff-by-id");

const universityNameSelect = document.getElementById(
  "university-name-dropdown"
);

const departmentNameSelect = document.getElementById(
  "department-name-dropdown"
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
      return data;
    })
    .catch((err) => console.log(err));
}

async function populateUniversityDropdown() {
  universityNameSelect.disabled = true;
  const universities = await getAllUniversities();

  if (universities.length) {
    universityNameSelect.disabled = false;
    for (const university of universities) {
      const newOption = document.createElement("option");
      newOption.text = university.universityName;
      newOption.value = university.universityId;
      universityNameSelect.add(newOption);
    }
  }
}
populateUniversityDropdown();

async function getAllDepartments() {
  const url =
    "https://bursary-api-1709020026838.azurewebsites.net/department/all";
  return fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      return data;
    })
    .catch((err) => console.log(err));
}

async function populateDepartmentsDropdown() {
  departmentNameSelect.disabled = true;
  const departments = await getAllDepartments();

  if (departments.length) {
    departmentNameSelect.disabled = false;
    for (const department of departments) {
      const newOption = document.createElement("option");
      newOption.text = department.departmentName;
      newOption.value = department.departmentId;
      departmentNameSelect.add(newOption);
    }
  }
}
populateDepartmentsDropdown();

// allUniversitiesStaffButton.addEventListener("click", () => {
//   const url =
//     "https://bursary-api-1709020026838.azurewebsites.net/universitystaff/all";

//   fetch(url, {
//     method: "GET",
//     mode: "cors",
//   })
//     .then((res) => res.json())
//     .then((data) => console.log(data))
//     .catch((err) => console.log(err));
// });

addUniversityStaffButton.addEventListener("click", () => {
  const url =
    "https://bursary-api-1709020026838.azurewebsites.net/universitystaff/add";

  const universityName =
    universityNameSelect.options[universityNameSelect.selectedIndex].value;
  const departmentName =
    departmentNameSelect.options[departmentNameSelect.selectedIndex].value;

  fetch(url, {
    method: "POST",
    mode: "cors",
    body: JSON.stringify({
      firstName: document.getElementById("firstName").value,
      lastName: document.getElementById("lastName").value,
      phoneNumber: document.getElementById("phone-number").value,
      email: document.getElementById("email").value,
      universityName: universityName,
      departmentName: departmentName,
    }),
  })
    .then((res) => {
      res.json();
      console.log(res.json());
      //return res.json();
    })
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
});

// universityStaffByIdButton.addEventListener("click", () => {
//   const staffId = document.getElementById("staff-id");
//   const url = `https://bursary-api-1709020026838.azurewebsites.net/universitystaff/id=${staffId}`;

//   fetch(url, {
//     method: "GET",
//     mode: "cors",
//   })
//     .then((res) => res.json())
//     .then((data) => console.log(data))
//     .catch((err) => console.log(err));
// });
