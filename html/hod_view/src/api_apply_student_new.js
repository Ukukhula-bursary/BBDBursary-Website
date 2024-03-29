async function populateAndRetrieveApplyStudentNew() {

    // get ethnicities

    const url = `https://bursary-api-1709020026838.azurewebsites.net/Ethnicity/all`;
    displayLoading()
    fetch(url, {
        method: "GET",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
    })
        .then((res) => res.json())
        .then((data) => {
            hideLoading()
            fillInEthnicityRadioButtons(data)
        })

        .catch((err) => console.log(err));

    // get uni remaining fund

    const url1 = `https://bursary-api-1709020026838.azurewebsites.net/university_allocations/university_name=University of Cape Town/year=2023`;

    displayLoading()

    fetch(url1, {
        method: "GET",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
    })
        .then((res) => res.json())
        .then((data) => {
            hideLoading()
            let bursaryAmountInput = document.getElementById("bursary-amount");
            if (data.amount > 125000) {
                bursaryAmountInput.max = 125000
            } else {

                bursaryAmountInput.max = data.amount;
            }
        })

        .catch((err) => console.log(err));


        // posting student app
    const addNewStudentApplicationButton = document.getElementById(
        "application_new_student_button"
    );

    addNewStudentApplicationButton.addEventListener("click", (e) => {
        e.preventDefault();


        const url =
            "https://bursary-api-1709020026838.azurewebsites.net/studentapplication/apply/new";
        displayLoading()

        console.log("This is the bursary amount")
        let chosen_bursary_amount = document.getElementById("bursary-amount").value
        console.log(chosen_bursary_amount)
        console.log(document.querySelector("input[type='radio']").length)
        let chosen_ethnicity = document.querySelector("input[type='radio'][name='ethnicity_choice']:checked").value
        console.log(chosen_ethnicity)
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
                ethnicity: chosen_ethnicity,
                universityName: "University of Cape Town",
                departmentName: "Computer Science",
                motivation: document.getElementById("motivation").value,
                bursaryAmount: chosen_bursary_amount,
                universityStaffID: 1,
            }),
        })
            .then((res) => {
                hideLoading()
                console.log("response.status =", res.status);
                if (res.status === 200) {
                    console.log(res.json());
                    successfullySubmit();
                } else {
                    unsuccessfullySubmit();
                    return res;
                }
            })
            .catch((err) => {
                console.log("hi");
                console.log(err);
            });
    });

    return;
}

const loader = document.querySelector("#loading");
const loaderMessage = document.querySelector("#loading-message");

function displayLoading() {
    loader.classList.add("display");
    let loadingGreyedOut = document.getElementById("loading-grey-out");
    loadingGreyedOut.style.display = "block";

    // setTimeout(() => {
    //     loaderMessage.classList.add("display");
    //     // loaderMessage.innerText = "Thank you for your patience, we're working hard to display the content for you!";
    // }, 5000);
}

function hideLoading() {
    loader.classList.remove("display");
    let loadingGreyedOut = document.getElementById("loading-grey-out");
    loadingGreyedOut.style.display = "none";
    // loaderMessage.classList.remove("display");
}

function fillInEthnicityRadioButtons(options) {
    let selectEthnicity = document.getElementById("ethnicity");

    for (let i = 0; i < options.length; i++) {
        let opt = options[i].type;
        let el = document.createElement("input");
        // el.type = "radio";
        el.setAttribute("type", "radio");
        // el.id = opt;
        el.setAttribute("id", opt);
        el.name = "ethnicity_choice";
        el.setAttribute("name", "ethnicity_choice");
        // el.value = opt;
        el.setAttribute("value", opt);
        selectEthnicity.appendChild(el);

        let elLabel = document.createElement("label");
        elLabel.setAttribute("for", opt);
        elLabel.innerText = opt;
        elLabel.value = opt;
        selectEthnicity.appendChild(elLabel);
    }
}

function successfullySubmit() {
    let resultPopUp = document.getElementById("resultPopUp");

    resultPopUp.style.display = "block";

    let resultMessageBox = document.getElementById("resultMessage");

    resultMessageBox.innerText = "Congrats!\nYour application has successfully submitted\nWould you like to create a new  application or go to the dashboard?";

    let resultMessageButtons = document.getElementById("resultMessageButtons")

    let createNewApplicationButton = document.createElement("button");

    let createNewApplicationLink = document.createElement("a");
    createNewApplicationLink.innerText = "New Application";
    createNewApplicationLink.setAttribute("href", "/html/hod_view/apply_student_new.html");

    createNewApplicationButton.appendChild(createNewApplicationLink);
    resultMessageButtons.appendChild(createNewApplicationButton);

    let goToDashboardButton = document.createElement("button");

    let goToDashboardLink = document.createElement("a");
    goToDashboardLink.innerText = "Go to dashboard";
    goToDashboardLink.setAttribute("href", "/html/hod_view/hod_dashboard.html");

    goToDashboardButton.appendChild(goToDashboardLink);
    resultMessageButtons.appendChild(goToDashboardButton);

}

function unsuccessfullySubmit() {
    let resultPopUp = document.getElementById("resultPopUp");

    resultPopUp.style.display = "block";

    let resultMessageBox = document.getElementById("resultMessage");

    resultMessageBox.innerText = "Unfortunatley, our application wasn't able to be submitted\n\nWould you like to try again with a new application or go to the dashboard?";

    let resultMessageButtons = document.getElementById("resultMessageButtons")

    let createNewApplicationButton = document.createElement("button");

    let createNewApplicationLink = document.createElement("a");
    createNewApplicationLink.innerText = "New Application";
    createNewApplicationLink.setAttribute("href", "/html/hod_view/apply_student_new.html");

    createNewApplicationButton.appendChild(createNewApplicationLink);
    resultMessageButtons.appendChild(createNewApplicationButton);

    let goToDashboardButton = document.createElement("button");

    let goToDashboardLink = document.createElement("a");
    goToDashboardLink.innerText = "Go to dashboard";
    goToDashboardLink.setAttribute("href", "/html/hod_view/hod_dashboard.html");

    goToDashboardButton.appendChild(goToDashboardLink);
    resultMessageButtons.appendChild(goToDashboardButton);
}

// const addNewStudentApplicationButton = document.getElementById(
//     "application_new_student_button"
// );

// addNewStudentApplicationButton.addEventListener("click", (e) => {
//     e.preventDefault();
//     const url =
//         "https://bursary-api-1709020026838.azurewebsites.net/studentapplication/apply/new";

//     fetch(url, {
//         method: "POST",
//         headers: new Headers({ "Content-Type": "Application/json" }),
//         mode: "cors",
//         body: JSON.stringify({
//             firstName: document.getElementById("firstName").value,
//             lastName: document.getElementById("lastName").value,
//             phoneNumber: document.getElementById("phone-number").value,
//             email: document.getElementById("emailAddress").value,
//             idNumber: document.getElementById("id-number").value,
//             ethnicity: "Indian",
//             universityName: "University of Cape Town",
//             departmentName: "Computer Science",
//             motivation: document.getElementById("motivation").value,
//             bursaryAmount: document.getElementById("bursary-amount").value,
//             universityStaffID: 1,
//         }),
//     })
//         .then((res) => console.log(res.json()))
//         .then((data) => {
//             console.log(data);
//             return data;
//         })
//         .catch((err) => {
//             console.log("hi");
//             console.log(err);
//         });
// });


document.addEventListener('DOMContentLoaded', async function () {
    await populateAndRetrieveApplyStudentNew();



}, false);