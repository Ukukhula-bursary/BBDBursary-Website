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
      //console.log(data);
      return data;
    })
    .catch((err) => console.log(err));
}

const universityStatusSelect = document.getElementById("university-status");

async function populateUniversityDropdown() {
  universityStatusSelect.disabled = true;
  const universities = await getAllUniversities();

  if (universities.length) {
    universityStatusSelect.disabled = false;
    for (const university of universities) {
      const newOption = document.createElement("option");
      newOption.text = university.universityName;
      newOption.value = university.universityId;
      universityStatusSelect.add(newOption);
    }
  }
}
populateUniversityDropdown();
