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
const Role = {
  BBDAdmin_Finance: 2,
  BBDAdmin_Reviewers: 3,
  BBDSuperAdmin: 1,
  HOD: 5,
  Student: 4,
  UniversityAdmin: 6
};


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
async function addAdmin(formData) {
  const url = "http://localhost:8090/users/new";
  try {
      const response = await fetch(url, {
          method: "POST",
          mode: "cors",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
      });
      if (!response.ok) {
          throw new Error('Failed to add admin');
      }
      const data = await response.json();
      return data;
  } catch (error) {
      console.error("Error adding admin:", error);
      throw error;
  }
}

const adminData = {
  firstName: document.getElementById("firstName").value,
  lastName: document.getElementById("lastName").value,
  phoneNumber: document.getElementById("phone-number").value,
  email: document.getElementById("emailAddress").value,
  isActiveUser: 1, // Assuming you want to create an active user
  roleId: document.getElementById("admin-role-dropdown").options[this.selectedIndex].value// Role ID from Role enum

};
document.getElementById("addbutton").addEventListener("click", () => {
console.log("hello");

})
document.getElementById("add-an-admin-form").addEventListener("submit", async function (event) {
  event.preventDefault();


  try {
    console.log(adminData.roleId);
      const addedAdmin = await addAdmin(adminData);
      console.log("Admin added successfully:", addedAdmin);
      document.getElementById("successMessage").textContent = "Admin added successfully!";
      // You can optionally reset the form here
      // document.getElementById("add-an-admin-form").reset();
  } catch (error) {
      console.error("Failed to add admin:", error);
      document.getElementById("successMessage").textContent = "Failed to add admin. Please try again.";
  }
});

