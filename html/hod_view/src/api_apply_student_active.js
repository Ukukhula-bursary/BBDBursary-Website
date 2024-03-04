async function populateAndRetrieveApplyStudentActive() {
    // get all universities

    const url = `https://bursary-api-1709020026838.azurewebsites.net/university/all`;
    displayLoading()
    fetch(url, {
        method: "GET",
        mode: "cors",
        headers: { "Content-Type": "Application/json" },
    })
        .then((res) => res.json())
        .then((data) => {
            hideLoading()
            fillInUniversityList(data)
        })

        .catch((err) => console.log(err));


    const selectElement = document.getElementById('select-university');
    selectElement.addEventListener('change', (event) => {


        console.log(selectElement.value);

        const universityName = selectElement.value;

        const section = document.getElementById("select-student");

        // get students from university

        const url = `https://bursary-api-1709020026838.azurewebsites.net/students/university_name=${universityName}`;

        displayLoading()

        fetch(url, {
            method: "GET",
            mode: "cors",
            headers: { "Content-Type": "Application/json" },
        })
            .then((res) => res.json())
            .then((data) => {
                hideLoading()
                fillInStudentsList(data)
            })

            .catch((err) => console.log(err));

    });

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

    const selectStudentElement = document.getElementById('select-student');


    const addActiveStudentApplicationButton = document.getElementById(
        "application_active_student_button"
    );

    addActiveStudentApplicationButton.addEventListener("click", (e) => {
        e.preventDefault();


        const url =
            "https://bursary-api-1709020026838.azurewebsites.net/studentapplication/apply/active";
        displayLoading()

        console.log("This is the bursary amount")
        let chosen_bursary_amount = document.getElementById("bursary-amount").value
        console.log(chosen_bursary_amount)
        fetch(url, {
            method: "POST",
            headers: new Headers({ "Content-Type": "Application/json" }),
            mode: "cors",
            body: JSON.stringify({
                studentID: selectStudentElement.value,
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
};



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

function fillInUniversityList(university_list) {
    let select = document.getElementById("select-university");

    for (let i = 0; i < university_list.length; i++) {
        let opt = university_list[i].universityName;
        let el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        select.appendChild(el);
    }
    let el = document.createElement("option");
    el.textContent = "Other";
    el.value = "Other";
    select.appendChild(el);
}

function fillInStudentsList(student_list) {
    let select = document.getElementById("select-student");

    let options = select.getElementsByTagName('option');

    for (let i = options.length; i--;) {
        select.removeChild(options[i]);
    }

    let defaultt = document.createElement("option");
    defaultt.textContent = "Select Student";
    defaultt.value = "Select Student";
    defaultt.disabled = true;
    select.appendChild(defaultt);

    for (let i = 0; i < student_list.length; i++) {
        let opt = student_list[i].studentId;
        let el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        select.appendChild(el);
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
    createNewApplicationLink.setAttribute("href", "/html/hod_view/apply_student_active.html");

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
    createNewApplicationLink.setAttribute("href", "/html/hod_view/apply_student_active.html");

    createNewApplicationButton.appendChild(createNewApplicationLink);
    resultMessageButtons.appendChild(createNewApplicationButton);

    let goToDashboardButton = document.createElement("button");

    let goToDashboardLink = document.createElement("a");
    goToDashboardLink.innerText = "Go to dashboard";
    goToDashboardLink.setAttribute("href", "/html/hod_view/hod_dashboard.html");

    goToDashboardButton.appendChild(goToDashboardLink);
    resultMessageButtons.appendChild(goToDashboardButton);
}



document.addEventListener('DOMContentLoaded', async function () {
    await populateAndRetrieveApplyStudentActive();



}, false);