const getApplicationByIdButton = document.getElementById(
  "get-application-by-id"
);
const displayApplication = document.getElementById("display-university-id");

const getAllUniversityAllocationsButton = document.getElementById(
  "university-allocation-by-id-button"
);
const displayAllUniversityAllocations = document.getElementById(
  "all-university-allocations"
);

const updateAllFundsButton = document.getElementById("update-all-funds-button");

const addNewAllocationButton = document.getElementById(
  "add-new-allocation-button"
);
const addNewAllocationInput = document.getElementById("add-new");

const getTotalSpentButton = document.getElementById("total-spent-button");
const displayTotalSpent = document.getElementById("total-spent");

const getAllUniversitiesButton = document.getElementById(
  "all-universities-button"
);
const displayAllUniversities = document.getElementById("all-universities");

const addNewUniversityButton = document.getElementById(
  "add-new-university-button"
);
const newUniversityInput = document.getElementById("new-university");

getApplicationByIdButton.addEventListener("click", (e) => {
  e.preventDefault();

  const url = "/universities/application/{id}";
  fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => (displayApplication.innerHTML += `${data}`))
    .catch((err) => console.log(err));
});

getAllUniversityAllocationsButton.addEventListener("click", (e) => {
  e.preventDefault();
  const url = "/universities/all";
  fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => (displayAllUniversityAllocations.innerHTML += `${data}`))
    .catch((err) => console.log(err));
});

updateAllFundsButton.addEventListener("click", (e) => {
  e.preventDefault();
  const url = "/universities/allocate-to-all";
  fetch(url, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ Amount: updatedAmount }),
  })
    .then((res) => res.json())
    .then(() => location.reload())
    .catch((err) => console.log(err));
});

addNewAllocationButton.addEventListener("click", (e) => {
  e.preventDefault();
  const value = addNewAllocationInput.value;
  const url = "/universities/addNew";
  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ Amount: value }),
  })
    .then((res) => res.json())
    .then(() => location.reload()) //should get all after posted
    .catch((err) => console.log(err));
});

getTotalSpentButton.addEventListener("click", (e) => {
  e.preventDefault();

  const url = "/universities/totalspent/{year}";
  fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => (displayTotalSpent.innerHTML += `${data}`))
    .catch((err) => console.log(err));
});

getAllUniversitiesButton.addEventListener("click", (e) => {
  e.preventDefault();

  const url = "/universities";
  fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => (displayAllUniversities.innerHTML += `${data}`))
    .catch((err) => console.log(err));
});

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
