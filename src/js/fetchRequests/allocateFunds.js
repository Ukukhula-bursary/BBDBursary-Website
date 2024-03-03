const allAllocationsSection = document.getElementById("all-uni-allocations");
const getAllUniversityAllocationsButton = document.getElementById(
  "get-all-uni-allocations"
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
      allAllocationsSection.innerHTML += data;
    })
    .catch((err) => console.log(err));
});
