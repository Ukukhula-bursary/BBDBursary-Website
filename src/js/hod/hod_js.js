const UNIVERSITY_ADMIN_ROLES = ["ROLE_HOD", "ROLE_UniversityAdmin"];
if (
  !UNIVERSITY_ADMIN_ROLES.includes(localStorage.getItem("userRole")) ||
  localStorage.getItem("isSessionActive") === "false"
) {
  window.location.href = "/";
}

// fill in these with API

let university_choices = [
  "University of Cape Town",
  "University of the Witwatersrand",
  "Stellenbosch University",
  "University of Pretoria",
  "University of Johannesburg",
  "University of KwaZulu - Natal",
  "University of the Western Cape",
  "Rhodes University",
  "Nelson Mandela University",
  "University of Limpopo",
  "University of Venda",
  "University of Fort Hare",
];

let department_choices = [
  "University Administration",
  "Computer Science",
  "Information Technology",
  "Software Engineering",
  "Cybersecurity",
  "Data Science",
];

let ethnicity_choices = ["Black", "Coloured", "Indian", "Other"];

document.addEventListener("DOMContentLoaded", function () {
  function fillInEthnicityRadioButtons() {
    let selectEthnicity = document.getElementById("ethnicity");
    // fill in with api
    let options = ["Black", "Coloured", "Indian", "Other"];
    for (let i = 0; i < options.length; i++) {
      let opt = options[i];
      let el = document.createElement("input");
      // el.type = "radio";
      el.setAttribute("type", "radio");
      // el.id = opt;
      el.setAttribute("id", opt);
      el.name = "ethnicity_choice";
      el.setAttribute("name", "ethnicity_choice");
      // el.value = opt;
      el.setAttribute("value", opt);
      selectEthnicity.appendChild(el);

      let elLabel = document.createElement("label");
      elLabel.setAttribute("for", opt);
      elLabel.innerText = opt;
      elLabel.value = opt;
      selectEthnicity.appendChild(elLabel);
    }
  }

  function fillInUniversityList() {
    let select = document.getElementById("select-university");

    for (let i = 0; i < university_choices.length; i++) {
      let opt = university_choices[i];
      let el = document.createElement("option");
      el.textContent = opt;
      el.value = opt;
      select.appendChild(el);
    }
    let el = document.createElement("option");
    el.textContent = "Other";
    el.value = "Other";
    select.appendChild(el);
  }
  fillInUniversityList();

  const selectElement = document.getElementById("select-university");
  selectElement.addEventListener("change", (event) => {
    console.log(selectElement.value);

    if (
      university_choices.includes(selectElement.value) &&
      selectElement.value
    ) {
      document.getElementById("generic-form").style.display = "flex";
    } else {
      document.getElementById("generic-form").style.display = "none";
    }
  });

  function fillInHodDepartmentList() {
    let select = document.getElementById("hod-department");

    for (let i = 0; i < department_choices.length; i++) {
      console.log(i);
      let opt = department_choices[i];
      let el = document.createElement("option");
      el.textContent = opt;
      el.value = opt;
      select.appendChild(el);
    }
  }
  fillInHodDepartmentList();
  fillInEthnicityRadioButtons();
});
