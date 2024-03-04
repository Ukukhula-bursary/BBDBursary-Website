async function getStudentApplications() {
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

        document.getElementById("generic-form").style.display = 'flex';


        console.log(selectElement.value);

        const universityName = selectElement.value;

        const section = document.getElementById("select-student");

        // generate departments

        const url = `https://bursary-api-1709020026838.azurewebsites.net/department/all`;

        displayLoading()

        fetch(url, {
            method: "GET",
            mode: "cors",
            headers: { "Content-Type": "Application/json" },
        })
            .then((res) => res.json())
            .then((data) => {
                hideLoading()
                fillInHodDepartmentList(data)
            })

            .catch((err) => console.log(err));

    });

    const departmentSelectElement = document.getElementById('hod-department');


    // posting request access app


    const requestAccessButton = document.getElementById(
        "request_access_button"
    );

    requestAccessButton.addEventListener("click", (e) => {
        e.preventDefault();


        const url =
            "https://bursary-api-1709020026838.azurewebsites.net/universitystaff/add";
        displayLoading()

        fetch(url, {
            method: "POST",
            headers: new Headers({ "Content-Type": "Application/json" }),
            mode: "cors",
            body: JSON.stringify({
                firstName: document.getElementById("firstName").value,
                lastName: document.getElementById("lastName").value,
                phoneNumber: document.getElementById("phone-number").value,
                email: document.getElementById("emailAddress").value,
                universityName: selectElement.value,
                departmentName: departmentSelectElement.value
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

}

function hideLoading() {
    loader.classList.remove("display");
    let loadingGreyedOut = document.getElementById("loading-grey-out");
    loadingGreyedOut.style.display = "none";
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

function fillInHodDepartmentList(department_choices) {
    let select = document.getElementById("hod-department");


    for (let i = 0; i < department_choices.length; i++) {
        console.log(i);
        let opt = department_choices[i].departmentName;
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


    let goToDashboardButton = document.createElement("button");

    let goToDashboardLink = document.createElement("a");
    goToDashboardLink.innerText = "Go to dashboard";
    goToDashboardLink.setAttribute("href", "/html/hod_view/hod_dashboard.html");

    goToDashboardButton.appendChild(goToDashboardLink);
    resultMessageButtons.appendChild(goToDashboardButton);
}

document.addEventListener('DOMContentLoaded', async function () {
    await getStudentApplications();



}, false);


