const BBD_ADMIN_ROLES = [
  "BBDAdmin_Finance",
  "BBDAdmin_Reviewers",
  "BBDSuperAdmin",
];
BBD_ADMIN_ROLES.includes(localStorage.getItem("userRole"));

if (
  !BBD_ADMIN_ROLES.includes(localStorage.getItem("userRole")) &&
  !localStorage.getItem("isSessionActive")
) {
  window.location.href = "/";
}

const allAllocationsSection = document.getElementById("all-uni-allocations");
const getAllUniversityAllocationsButton = document.getElementById(
  "get-all-uni-allocations"
);

const yearInput = document.getElementById("year-input");
const spentByYearSpan = document.getElementById("bbd-yearly-spent-so-far");
const getAllocationsForYearButton = document.getElementById(
  "get-allocations-for-year"
);

const nameInput = document.getElementById("uni-name");
const getAllocationByNameButton = document.getElementById(
  "get-allocation-by-name-button"
);
const universityNameSpan = document.getElementById("uni-allocation-by-name");

const getRemainingAllocationButton = document.getElementById(
  "get-remaining-allocation-button"
);

getAllUniversityAllocationsButton.addEventListener("click", () => {
  const url =
    "https://bursary-api-1709020026838.azurewebsites.net/university_allocations/all";

  fetch(url, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);

      allAllocationsSection.innerHTML += data;
    })
    .catch((err) => console.log(err));
});

getAllocationsForYearButton.addEventListener("click", () => {
  const year = yearInput.value;
  const url = `https://bursary-api-1709020026838.azurewebsites.net/university_allocations/year=${year}`;

  fetch(url, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .then((data) => {
      spentByYearSpan.innerHTML += data;
    })
    .catch((err) => console.log(err));
});

getAllocationByNameButton.addEventListener("click", () => {
  const name = nameInput.value;
  const url = `https://bursary-api-1709020026838.azurewebsites.net/university_allocations/university_name=${name}`;

  fetch(url, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      universityNameSpan.innerHTML += data;
    })
    .catch((err) => console.log(err));
});

const remainingYearInput = document.getElementById("uni-year");

//getRemainingAmountInFundForYear
getRemainingAllocationButton.addEventListener("click", () => {
  const name = nameInput.value;
  const year = remainingYearInput.value;
  const url = `https://bursary-api-1709020026838.azurewebsites.net/university_allocations/remaining_fund/university_name=${name}/year=${year}`;

  fetch(url, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      universityNameSpan.innerHTML += data;
    })
    .catch((err) => console.log(err));
});
