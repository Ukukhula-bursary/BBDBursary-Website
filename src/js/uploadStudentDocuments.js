const uploadIdButton = document.getElementById("upload-id");
const uploadTranscriptButton = document.getElementById("upload-transcript");
const uploadCvButton = document.getElementById("upload-cv");

uploadIdButton.addEventListener("click", (e) => {
  e.preventDefault();

  const file = document.getElementById("id-file").files[0];
  const formData = new FormData();
  formData.append("file", file);
  console.log(formData);
  const url =
    "https://bursary-api-1709020026838.azurewebsites.net/blob/uploadPdf"; //need to update the api
  fetch(url, {
    method: "POST",
    mode: "cors",
    // accept: "application/json",
    // headers: { "Content-Type": "multipart/form-data" },
    body: formData,
  })
    .then((res) => res)
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch((err) => console.log(err));
});
