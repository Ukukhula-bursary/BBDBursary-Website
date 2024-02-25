const getApplicationByIdButton = document.getElementById(
  "get-application-by-id"
);
const displayApplication = document.getElementById("display-university-id");

const getUniversityAllocationByIdButton = document.getElementById(
  "university-allocation-by-id-button"
);
const displayAllUniversityAllocations = document.getElementById(
  "all-university-allocations"
);

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

getUniversityAllocationByIdButton.addEventListener("click", (e) => {
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
