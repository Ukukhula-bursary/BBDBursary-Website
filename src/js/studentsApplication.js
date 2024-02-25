const getStudentByIdButton = document.getElementById("get-student-by-id");
const getAllStudentApplicationsButton = document.getElementById(
  "get-student-applications"
);
const updateStudentApplicationStatusButton = document.getElementById(
  "update-student-application-status"
);
const updateStudentApplicationColumnValue = document.getElementById(
  "update-student-application-column-value"
);

getStudentByIdButton.addEventListener("click", (e) => {
  e.preventDefault();

  const url = "/student/{studentId}";
  fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => data.studentId)
    .catch((err) => console.log(err));
});

getAllStudentApplicationsButton.addEventListener("click", (e) => {
  e.preventDefault();
});
