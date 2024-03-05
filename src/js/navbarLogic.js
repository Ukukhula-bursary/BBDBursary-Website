document.addEventListener("DOMContentLoaded", async function () {
  // Nav-bars based on user role
  async function createAdminNav() {
    return fetch("../../html/nav_bar/nav_bar.html")
      .then((response) => response.text())
      .then((html) => html)
      .catch((error) => console.error("Error loading menu:", error));
  }

  async function createVisitorNav() {
    return fetch("../../html/nav_bar/visitor_nav_bar.html")
      .then((response) => response.text())
      .then((html) => html)
      .catch((error) => console.error("Error loading menu:", error));
  }

  async function createHeadOfDepartmentNav() {
    return fetch("/html/nav_bar/hod_navbar.html")
      .then((response) => response.text())
      .then((html) => html)
      .catch((error) => console.error("Error loading menu:", error));
  }

  const BBD_ADMIN_ROLES = [
    "ROLE_BBDAdmin_Finance",
    "ROLE_BBDAdmin_Reviewers",
    "ROLE_BBDSuperAdmin",
  ];

  const UNIVERSITY_ADMIN_ROLES = ["ROLE_HOD", "ROLE_UniversityAdmin"];
  const STUDENT_ADMIN_ROLES = ["ROLE_Student"];
  // const universityRoles =

  console.log(`Current user role = {${localStorage.getItem("userRole")}}`);

  //wrap setView fn()
  if (
    BBD_ADMIN_ROLES.includes(localStorage.getItem("userRole")) &&
    localStorage.getItem("isSessionActive") === "true"
  ) {
    // see admin navbar///////////////////
    console.log("showing ADMIN Navbar");

    const adminNavHTML = await createAdminNav();
    document.body.insertAdjacentHTML("afterbegin", adminNavHTML);
  } else if (
    UNIVERSITY_ADMIN_ROLES.includes(localStorage.getItem("userRole")) &&
    localStorage.getItem("isSessionActive") === "true"
  ) {
    //see head of department navbar/////////////

    console.log("showing HOD Navbar");

    const headOfDepartmentNavHTML = await createHeadOfDepartmentNav();
    document.body.insertAdjacentHTML("afterbegin", headOfDepartmentNavHTML);
  } else if (STUDENT_ADMIN_ROLES.includes(localStorage.getItem("userRole"))) {
    //see student navbar/////////////

    console.log("student Navbar ");

    const visitorNavHTML = await createVisitorNav();
    document.body.insertAdjacentHTML("afterbegin", visitorNavHTML);
  } else {
    // see visitor navbar/////////////

    console.log("visitor view: No  valid role found!");
    const visitorNavHTML = await createVisitorNav();
    document.body.insertAdjacentHTML("afterbegin", visitorNavHTML);
  }

  const hamburgerBar = document.getElementById("hamburger-bar");
  const hamburgerBarCross = document.getElementById("hamburger-bar-cross");
  const navMenu = document.getElementById("nav-menu");

  hamburgerBar.classList.add("open");
  hamburgerBarCross.classList.add("close");

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

  const homeMenu = document.querySelector("nav");

  let homeMenuHeight = homeMenu.offsetHeight;

  const homeBody = document.getElementById("home-body");
  homeBody.style.position = "relative";

  homeBody.style.top = homeMenuHeight + "px";

  // Get saved data from localStorage
  let logInButton = document.querySelector("#logInButton");
  let logOutButton = document.querySelector("#logOutButton");

  if (
    localStorage.getItem("isSessionActive") === "true" &&
    [...BBD_ADMIN_ROLES, UNIVERSITY_ADMIN_ROLES, STUDENT_ADMIN_ROLES].includes(
      localStorage.getItem("userRole")
    )
  ) {
    console.log("session is active");

    logInButton.classList.add("close");
    logInButton.classList.remove("open");

    logOutButton.classList.remove("close");
    logOutButton.classList.add("open");
  } else {
    console.log("session is not active");

    logOutButton.classList.remove("open");
    logOutButton.classList.add("close");

    logInButton.classList.add("open");
    logInButton.classList.remove("close");

    const navMenuHide = () => {
      navMenu.classList.remove("close");
      navMenu.classList.add("open");
    };

    // navMenuHide();
  }

  logInButton.addEventListener("click", function () {
    login();
  });

  logOutButton.addEventListener("click", function () {
    logOut();
  });
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

const YOUR_CLIENT_ID =
  "509502634606-7bcfbabbs4mmfiphg8ae4tn4djvom8rv.apps.googleusercontent.com";
const YOUR_REDIRECT_URI =
  "https://bbd-bursary-website-git-main-ukukhula.vercel.app";

var fragmentString = location.hash.substring(1);

// Parse query string to see if page request is coming from OAuth 2.0 server.
var params = {};
var regex = /([^&=]+)=([^&]*)/g,
  m;
while ((m = regex.exec(fragmentString))) {
  params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
}
if (Object.keys(params).length > 0) {
  localStorage.setItem("oauth2-test-params", JSON.stringify(params));
  let searchParams = new URLSearchParams(window.location.search);
  console.log(searchParams);
  if (params["state"] && params["state"] == "login") {
    login();
  }
}

// If there's an access token, try an API request.
// Otherwise, start OAuth 2.0 flow.
function login() {
  const params = JSON.parse(localStorage.getItem("oauth2-test-params"));
  if (params && params["access_token"]) {
    var xhr = new XMLHttpRequest();
    xhr.open(
      "GET",
      "https://www.googleapis.com/drive/v3/about?fields=user&" +
        "access_token=" +
        params["access_token"]
    );
    xhr.onreadystatechange = function (e) {
      if (xhr.readyState === 4 && xhr.status === 200) {
        // console.log(xhr.response);
        sendToAPI(xhr.response);
      } else if (xhr.readyState === 4 && xhr.status === 401) {
        // Token invalid, so prompt for user permission.
        oauth2SignIn();
      }
    };
    xhr.send(null);
  } else {
    oauth2SignIn();
  }
}

/*
 * Create form to request access token from Google's OAuth 2.0 server.
 */
function oauth2SignIn() {
  // Google's OAuth 2.0 endpoint for requesting an access token
  var oauth2Endpoint = "https://accounts.google.com/o/oauth2/v2/auth";

  // Create element to open OAuth 2.0 endpoint in new window.
  var form = document.createElement("form");
  form.setAttribute("method", "GET"); // Send as a GET request.
  form.setAttribute("action", oauth2Endpoint);

  // Parameters to pass to OAuth 2.0 endpoint.
  var params = {
    client_id: YOUR_CLIENT_ID,
    redirect_uri: YOUR_REDIRECT_URI,
    scope: "https://www.googleapis.com/auth/drive.metadata.readonly",
    state: "try_sample_request",
    include_granted_scopes: true,
    response_type: "token",
  };

  // Add form parameters as hidden input values.
  for (var p in params) {
    var input = document.createElement("input");
    input.setAttribute("type", "hidden");
    input.setAttribute("name", p);
    input.setAttribute("value", params[p]);
    form.appendChild(input);
  }

  // Add form to page and submit it to open the OAuth 2.0 endpoint.
  document.body.appendChild(form);
  form.submit();
}

function sendToAPI(data) {
  fetch("https://bursary-api-1709020026838.azurewebsites.net/Oauth/login", {
    method: "POST",
    mode: "cors",
    // headers: {
    //     'Content-Type': 'application/json'
    // },
    body: JSON.stringify({ responseData: data }), // Assuming data needs parsing
  })
    .then((response) => {
      // alert(response.json());
      if (response.ok) {
        return response.json(); // Parse response JSON
      } else {
        console.error("Failed to send data to API.");
      }
    })
    .then((data) => {
      localStorage.setItem("jwtToken", data.token);
      localStorage.setItem("email", data.email);
      localStorage.setItem("userRole", data.userRole);
      localStorage.setItem("isSessionActive", "true");
      window.location.href = "/";
      console.log("Authenticated");
    })
    .catch((error) => {
      console.error("Error while sending data to API:", error);
    });
}
function logOut() {
  localStorage.clear();F
}
