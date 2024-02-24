const getStudentAllocationButton = document.getElementById(
  "get-student-allocation"
);
const studentAllocationSection = document.getElementById(
  "student-allocation-section"
);
const getStudentAllocationByIdButton = document.getElementById(
  "get-student-allocation-by-id"
);

const postStudentAllocationButton = document.getElementById(
  "post-student-allocation"
);
const studentAllocationInput = document.getElementById(
  "student-allocation-input"
);

const updateStudentAllocationByIdButton = document.getElementById(
  "update-student-allocation-by-id"
);
const deleteStudentAllocationByIdButton = document.getElementById(
  "delete-student-allocation-by-id"
);
const getStudentAllocationByTotalSpentButton = document.getElementById(
  "get-student-allocation-by-total-spent"
);

getStudentAllocationButton.addEventListener("click", (e) => {
  e.preventDefault();
  studentAllocationSection.innerHTML = "";
  const url = "localhost:8080/student/allocation";
  fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => (studentAllocationSection.innerHTML += `${data.json()}`))
    .catch((err) => console.log(err));
});

//get id from clicked student allocation, so getStudentAllocationByIdButton selector needs to change
getStudentAllocationByIdButton.addEventListener("click", (e) => {
  e.preventDefault();
  studentAllocationSection.innerHTML = "";
  const url = "student/allocation/{id}";
  fetch(url, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then(() => location.reload());
});

postStudentAllocationButton.addEventListener("click", (e) => {
  e.preventDefault();
  const amount = studentAllocationInput.value;
  const url = "/student/allocation";
  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "Application/json" },
    body: JSON.stringify({
      studentAllocatedAmount: amount,
    })
      .then((res) => res.json())
      .then(() => studentAllocationInput.clear())
      .catch((err) => console.log(err)),
  });
});
