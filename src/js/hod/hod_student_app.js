const UNIVERSITY_ADMIN_ROLES = ["HOD", "UniversityAdmin"];
if (
  !UNIVERSITY_ADMIN_ROLES.includes(localStorage.getItem("userRole")) &&
  !localStorage.getItem("isSessionActive")
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

  fillInEthnicityRadioButtons();
});
