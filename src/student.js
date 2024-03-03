const getStudentsButton = document.getElementById("get-students-button");
const section = document.getElementById("students");

getStudentsButton.addEventListener("click", () => {
  const universityName = document.getElementById("name").value;

  const url = `https://bursary-api-1709020026838.azurewebsites.net/students/university_name=${universityName}`;

  fetch(url, {
    method: "GET",
    mode: "cors",
    headers: { "Content-Type": "Application/json" },
  })
    .then((res) => res.json())
    .then((data) => console.log(data.map((v) => v.studentId)))
    .catch((err) => console.log(err));
});
