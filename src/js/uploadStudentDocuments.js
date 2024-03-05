const uploadIdButton = document.getElementById("upload-id");
const uploadTranscriptButton = document.getElementById("upload-transcript");
const uploadCvButton = document.getElementById("upload-cv");

uploadIdButton.addEventListener("click", (e) => {
  e.preventDefault();

  const file = document.getElementById("id-file").files[0];
  const formData = new FormData();
  formData.append("file", file);

  const url =
    "https://bursary-api-1709020026838.azurewebsites.net/blob/uploadPdf"; //need to update the api
  fetch(url, {
    method: "POST",
    mode: "cors",
    headers: { Authorization: `Bearer ${localStorage.getItem("jwtToken")}` },
    body: formData,
  })
    .then((res) => res)
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch((err) => console.log(err));
});

uploadTranscriptButton.addEventListener("click", (e) => {
  e.preventDefault();

  const file = document.getElementById("transcript-file").files[0];
  const formData = new FormData();
  formData.append("file", file);

  const url =
    "https://bursary-api-1709020026838.azurewebsites.net/blob/uploadPdf"; //need to update the api
  fetch(url, {
    method: "POST",
    mode: "cors",
    headers: { Authorization: `Bearer ${localStorage.getItem("jwtToken")}` },
    body: formData,
  })
    .then((res) => res)
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch((err) => console.log(err));
});

uploadCvButton.addEventListener("click", (e) => {
  e.preventDefault();

  const file = document.getElementById("cv-file").files[0];
  const formData = new FormData();
  formData.append("file", file);

  const url =
    "https://bursary-api-1709020026838.azurewebsites.net/blob/uploadPdf"; //need to update the api
  fetch(url, {
    method: "POST",
    mode: "cors",
    headers: { Authorization: `Bearer ${localStorage.getItem("jwtToken")}` },
    body: formData,
  })
    .then((res) => res)
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch((err) => console.log(err));
});
