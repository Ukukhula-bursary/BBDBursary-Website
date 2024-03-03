async function addAnAdmin() {
  const url = "https://bursary-api-1709020026838.azurewebsites.net/roles/";
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

const selectDropdown = document.getElementById("admin-role-dropdown");

async function populateRolesDropdown() {
  selectDropdown.disabled = true;
  const roles = await addAnAdmin();

  if (roles.length) {
    selectDropdown.disabled = false;
    for (const role of roles) {
      const newOption = document.createElement("option");
      newOption.text = role.role;
      newOption.value = role.id;
      selectDropdown.add(newOption);
    }
  }
}
populateRolesDropdown();
