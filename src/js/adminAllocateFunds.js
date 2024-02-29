const listApplicationsTesting = () => {
  return [{
    "applicationID": 1,
    "universityName": "University Of Pretoria",
    "fundsRequested": "R100,000.00",
    "status": "Approved",
    "motivation": "I love it here!",
    "dateOfApplication": "2024-01-01",
    "reviewerName": "John",
    "reviewerComment": "Something John Said",
  }, {
    "applicationID": 2,
    "universityName": "University Of Limpopo",
    "fundsRequested": "R100,000.00",
    "status": "Approved",
    "motivation": "I love it also here!",
    "dateOfApplication": "2023-01-01",
    "reviewerName": "John",
    "reviewerComment": "Something John Said",
  }, {
    "applicationID": 3,
    "universityName": "University Of Free State",
    "fundsRequested": "R100,000.00",
    "status": "Approved",
    "motivation": "We would like to be funded",
    "dateOfApplication": "2020-01-01",
    "reviewerName": "John",
    "reviewerComment": "Sorry Not Meeting Quotas",
  }
    , {
    "applicationID": 4,
    "universityName": "University Of The Cape",
    "fundsRequested": "R100,000.00",
    "status": "Approved",
    "motivation": "We would like to be funded",
    "dateOfApplication": "2019-01-01",
    "reviewerName": "John",
    "reviewerComment": "N/A",
  }]
};

async function loadTable() {
  const applications = listApplicationsTesting();
  const tableBody = document.getElementById("tbodyID");

  while (tableBody.lastElementChild && tableBody.lastElementChild.id !== "theadings") {
    tableBody.removeChild(tableBody.lastElementChild);
  }

  for (const application of applications) {
    let tableRow = populateRow(
      application.applicationID,
      application.universityName,
      application.fundsRequested,
      application.status,
      application.motivation,
      application.dateOfApplication,
      application.reviewerName,
      application.reviewerComment,
    );

    tableBody.appendChild(tableRow);
  }
};


loadTable();


function populateRow(...args) {
  const tableRow = document.createElement("tr");
  let cell;
  let cellText;

  const cellValue = [...args];
  cellValue.forEach((element) => {
    cell = document.createElement("td");
    cellText = document.createTextNode(element);
    cell.appendChild(cellText);
    tableRow.appendChild(cell);
  });

  cell = document.createElement("td");
  updateSection = document.createElement("section");
  updateSection.setAttribute("class", "action-button-section");

  selectButton = document.createElement("button");
  const applicationsId = args[0];
  // admin-student-application-view-details-section
  selectButton.setAttribute("id", `select-action-button-${applicationsId}`);
  selectButton.setAttribute("type", "button");
  selectButton.setAttribute("class", "action-button");
  selectButton.setAttribute("value", applicationsId);
  selectButton.textContent = "Select";

  selectButton.onclick = async (event) => {
    const clickedButton = event.target;
    const userApplicationsID = parseInt(clickedButton.value);
    const universityName = listApplicationsTesting().find(({ applicationID }) => userApplicationsID === applicationID).universityName;
    console.log(universityName)
    handleSelect(confirmUpdate(applicationsId), applicationsId, universityName);
  };
  updateSection.appendChild(selectButton);
  cell.appendChild(updateSection);
  tableRow.appendChild(cell);

  return tableRow;
};

const confirmUpdate = (applicationsId) => {
  return window.confirm(
    `Your are about to update this Application: ID = ${applicationsId}?`
  );
};

const handleSelect = async (updateApplications, applicationsId, universityName) => {
  if (updateApplications) {
    document.getElementById("selected-university").textContent = universityName;
    await loadTable();
  }
};


function showUpdateApplicationPopUp(applicationsId) {
  document.getElementById("university-application-form-section").style.display = 'flex';
  document.getElementById("admin-university-application-table-section").style.display = 'none';
}

const cancelButton = document.getElementById("cancel-student-funding-button");

cancelButton.addEventListener("click", () => {
  document.getElementById("amount-to-allocate-student").value = '';
})

function hideUpdateApplicationPopUp(applicationsId) {
  document.getElementById("university-application-form-section").style.display = 'none';
  document.getElementById("admin-university-application-table-section").style.display = '';
}

const handleCancel = async () => {
  if (updateApplications) {
    hideUpdateApplicationPopUp();
    // loadTable();
  }
};
