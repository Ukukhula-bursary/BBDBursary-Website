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
    logInButton.addEventListener("click", function () {
      login()
    })
    logOutButton.addEventListener("click", function () {
      login()
    })
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

const YOUR_CLIENT_ID =
  ;
const YOUR_REDIRECT_URI = ;

  var fragmentString = location.hash.substring(1);

  // Parse query string to see if page request is coming from OAuth 2.0 server.
  var params = {};
  var regex = /([^&=]+)=([^&]*)/g, m;
  while (m = regex.exec(fragmentString)) {
    params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
  }
  if (Object.keys(params).length > 0) {
    localStorage.setItem('oauth2-test-params', JSON.stringify(params) );
    let searchParams = new URLSearchParams(window.location.search);
    console.log(searchParams);
    if (params['state'] && params['state'] == 'login') {
      login();
    }
  }

  // If there's an access token, try an API request.
  // Otherwise, start OAuth 2.0 flow.
  function login() {
    var params = JSON.parse(localStorage.getItem('oauth2-test-params'));
    if (params && params['access_token']) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET',
          'https://www.googleapis.com/drive/v3/about?fields=user&' +
          'access_token=' + params['access_token']);
      xhr.onreadystatechange = function (e) {
        if (xhr.readyState === 4 && xhr.status === 200) {
          // console.log(xhr.response);
          sendToAPI(xhr.response)
         
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
    var oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';

    // Create element to open OAuth 2.0 endpoint in new window.
    var form = document.createElement('form');
    form.setAttribute('method', 'GET'); // Send as a GET request.
    form.setAttribute('action', oauth2Endpoint);

    // Parameters to pass to OAuth 2.0 endpoint.
    var params = {'client_id': YOUR_CLIENT_ID,
                  'redirect_uri': YOUR_REDIRECT_URI,
                  'scope': 'https://www.googleapis.com/auth/drive.metadata.readonly',
                  'state': 'try_sample_request',
                  'include_granted_scopes': 'true',
                  'response_type': 'token'};

    // Add form parameters as hidden input values.
    for (var p in params) {
      var input = document.createElement('input');
      input.setAttribute('type', 'hidden');
      input.setAttribute('name', p);
      input.setAttribute('value', params[p]);
      form.appendChild(input);
    }

    // Add form to page and submit it to open the OAuth 2.0 endpoint.
    document.body.appendChild(form);
    form.submit();
  }

  function sendToAPI(data) {
fetch('http://localhost:8090/Oauth/login', {
  method: 'POST',
  mode: 'cors',
  // headers: {
  //     'Content-Type': 'application/json'
  // },
  body: JSON.stringify({ responseData: data }) // Assuming data needs parsing
})
.then(response => {
// alert(response.json());
  if (response.ok) {
      return response.json(); // Parse response JSON
  } else {
      console.error('Failed to send data to API.');
  }
})
.then(data => {
  localStorage.setItem('jwtToken', data.token);
  localStorage.setItem('email', data.email);
  localStorage.setItem('userRole', data.userRole);
})
.catch(error => {
  console.error('Error while sending data to API:', error);
});
}

//////////////////////////////////////

