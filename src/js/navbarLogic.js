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
});
