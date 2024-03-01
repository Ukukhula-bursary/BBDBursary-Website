document.addEventListener("DOMContentLoaded", function () {
  
  function createAdminNav() {
    const navHtml = `
        <nav id="nav">
            <section id="hamburger-section">
                <h2 id="hamburger-section-header">
                    <img alt="graduation-cap" src="../../src/assets/icons/bbd-logo.svg" id="nav-logo">
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
                <li><a href="/html/admin_view/admin_dashboard.html">Dashboard</a></li>
                <li><a href="/html/admin_view/add_institution.html">Add Institution</a></li>
                <li><a href="/html/admin_view/add_university_head_of_department.html">Add University Head Of Department</a></li>
                <li><a href="/html/admin_view/add_an_admin.html">Add An Admin</a></li>
                <li><a href="/html/admin_view/review_university_applications.html">Review University Applications</a></li>
                <li><a href="/html/admin_view/review_a_student_application.html">Review A Student Application</a></li>
                <li><a href="/html/admin_view/allocate_funds.html">Allocate Funds</a></li>
                <li>
                    <button id="logInButton" type="button" title="Log In">Log In</button>
                    <button id="logOutButton" type="button" title="Log Out">Log Out</button>
                </li>
            </ul>
        </nav>
    `;

    document.body.insertAdjacentHTML('afterbegin', navHtml);
}
//save as html
//insert xml
// xml http requests ( pass )

createAdminNav();
  
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
  var hash = window.location.hash.substring(1);
  var params = new URLSearchParams(hash);
  var accessToken = params.get("access_token");

  // Store the token in local storage (for demonstration purposes)
  localStorage.setItem("google_access_token", accessToken);

  // Optionally, you can now use the stored token to make authenticated API requests
}
