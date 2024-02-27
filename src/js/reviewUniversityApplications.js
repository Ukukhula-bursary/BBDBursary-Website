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
    "status": "Approved",
    "motivation": "I love it here!",
    "dateOfApplication": "2024-01-01",
    "reviewerName": "John",
    "reviewerComment": "Something John Said",
  }, {
    "applicationID": 2,
    "universityName": "University Of Limpopo",
    "status": "Approved",
    "motivation": "I love it also here!",
    "dateOfApplication": "2023-01-01",
    "reviewerName": "John",
    "reviewerComment": "Something John Said",
  }]
};

// const updateapplications = (id) => {
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
  const applications = listApplicationsTesting();
  const tableBody = document.getElementById("tbodyID");

  while (tableBody.lastElementChild && tableBody.lastElementChild.id !== "theadings") {
    tableBody.removeChild(tableBody.lastElementChild);
  }

  for (const application of applications) {
    let tableRow = populateRow(
      application.applicationID,
      application.universityName,
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
  updateSection.setAttribute("class", "update-button-section");

  updateButton = document.createElement("button");
  const applicationsId = args[0];
  updateButton.setAttribute("type", "button");
  updateButton.setAttribute("class", "update-button");
  updateButton.setAttribute("value", applicationsId);
  updateButton.textContent = "update";
  updateButton.onclick = async (event) => {
    const clickedButton = event.target;
    const applicationsId = parseInt(clickedButton.value);
    handleupdate(confirmupdate(applicationsId), applicationsId);
  };
  updateSection.appendChild(updateButton);
  cell.appendChild(updateSection);
  tableRow.appendChild(cell);

  return tableRow;
};

// const loadExistingApplicationsTable = () => {
//   $(document).ready(function () {
//     loadTable();
//   });
// };
// loadExistingApplicationsTable();

const confirmupdate = (applicationsId) => {
  return window.confirm(
    `Your are about to update this Application: ID = ${applicationsId}?`
  );
};

const handleupdate = async (updateapplications, applicationsId) => {
  if (updateapplications) {
    await updateapplications(applicationsId);
    await loadTable();
  }
};

// const addapplicationsButton = document.getElementById("add-a-applications-button");
// addapplicationsButton.onclick = () => {
//   showapplicationsContainer();
// };


// document.getElementById("applications-cancel-button").onclick = () => {
// };
