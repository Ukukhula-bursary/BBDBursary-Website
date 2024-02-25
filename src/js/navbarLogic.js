document.addEventListener("DOMContentLoaded", function () {
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
  sessionStorage.setItem("isSessionActive", "false");
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
