document.addEventListener("DOMContentLoaded", function () {

    function createHodNav() {
        const navHtml = `
        <nav id="nav">
            <section id="hamburger-section">
                <h2 id="hamburger-section-header">
                    <img alt="bbd_logo" src="../../../src/assets/icons/bbd-logo.svg" id="nav-logo">
                    <a href="/">Ukukhula Bursary</a>
                </h2>
                <form id="hamburger-form">
                    <button type="button" id="hamburger-bar">
                        <img alt="hamburger-bar" src="../../src/assets/icons/hamburger-bar.png">
                    </button>
                    <button type="button" id="hamburger-bar-cross">
                        <img alt="hamburger-bar-cross" src="../../src/assets/icons/hamburger-bar-cross.png">
                    </button>
                </form>
            </section>
            <ul id="nav-menu">
                <li><a href="/index.html">Home</a></li>
                <li><a href="/html/hod_view/apply_view_applications.html">Applications</a></li>
                <li><a href="/html/hod_view/students.html">Students</a></li>
                <li><a href="/html/hod_view/add_hod.html">Add HOD</a></li>
                <li><a href="/html/hod_view/bursary_details.html">Bursary Details</a></li>
                <li>
                    <button id="logInButton" type="button" title="Log In">Log In</button>
                    <button id="logOutButton" type="button" title="Log Out">Log Out</button>
                </li>
            </ul>
        </nav>
    `;

        document.body.insertAdjacentHTML('afterbegin', navHtml);
    }


    createHodNav();

    function fillInUniversityList() {
        let select = document.getElementById("select-university");
        // fill in with api
        let options = [
            "University of Cape Town"
            , "University of the Witwatersrand"
            , "Stellenbosch University"
            , "University of Pretoria"
            , "University of Johannesburg"
            , "University of KwaZulu - Natal"
            , "University of the Western Cape"
            , "Rhodes University"
            , "Nelson Mandela University"
            , "University of Limpopo"
            , "University of Venda"
            , "University of Fort Hare"
        ];
        for (let i = 0; i < options.length; i++) {
            let opt = options[i];
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
    fillInUniversityList();

    function showDiv() {// fill in with api
        let options = [
            "University of Cape Town"
            , "University of the Witwatersrand"
            , "Stellenbosch University"
            , "University of Pretoria"
            , "University of Johannesburg"
            , "University of KwaZulu - Natal"
            , "University of the Western Cape"
            , "Rhodes University"
            , "Nelson Mandela University"
            , "University of Limpopo"
            , "University of Venda"
            , "University of Fort Hare"
        ];

        document.getElementById("generic-form").style.display = document.getElementById("select-university").value < options.length ? 'block' : 'none';
    }

    const selectElement = document.querySelector('#select-university');
    selectElement.addEventListener('change', (event) => {
        let options = [
            "University of Cape Town"
            , "University of the Witwatersrand"
            , "Stellenbosch University"
            , "University of Pretoria"
            , "University of Johannesburg"
            , "University of KwaZulu - Natal"
            , "University of the Western Cape"
            , "Rhodes University"
            , "Nelson Mandela University"
            , "University of Limpopo"
            , "University of Venda"
            , "University of Fort Hare"
        ];

        console.log(selectElement.value);

        if (options.includes(selectElement.value) && selectElement.value) {
            document.getElementById("generic-form").style.display = 'flex';
        }
        else {
            document.getElementById("generic-form").style.display = 'none';
        }

        // document.getElementById("generic-form").style.display = !options.includes(selectElement.value) ? 'block' : 'none';

    });

    function fillInHodDepartmentList() {
        let select = document.getElementById("hod-department");
        // fill in with api
        let options = [
            "University Administration"
            , "Computer Science"
            , "Information Technology"
            , "Software Engineering"
            , "Cybersecurity"
            , "Data Science"
        ];
        for (let i = 0; i < options.length; i++) {
            let opt = options[i];
            let el = document.createElement("option");
            el.textContent = opt;
            el.value = opt;
            select.appendChild(el);
        }
    }
    fillInHodDepartmentList();



    const hamburgerBar = document.getElementById("hamburger-bar");
    const hamburgerBarCross = document.getElementById("hamburger-bar-cross");
    const navMenu = document.getElementById("nav-menu");

    hamburgerBar.classList.add("open");
    hamburgerBarCross.classList.add("close");
    navMenu.classList.add("close");

    hamburgerBar.onclick = () => {
        hamburgerBar.classList.remove("open");
        hamburgerBar.classList.add("close");
        hamburgerBarCross.classList.add("open");
        navMenu.classList.add("open");
    };

    const navMenuHide = () => {
        hamburgerBarCross.classList.add("close");
        hamburgerBarCross.classList.remove("open");
        hamburgerBar.classList.remove("close");
        hamburgerBar.classList.add("open");
        navMenu.classList.remove("open");
    };

    hamburgerBarCross.onclick = () => {
        navMenuHide();
    };

    let navLinks = navMenu.querySelectorAll("a");

    navLinks.forEach(function (link) {
        link.addEventListener("click", function () {
            navMenuHide();
        });
    });

    const homeMenu = document.getElementById("nav");

    let homeMenuHeight = homeMenu.offsetHeight;

    const homeBody = document.getElementById("home-body");
    homeBody.style.position = "relative";

    homeBody.style.top = homeMenuHeight + "px";

    // Save data to sessionStorage
    sessionStorage.setItem("isSessionActive", "true");
    sessionStorage.setItem("userRole", "none");

    // Get saved data from sessionStorage
    let isSessionActive = sessionStorage.getItem("isSessionActive");
    let logInButton = document.querySelector("#logInButton");
    let logOutButton = document.querySelector("#logOutButton");

    if (isSessionActive === "true") {
        console.log("session is active");

        logInButton.classList.add("close");
        logInButton.classList.remove("open");

        logOutButton.classList.remove("close");
        logOutButton.classList.add("open");
    } else if (isSessionActive === "false") {
        console.log("session is not active");

        logOutButton.classList.remove("open");
        logOutButton.classList.add("close");

        logInButton.classList.add("open");
        logInButton.classList.remove("close");
    }
});

// This function should be called when the user is redirected back to your application with the token
function handleTokenResponse() {
    // Extract the token from the URL
    let hash = window.location.hash.substring(1);
    let params = new URLSearchParams(hash);
    let accessToken = params.get("access_token");

    // Store the token in local storage (for demonstration purposes)
    localStorage.setItem("google_access_token", accessToken);

    // Optionally, you can now use the stored token to make authenticated API requests
}


