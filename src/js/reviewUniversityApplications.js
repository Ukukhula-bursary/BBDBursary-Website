// const listApplications = () => {
//   return new Promise((resolve, reject) => {
//     $.ajax({
//       url: "/applications",
//       method: "GET",
//       dataType: "json",
//       success: function (response_data) {
//         resolve(response_data);
//       },
//     });
//   });
// };

// const viewApplications = (id) => {
//   return new Promise((resolve, reject) => {
//     $.ajax({
//       url: `/applications/${id}`,
//       method: "GET",
//       dataType: "json",
//       success: function (response_data) {
//         resolve(response_data);
//       },
//     });
//   });
// };


const listApplicationsTesting = () => {
  return [{
    "applicationID": 1,
    "universityName": "University Of Pretoria",
    "fundsRequested" : "R100,000.00",
    "status": "Approved",
    "motivation": "I love it here!",
    "dateOfApplication": "2024-01-01",
    "reviewerName": "John",
    "reviewerComment": "Something John Said",
  }, {
    "applicationID": 2,
    "universityName": "University Of Limpopo",
    "fundsRequested" : "R100,000.00",
    "status": "Approved",
    "motivation": "I love it also here!",
    "dateOfApplication": "2023-01-01",
    "reviewerName": "John",
    "reviewerComment": "Something John Said",
  }, {
    "applicationID": 3,
    "universityName": "University Of Free State",
    "fundsRequested" : "R100,000.00",
    "status": "Rejected",
    "motivation": "We would like to be funded",
    "dateOfApplication": "2020-01-01",
    "reviewerName": "John",
    "reviewerComment": "Sorry Not Meeting Quotas",
  }
    , {
    "applicationID": 4,
    "universityName": "University Of The Cape",
    "fundsRequested" : "R100,000.00",
    "status": "Under Review",
    "motivation": "We would like to be funded",
    "dateOfApplication": "2019-01-01",
    "reviewerName": "John",
    "reviewerComment": "N/A",
  }]
};

// const updateApplications = (id) => {
//   return new Promise((resolve, reject) => {
//     $.ajax({
//       url: `/applications/${id}`,
//       method: "update",
//       dataType: "json",
//       success: function (response_data) {
//         resolve(response_data);
//       },
//     });
//   });
// };


async function loadTable() {
  populateStatusDropDownByID("filter-approval-status");

  const applications = await getAllUniversityApplications();
  const tableBody = document.getElementById("tbodyID");

  while (
    tableBody.lastElementChild &&
    tableBody.lastElementChild.id !== "theadings"
  ) {
  while (
    tableBody.lastElementChild &&
    tableBody.lastElementChild.id !== "theadings"
  ) {
    tableBody.removeChild(tableBody.lastElementChild);
  }

  for (const application of applications) {
    let tableRow = populateRow(
      application.applicationID,
      application.university,
      application.budget,
      application.status,
      application.motivation,
      application.date,
      application.reviewerName,
      application.reviewerComment
      application.reviewerComment
    );

    tableBody.appendChild(tableRow);
  }
}
}

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

  updateButton = document.createElement("button");
  const applicationsId = args[0];
  // admin-student-application-view-details-section
  updateButton.setAttribute("id", `update-action-button-${applicationsId}`);
  updateButton.setAttribute("type", "button");
  updateButton.setAttribute("class", "action-button");
  updateButton.setAttribute("value", applicationsId);
  updateButton.textContent = "update";
  updateButton.onclick = async (event) => {
    const clickedButton = event.target;
    const applicationsId = parseInt(clickedButton.value);
    handleUpdate(confirmUpdate(applicationsId), applicationsId);
  };
  updateSection.appendChild(updateButton);
  cell.appendChild(updateSection);
  tableRow.appendChild(cell);

  return tableRow;
}
}

// const loadExistingApplicationsTable = () => {
//   $(document).ready(function () {
//     loadTable();
//   });
// };
// loadExistingApplicationsTable();

const confirmUpdate = (applicationsId) => {
  window.confirm(
    `Your are about to update this Application: ID = ${applicationsId}?`
  );
  console.log(applicationsId);
  return applicationsId;
};

const handleUpdate = async (updateApplications, applicationsId) => {
  if (updateApplications) {
    showUpdateApplicationPopUp(applicationsId);
    // await loadTable();
  }
};

function showUpdateApplicationPopUp(applicationsId) {
  document.getElementById("university-application-form-section").style.display =
    "flex";
  document.getElementById(
    "admin-university-application-table-section"
  ).style.display = "none";

  const cancelButton = document.getElementById("admin-cancel-button");

  cancelButton.addEventListener("click", () => {
    hideUpdateApplicationPopUp();
  });

  const approvalStatusDropDown = document.getElementById(
    "approval-status-drop-down"
  );
  approvalStatusDropDown.disabled = true;
}

function hideUpdateApplicationPopUp(applicationsId) {
  document.getElementById("is-active-status-drop-down").selectedIndex = 0;
  document.getElementById("approval-status-drop-down").selectedIndex = 0;
  document.getElementById("university-application-form-section").style.display =
    "none";
  document.getElementById(
    "admin-university-application-table-section"
  ).style.display = "";
}

document
  .getElementById("approval-status-drop-down")
  .addEventListener("change", function () {
    const selectedOptionText = this.options[this.selectedIndex].text;
    const rejectionReasonContainer = document.getElementById(
      "rejection-reason-container"
    );
    await updateApplications(applicationsId);
    await loadTable();
  }
};

document
  .getElementById("approval-status")
  .addEventListener("change", function () {
    var selectedOptionText = this.options[this.selectedIndex].text;
    var rejectionReasonContainer = document.getElementById(
      "rejection-reason-container"
    );

  if (selectedOptionText === 'Rejected') {
    rejectionReasonContainer.style.display = 'flex';
  } else {
    rejectionReasonContainer.style.display = 'none';
  }
});

// const addapplicationsButton = document.getElementById("add-a-applications-button");
// addapplicationsButton.onclick = () => {
//   showapplicationsContainer();
// };


// document.getElementById("applications-cancel-button").onclick = () => {
// };
