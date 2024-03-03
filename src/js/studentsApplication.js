//commented out because id's arent correct

// const studentByIdInput = document.getElementById("student-by-id");
// const getStudentByIdButton = document.getElementById("get-student-by-id");
// const getAllStudentApplicationsButton = document.getElementById(
//   "get-student-applications"
// );
// const studentApplicationsSection = document.getElementById(
//   "student-applications"
// );

// const studentStatusOutcomeSection = document.getElementById(
//   "student-status-outcome"
// );

// const updateStudentApplicationStatusButton = document.getElementById(
//   "update-student-application-status"
// );
// const approvalStatusSelect = document.getElementById("approval-status");

// const updateStudentApplicationColumnValue = document.getElementById(
//   "update-student-application-column-value"
// );

// getStudentByIdButton.addEventListener("click", (e) => {
//   e.preventDefault();

const addNewStudentApplicationButton = document.getElementById(
  "add-new-student-application"
);

addNewStudentApplicationButton.addEventListener("click", (e) => {
  e.preventDefault();
  const url =
    "https://bursary-api-1709020026838.azurewebsites.net/studentapplication/apply/new";

  fetch(url, {
    method: "POST",
    headers: new Headers({ "Content-Type": "Application/json" }),
    mode: "cors",
    body: JSON.stringify({
      firstName: document.getElementById("firstName").value,
      lastName: document.getElementById("lastName").value,
      phoneNumber: document.getElementById("phone-number").value,
      email: document.getElementById("emailAddress").value,
      idNumber: document.getElementById("id-number").value,
      ethnicity: "Indian",
      universityName: "University of Cape Town",
      departmentName: "Computer Science",
      motivation: document.getElementById("motivation").value,
      bursaryAmount: document.getElementById("bursary-amount").value,
      universityStaffID: 1,
    }),
  })
    .then((res) => console.log(res.json()))
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch((err) => {
      console.log("hi");
      console.log(err);
    });
});

//   const id = studentByIdInput.value;
//   const url = `https://bursary-api-1709020026838.azurewebsites.net/studentapplication/student/${id}`;
//   fetch(url, {
//     method: "GET",
//     mode: "cors",
//     headers: {
//       "Content-Type": "Application/json",
//     },
//   })
//     .then((res) => res.json())
//     .then((data) => console.log(data))
//     .catch((err) => console.log(err));
// });

// getAllStudentApplicationsButton.addEventListener("click", (e) => {
//   e.preventDefault();

//   const url =
//     "https://bursary-api-1709020026838.azurewebsites.net/studentapplication/students";
//   fetch(url, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   })
//     .then((res) => res.json())
//     .then((data) => {
//       console.log(data);
//       studentApplicationsSection.innerHTML += `${data}`;
//     })
//     .catch((err) => console.log(err));
// });

// document
//   .getElementById("update-status-submit-button")
//   .addEventListener("click", () => {
//     // e.preventDefault();
//     const updatedStatus =
//       approvalStatusSelect.options[approvalStatusSelect.selectedIndex].value;
//     const url = `https://bursary-api-1709020026838.azurewebsites.net/studentapplication/status/${orange}`;
//     fetch(url, {
//       method: "PATCH",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ Status: updatedStatus }),
//     })
//       .then((res) => res.json())
//       .then(() => location.reload())
//       .catch((err) => console.log(err));
//   });

// ******not sure
// updateStudentApplicationColumnValue.addEventListener("click", (e) => {
// e.preventDefault();
// const url = "/student/updateColumn/{studentID}";
// fetch(url, {
// method: "PATCH",
// headers: { "Content-Type": "application/json" },
//body: JSON.stringify({});
// })
// .then((res) => res.json())
// .then(() => location.reload());
// });
//
