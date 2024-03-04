const uploadIdButton = document.getElementById("upload-id");
const uploadTranscriptButton = document.getElementById("upload-transcript");
const uploadCvButton = document.getElementById("upload-cv");

uploadIdButton.addEventListener("click", (e) => {
  e.preventDefault();

  const url =
    "https://bursary-api-1709020026838.azurewebsites.net/blob/uploadJpg";
  fetch(url, {
    method: "POST",
    mode: "cors",
    headers: { "Content-Type": "Application/json" },
    //body: JSON.stringify({file: })
  });
});
