document.addEventListener("DOMContentLoaded", function () {
  const logInButton = document.getElementById("google-button");

  logInButton.addEventListener("click", function () {
    login();
  });

  const YOUR_CLIENT_ID =
    "509502634606-7bcfbabbs4mmfiphg8ae4tn4djvom8rv.apps.googleusercontent.com";
  const YOUR_REDIRECT_URI = "http://localhost:8080";

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
    var params = JSON.parse(localStorage.getItem("oauth2-test-params"));
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
      include_granted_scopes: "true",
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
    fetch("http://localhost:8090/Oauth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ responseData: data }), // Assuming data needs parsing
    })
      .then((response) => {
        if (response.ok) {
          return response.json(); // Parse response JSON
        } else {
          console.error("Failed to send data to API.");
        }
      })
      .then((data) => {
        const responseData = data.responseData;
        const token = responseData.token;
        const email = responseData.email;
        const userRole = responseData.userRole;
        const userID = responseData.userID;

        // Store the JWT token, email, and user role in local storage
        localStorage.setItem("jwtToken", token);
        localStorage.setItem("email", email);
        localStorage.setItem("userRole", userRole);
        localStorage.setItem("userID", userID);

        window.location.href = "../../../index.html";
      })
      .catch((error) => {
        console.error("Error while sending data to API:", error);
      });
  }
});

//module.exports = { login, sendToAPI, oauth2SignIn };
