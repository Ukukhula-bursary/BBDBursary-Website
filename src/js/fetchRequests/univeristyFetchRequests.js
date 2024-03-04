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
      console.log(data);
      return data;
    })
    .catch((err) => console.log(err)); //alert
}

addNewUniversityButton.addEventListener("click", (e) => {
  e.preventDefault();
  const universityName = document.getElementById("university-name").value;
  console.log(universityName);
  const url =
    "https://bursary-api-1709020026838.azurewebsites.net/university/add";
  fetch(url, {
    method: "POST",
    mode: "cors",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      universityName: universityName,
    }),
  })
    .then((res) => console.log(res.json()))
    .then((data) => data)
    .catch((err) => console.log(err));
});
