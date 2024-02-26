const getAllocationByIdButton = document.getElementById(
  "university-allocation-by-id-button"
);
const displayUniversityAllocationId = document.getElementById(
  "university-allocation-id"
);

getAllocationByIdButton.addEventListener("click", (e) => {
  e.preventDefault();

  const url = "/universities/{id}";
  fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => (displayUniversityAllocationId.innerHTML += `${data}`))
    .catch((err) => console.log(err));
});
