const BBD_ADMIN_ROLES = [
  "ROLE_BBDAdmin_Finance",
  "ROLE_BBDAdmin_Reviewers",
  "ROLE_BBDSuperAdmin",
];

if (
  !BBD_ADMIN_ROLES.includes(localStorage.getItem("userRole")) ||
  localStorage.getItem("isSessionActive") === "false"
) {
  window.location.href = "/";
}

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

  populateStatusDropDownByID("filter-section-status");
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
  console.log(args);
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
    populateStatusDropDownByID("approval-status-drop-down");
    document.getElementById(
      "admin-student-application-table-section"
    ).style.display = "none";
    document.getElementById(
      "admin-student-application-form-section"
    ).style.display = "flex";

    document
      .getElementById("submit-application-button")
      .addEventListener("click", (event) => {
        event.preventDefault();
        submitTheStudentApplication(applicationsId);
      });

    const cancelButton = document.getElementById("admin-cancel-button");

    cancelButton.addEventListener("click", () => {
      hideUpdateApplicationPopUp();
    });
  }
};

function submitTheStudentApplication(applicationsId) {
  const chosenStatusValue = document.getElementById(
    "approval-status-drop-down"
  ).value;

  if (chosenStatusValue === "") {
    document.getElementById("successMessage").textContent =
      "Application must have a status.";
  } else {
    const reviewerComment =
      document.getElementById("admin-comment").textContent;
    updateStatus(applicationsId, chosenStatusValue, reviewerComment);
  }
}

const handleCancel = async () => {
  if (updateApplications) {
    hideUpdateApplicationPopUp();
    loadTable();
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

function hideUpdateApplicationPopUp() {
  document.getElementById("approval-status-drop-down").selectedIndex = 0;

  document.getElementById(
    "admin-student-application-form-section"
  ).style.display = "none";
  document.getElementById(
    "admin-student-application-table-section"
  ).style.display = "";
}

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

async function updateStatus(applicationID, statusID, reviewerComment) {
  const url = `https://bursary-api-1709020026838.azurewebsites.net/studentapplication/student/update/status`;
  const message = (document.getElementById("successMessage").textContent =
    "Please be patient while we update...");

  return fetch(url, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      applicationID: applicationID,
      statusID: statusID,
      reviewerComment: reviewerComment,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data === 1) {
        document.getElementById("successMessage").textContent =
          "Update Successful!";
      } else {
        document.getElementById("successMessage").textContent =
          "Update Not Successful!";
      }
      return data;
    })
    .catch((err) => console.log(err));
}
