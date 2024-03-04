const uploadIdButton = document.getElementById("upload-id");
const uploadTranscriptButton = document.getElementById("upload-transcript");
const uploadCvButton = document.getElementById("upload-cv");

uploadIdButton.addEventListener("click", (e) => {
  e.preventDefault();

  const file = document.getElementById("myFile").files[0];
  const formData = new FormData();
  formData.append("file", file);
  console.log(formData);
  const url = "http://localhost:8090/blob/uploadPdf";
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
