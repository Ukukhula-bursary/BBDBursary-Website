const uploadIdButton = document.getElementById("upload-id");
const uploadTranscriptButton = document.getElementById("upload-transcript");
const uploadCvButton = document.getElementById("upload-cv");

uploadIdButton.addEventListener("click", (e) => {
  e.preventDefault();

  const file = document.getElementById("myFile").value;
  const url =
    "https://bursary-api-1709020026838.azurewebsites.net/blob/uploadJpg";
  fetch(url, {
    method: "POST",
    mode: "cors",
    headers: { "Content-Type": "Application/json" },
    body: JSON.stringify({ file: file }),
  })
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
});
