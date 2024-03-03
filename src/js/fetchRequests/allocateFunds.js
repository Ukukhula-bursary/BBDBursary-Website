const allAllocationsSection = document.getElementById("all-uni-allocations");
const getAllUniversityAllocationsButton = document.getElementById(
  "get-all-uni-allocations"
);

const yearInput = document.getElementById("year-input");
const spentByYearSpan = document.getElementById("bbd-yearly-spent-so-far");
const getAllocationsForYearButton = document.getElementById(
  "get-allocations-for-year"
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
