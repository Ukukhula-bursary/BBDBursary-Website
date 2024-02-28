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
  return [
    {
      "applicationID": 1,
      "universityName": "University Of Pretoria",
      "department": "Computer Science",
      "studentName": "John Doe",
      "ethnicity": "Black",
      "bursaryAmount": "R10,000.00",
      "status": "Approved",
      "motivation": "I love it here!",
      "dateOfApplication": "2024-01-01",
      "bbdReviewerName": "John",
      "bbdReviewerComment": "Something John Said",
      "universityStaffReviewerName": "Jane",
      "universityStaffReviewerComment": "Something Jane Said",
    },
    {
      "applicationID": 2,
      "universityName": "University Of Cape Town",
      "department": "Marketing",
      "studentName": "Jane Smith",
      "ethnicity": "White",
      "bursaryAmount": "R8,000.00",
      "status": "Pending",
      "motivation": "I want to make a difference.",
      "dateOfApplication": "2024-01-02",
      "bbdReviewerName": "Alice",
      "bbdReviewerComment": "Something Alice Said",
      "universityStaffReviewerName": "Bob",
      "universityStaffReviewerComment": "Something Bob Said",
    },
    // Continue adding more records following the same structure...
    {
      "applicationID": 10,
      "universityName": "University Of Johannesburg",
      "department": "Engineering",
      "studentName": "Mary Johnson",
      "ethnicity": "Asian",
      "bursaryAmount": "R12,000.00",
      "status": "Rejected",
      "motivation": "I'm dedicated to my studies.",
      "dateOfApplication": "2024-01-10",
      "bbdReviewerName": "Charlie",
      "bbdReviewerComment": "Something Charlie Said",
      "universityStaffReviewerName": "Dana",
      "universityStaffReviewerComment": "Something Dana Said",
    }
  ];
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
  const applications = listApplicationsTesting();
  const tableBody = document.getElementById("tbodyID");

  while (tableBody.lastElementChild && tableBody.lastElementChild.id !== "theadings") {
    tableBody.removeChild(tableBody.lastElementChild);
  }

  for (const application of applications) {
    let tableRow = populateRow(
      application.applicationID,
      application.universityName,
      application.department,
      application.studentName,
      application.ethnicity,
      application.bursaryAmount,
      application.status,
      application.dateOfApplication,
      application.motivation,
      application.bbdReviewerName,
      application.bbdReviewerComment,
      application.universityStaffReviewerName,
      application.universityStaffReviewerComment,
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
  // viewDetailsSection = document.createElement("section");
  updateSection.setAttribute("class", "update-button-section");
  // viewDetailsSection.setAttribute("class", "view-details-button-section");

  updateButton = document.createElement("button");
  viewDetailsButton = document.createElement("button");

  const applicationsId = args[0];
  updateButton.setAttribute("type", "button");
  updateButton.setAttribute("class", "update-button");

  viewDetailsButton.setAttribute("type", "button");
  viewDetailsButton.setAttribute("class", "update-button");

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


  updateSection.appendChild(updateButton);
  updateSection.appendChild(viewDetailsButton);

  cell.appendChild(updateSection);
  tableRow.appendChild(cell);

  return tableRow;
};

function handleViewDetails(applicationsId) {

}

// const loadExistingApplicationsTable = () => {
//   $(document).ready(function () {
//     loadTable();
//   });
// };
// loadExistingApplicationsTable();



const confirmUpdate = (applicationsId) => {
  return window.confirm(
    `Your are about to update this Application: ID = ${applicationsId}?`
  );
};

const handleUpdate = async (updateApplications, applicationsId) => {
  if (updateApplications) {
    await updateApplications(applicationsId);
    await loadTable();
  }
};

document.getElementById('approval-status').addEventListener('change', function () {
  var selectedOptionText = this.options[this.selectedIndex].text;
  var rejectionReasonContainer = document.getElementById('rejection-reason-container');

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
