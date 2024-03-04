const addNewUniversityButton = document.getElementById("add-new-submit-button");

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
document.getElementById("add-new-submit-button").disabled = true;
addNewUniversityButton.addEventListener("click", (e) => {
  e.preventDefault();

  const universityName = document.getElementById("university-name").value;

  const url =
    "https://bursary-api-1709020026838.azurewebsites.net/university/add";
  document.getElementById("add-new-submit-button").disabled = true;

  fetch(url, {
    method: "POST",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      universityName: universityName,
    }),
  })
    .then((res) => console.log(res.json()))
    .then((data) => {
      alert("Institution add successful.");
      return;
    })
    .catch((err) => console.log(err))
    .finally(() => {
      document.getElementById("add-new-submit-button").disabled = false;
    });
});
