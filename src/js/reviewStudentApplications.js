async function loadTable() {
  populateStatusDropDownByID("filter-section-status");

  const applications = await getAllStudentApplications();
  const tableBody = document.getElementById("tbodyID");

  while (
    tableBody.lastElementChild &&
    tableBody.lastElementChild.id !== "theadings"
  ) {
    tableBody.removeChild(tableBody.lastElementChild);
  }

  for (const application of applications) {
    let tableRow = populateRow(
      application.applicationID,
      application.universityID,
      application.university,
      application.studentName,
      application.ethinity,
      application.status,
      application.motivation,
      application.bursaryAmount,
      application.date,
      application.reviewer,
      application.reviewerComment
    );

    tableBody.appendChild(tableRow);
  }
}

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
  actionsSection = document.createElement("section");
  actionsSection.setAttribute("class", "action-button-section");

  updateButton = document.createElement("button");
  viewDetailsButton = document.createElement("button");

  const applicationsId = args[0];
  updateButton.setAttribute("id", "update-action-button");
  updateButton.setAttribute("type", "button");
  updateButton.setAttribute("class", "action-button");

  viewDetailsButton.setAttribute("id", "view-details-action-button");
  viewDetailsButton.setAttribute("type", "button");
  viewDetailsButton.setAttribute("class", "action-button");

  updateButton.setAttribute("value", applicationsId);
  viewDetailsButton.setAttribute("value", applicationsId);

  updateButton.textContent = "update";
  viewDetailsButton.textContent = "View Details";

  updateButton.onclick = async (event) => {
    const clickedButton = event.target;
    const applicationsId = parseInt(clickedButton.value);
    handleUpdate(confirmUpdate(applicationsId), applicationsId);
  };

  viewDetailsButton.onclick = async (event) => {
    const clickedButton = event.target;
    const applicationsId = parseInt(clickedButton.value);
    handleViewDetails(applicationsId);
  };

  actionsSection.appendChild(updateButton);
  actionsSection.appendChild(viewDetailsButton);

  cell.appendChild(actionsSection);
  tableRow.appendChild(cell);

  return tableRow;
}

function handleViewDetails(applicationsId) {
  //show form a with user documents
  showApplicationDetailsPopUp(applicationsId);
}

const confirmUpdate = (applicationsId) => {
  return window.confirm(
    `Your are about to update this Application: ID = ${applicationsId}?`
  );
};

const handleUpdate = async (updateApplications, applicationsId) => {
  if (updateApplications) {
    showUpdateApplicationPopUp(applicationsId);
  }
};

const handleCancel = async () => {
  if (updateApplications) {
    hideUpdateApplicationPopUp();
    // loadTable();
  }
};

const handleViewDetailsCancel = async () => {
  if (updateApplications) {
    hideApplicationViewDetailsPopUp();
    // loadTable();
  }
};

function showApplicationDetailsPopUp(applicationsId) {
  document.getElementById(
    "admin-student-application-table-section"
  ).style.display = "none";
  document.getElementById(
    "admin-student-application-view-details-section"
  ).style.display = "flex";
  const backButton = document.getElementById("admin-back-button");

  backButton.addEventListener("click", () => {
    hideApplicationViewDetailsPopUp();
  });
}

function hideApplicationViewDetailsPopUp(applicationsId) {
  document.getElementById(
    "admin-student-application-view-details-section"
  ).style.display = "none";
  document.getElementById(
    "admin-student-application-table-section"
  ).style.display = "";
}

function showUpdateApplicationPopUp(applicationsId) {
  populateStatusDropDownByID("approval-status-drop-down");
  document.getElementById(
    "admin-student-application-table-section"
  ).style.display = "none";
  document.getElementById(
    "admin-student-application-form-section"
  ).style.display = "flex";
  const cancelButton = document.getElementById("admin-cancel-button");

  cancelButton.addEventListener("click", () => {
    hideUpdateApplicationPopUp();
  });
}

function hideUpdateApplicationPopUp(applicationsId) {

  document.getElementById("is-active-status-drop-down").selectedIndex = 0;
  document.getElementById("approval-status-drop-down").selectedIndex = 0;
  
  document.getElementById(
    "admin-student-application-form-section"
  ).style.display = "none";
  document.getElementById(
    "admin-student-application-table-section"
  ).style.display = "";
  loadTable();
}

document
  .getElementById("approval-status-drop-down")
  .addEventListener("change", function () {
    const selectedOptionText = this.options[this.selectedIndex].text;
    const rejectionReasonContainer = document.getElementById(
      "rejection-reason-container"
    );

    if (selectedOptionText === "Rejected") {
      rejectionReasonContainer.style.display = "flex";
    } else {
      rejectionReasonContainer.style.display = "none";
    }
  });

//Fetch student applications
async function getAllStudentApplications() {
  const url =
    "https://bursary-api-1709020026838.azurewebsites.net/studentapplication/students";

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
    .catch((err) => console.log(err))
    .finally(
      () => (document.getElementById("spinner-section").style.display = "none")
    );
}

async function getAllStatuses() {
  const url =
    "https://bursary-api-1709020026838.azurewebsites.net/statuses/all";
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

async function populateStatusDropDownByID(selectElementID) {
  const selectElement = document.getElementById(selectElementID);
  selectElement.disabled = true;

  const statuses = await getAllStatuses();
  if (statuses.length) {
    selectElement.disabled = false;

    for (const status of statuses) {
      const newOption = document.createElement("option");
      newOption.text = status.status;
      newOption.value = status.statusID;
      selectElement.add(newOption);
    }
  }
}
loadTable();
