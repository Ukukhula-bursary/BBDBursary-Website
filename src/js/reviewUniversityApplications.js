async function loadTable() {
  populateStatusDropDownByID("filter-approval-status");

  const applications = await getAllUniversityApplications();
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
      application.university,
      application.budget,
      application.status,
      application.motivation,
      application.date,
      application.reviewerName,
      application.reviewerComment
    );

    tableBody.appendChild(tableRow);
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

const confirmUpdate = (applicationsId) => {
  return window.confirm(
    `Your are about to update this Application: ID = ${applicationsId}?`
  );
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

    if (selectedOptionText === "Rejected") {
      rejectionReasonContainer.style.display = "flex";
    } else {
      rejectionReasonContainer.style.display = "none";
    }
  });

const handleCancel = async () => {
  if (updateApplications) {
    hideUpdateApplicationPopUp();
    // loadTable();
  }
};

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
      return data;
    })
    .catch((err) => console.log(err));
}

const universityStatusSelect = document.getElementById(
  "university-name-drop-down"
);

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

document
  .getElementById("is-active-status-drop-down")
  .addEventListener("change", (event) => {
    const isActiveDropDown = event.target;
    if (
      isActiveDropDown.options[isActiveDropDown.selectedIndex].textContent ===
      "No"
    ) {
      const rejectionReasonContainer = document.getElementById(
        "rejection-reason-container"
      );

      rejectionReasonContainer.style.display = "";

      document.getElementById("approval-status-drop-down").disabled = true;
    } else {
      document.getElementById("approval-status-drop-down").disabled = false;
      populateStatusDropDownByID("approval-status-drop-down");
    }
  });

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

async function populateStatusDropDownByID(selectElementId) {
  const selectElement = document.getElementById(selectElementId);
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

async function getAllUniversityApplications() {
  const url =
    "https://bursary-api-1709020026838.azurewebsites.net/universities/application/all";
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
