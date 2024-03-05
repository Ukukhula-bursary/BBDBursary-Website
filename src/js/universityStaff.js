const BBD_ADMIN_ROLES = [
  "ROLE_BBDAdmin_Finance",
  "ROLE_BBDAdmin_Reviewers",
  "ROLE_BBDSuperAdmin",
];

if (
  !BBD_ADMIN_ROLES.includes(localStorage.getItem("userRole")) ||
  localStorage.getItem("isSessionActive") === "false"
) {
  window.location.href = "/";
}

const allUniversityStaff = document.getElementById("all-university-staff");

const addUniversityStaffButton = document.getElementById(
  "add-university-staff-button"
);

const universityStaffId = document.getElementById("university-staff-by-id");

const universityNameSelect = document.getElementById(
  "university-name-dropdown"
);

const departmentNameSelect = document.getElementById(
  "department-name-dropdown"
);

const form = document.getElementById("generic-form");

async function getAllUniversities() {
  const url =
    "https://bursary-api-1709020026838.azurewebsites.net/university/all";
  return fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,

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
      newOption.value = university.universityName;
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
      newOption.value = department.departmentName;
      departmentNameSelect.add(newOption);
    }
  }
}
populateDepartmentsDropdown();

addUniversityStaffButton.addEventListener("click", (e) => {
  e.preventDefault();
  const url =
    "https://bursary-api-1709020026838.azurewebsites.net/universitystaff/add";

  const universityName =
    universityNameSelect.options[universityNameSelect.selectedIndex].value;
  const departmentName =
    departmentNameSelect.options[departmentNameSelect.selectedIndex].value;

  document.getElementById("add-university-staff-button").disabled = true;

  fetch(url, {
    method: "POST",
    mode: "cors",
    headers: { "Content-Type": "Application/json" },
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
      return res.json();
    })
    .then((data) => {
      console.log(data);
      alert("HOD added successfully");
      document.getElementById("add-university-staff-button").disabled = false;
      return;
    })
    .catch((err) => {
      alert("HOD could not add successfully");
      console.log(err);
    });
});
