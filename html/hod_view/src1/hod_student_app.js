// fill in these with API

// let university_choices = [
//     "University of Cape Town"
//     , "University of the Witwatersrand"
//     , "Stellenbosch University"
//     , "University of Pretoria"
//     , "University of Johannesburg"
//     , "University of KwaZulu - Natal"
//     , "University of the Western Cape"
//     , "Rhodes University"
//     , "Nelson Mandela University"
//     , "University of Limpopo"
//     , "University of Venda"
//     , "University of Fort Hare"
// ];

// let department_choices = [
//     "University Administration"
//     , "Computer Science"
//     , "Information Technology"
//     , "Software Engineering"
//     , "Cybersecurity"
//     , "Data Science"
// ];

// let ethnicity_choices = [
//     "Black",
//     "Coloured",
//     "Indian",
//     "Other"
// ];



document.addEventListener("DOMContentLoaded", function () {

    function createHodNav() {


        const url = `https://bursary-api-1709020026838.azurewebsites.net/university_allocations/university_name=University of Cape Town/year=2023`;
        fetch(url, {
            method: "GET",
            mode: "cors",
            headers: { "Content-Type": "application/json" },
        })
            .then((res) => res.json())
            .then((data) => {
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
                <li><a href="/html/hod_view/apply_student.html">New Applications</a></li>
                <li><a href="/html/hod_view/view_applications.html">View Applications</a></li>
                <li><a href="/html/hod_view/bursary_details.html">Bursary Details</a></li>
                <li><a href=#>Bursary = ${data.amount}</a></li>
                <li>
                    <button id="logInButton" type="button" title="Log In">Log In</button>
                    <button id="logOutButton" type="button" title="Log Out">Log Out</button>
                </li>
            </ul>
        </nav>
    `;

                document.body.insertAdjacentHTML('afterbegin', navHtml);
            })

            // .then((data) => {
            //     console.log(data);
            //     return data;
            // })
            .catch((err) => console.log(err));

        //     const navHtml = `
        //     <nav id="nav">
        //         <section id="hamburger-section">
        //             <h2 id="hamburger-section-header">
        //                 <img alt="bbd_logo" src="../../../src/assets/icons/bbd-logo.svg" id="nav-logo">
        //                 <a href="/">Ukukhula Bursary</a>
        //             </h2>
        //             <form id="hamburger-form">
        //                 <button type="button" id="hamburger-bar">
        //                     <img alt="hamburger-bar" src="../../src/assets/icons/hamburger-bar.png">
        //                 </button>
        //                 <button type="button" id="hamburger-bar-cross">
        //                     <img alt="hamburger-bar-cross" src="../../src/assets/icons/hamburger-bar-cross.png">
        //                 </button>
        //             </form>
        //         </section>
        //         <ul id="nav-menu">
        //             <li><a href="/html/hod_view/apply_student.html">New Applications</a></li>
        //             <li><a href="/html/hod_view/view_applications.html">View Applications</a></li>
        //             <li><a href="/html/hod_view/bursary_details.html">Bursary Details</a></li>
        //             <li>
        //                 <button id="logInButton" type="button" title="Log In">Log In</button>
        //                 <button id="logOutButton" type="button" title="Log Out">Log Out</button>
        //             </li>
        //         </ul>
        //     </nav>
        // `;

        // document.body.insertAdjacentHTML('afterbegin', navHtml);
    }


    createHodNav();
})

    // function fillInEthnicityRadioButtons() {
    //     let selectEthnicity = document.getElementById("ethnicity");
    //     // fill in with api
    //     let options = [
    //         "Black",
    //         "Coloured",
    //         "Indian",
    //         "Other"
    //     ];
    //     for (let i = 0; i < options.length; i++) {
    //         let opt = options[i];
    //         let el = document.createElement("input");
    //         // el.type = "radio";
    //         el.setAttribute("type", "radio");
    //         // el.id = opt;
    //         el.setAttribute("id", opt);
    //         el.name = "ethnicity_choice";
    //         el.setAttribute("name", "ethnicity_choice");
    //         // el.value = opt;
    //         el.setAttribute("value", opt);
    //         selectEthnicity.appendChild(el);

    //         let elLabel = document.createElement("label");
    //         elLabel.setAttribute("for", opt);
    //         elLabel.innerText = opt;
    //         elLabel.value = opt;
    //         selectEthnicity.appendChild(elLabel);
    //     }
    // }
    
   
    // fillInEthnicityRadioButtons();

    

//     const hamburgerBar = document.getElementById("hamburger-bar");
//     const hamburgerBarCross = document.getElementById("hamburger-bar-cross");
//     const navMenu = document.getElementById("nav-menu");

//     hamburgerBar.classList.add("open");
//     hamburgerBarCross.classList.add("close");
//     navMenu.classList.add("close");

//     hamburgerBar.onclick = () => {
//         hamburgerBar.classList.remove("open");
//         hamburgerBar.classList.add("close");
//         hamburgerBarCross.classList.add("open");
//         navMenu.classList.add("open");
//     };

//     const navMenuHide = () => {
//         hamburgerBarCross.classList.add("close");
//         hamburgerBarCross.classList.remove("open");
//         hamburgerBar.classList.remove("close");
//         hamburgerBar.classList.add("open");
//         navMenu.classList.remove("open");
//     };

//     hamburgerBarCross.onclick = () => {
//         navMenuHide();
//     };

//     let navLinks = navMenu.selectorAll("a");

//     navLinks.forEach(function (link) {
//         link.addEventListener("click", function () {
//             navMenuHide();
//         });
//     });

//     const homeMenu = document.getElementById("nav");

//     let homeMenuHeight = homeMenu.offsetHeight;

//     const homeBody = document.getElementById("home-body");
//     homeBody.style.position = "relative";

//     homeBody.style.top = homeMenuHeight + "px";

//     // Save data to sessionStorage
//     sessionStorage.setItem("isSessionActive", "true");
//     sessionStorage.setItem("userRole", "none");

//     // Get saved data from sessionStorage
//     let isSessionActive = sessionStorage.getItem("isSessionActive");
//     let logInButton = document.selector("#logInButton");
//     let logOutButton = document.selector("#logOutButton");

//     if (isSessionActive === "true") {
//         console.log("session is active");

//         logInButton.classList.add("close");
//         logInButton.classList.remove("open");

//         logOutButton.classList.remove("close");
//         logOutButton.classList.add("open");
//     } else if (isSessionActive === "false") {
//         console.log("session is not active");

//         logOutButton.classList.remove("open");
//         logOutButton.classList.add("close");

//         logInButton.classList.add("open");
//         logInButton.classList.remove("close");
//     }
// });

// // This function should be called when the user is redirected back to your application with the token
// function handleTokenResponse() {
//     // Extract the token from the URL
//     let hash = window.location.hash.substring(1);
//     let params = new URLSearchParams(hash);
//     let accessToken = params.get("access_token");

//     // Store the token in local storage (for demonstration purposes)
//     localStorage.setItem("google_access_token", accessToken);

//     // Optionally, you can now use the stored token to make authenticated API requests
// }


// global 