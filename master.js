let showSettings = document.querySelector(".show-settings");
let settings = document.querySelector(".settings");
let colors = document.querySelectorAll(".color span");
let playVideo = document.querySelector(".tablet .play");
let stopVideo = document.querySelector(".tablet .stop");
let mutedVideo = document.querySelector(".tablet .muted");
let unmutedVideo = document.querySelector(".tablet .unmuted");
let video = document.querySelector(".tablet video");
let body = document.querySelector("body");
let overlay = document.querySelector(".overlay");
let menuIcon = document.querySelector(".menu");
let navMenu = document.querySelector(".header nav");
let goTop = document.querySelector(".gotop");
let bouncing = document.querySelector(".bouncing");
let bullets = document.querySelector(".bullets");
let menuLinks = document.querySelectorAll("nav ul li a");
let allSections = document.querySelectorAll(".sc");
let setBulletsBtn = document.querySelectorAll(".set-bullets button");

// Open menu for small screen

menuIcon.onclick = function () {
  navMenu.classList.toggle("show-menu");
  menuIcon.classList.toggle("active");
};

// Open and Close Settings by btn

showSettings.addEventListener("click", () => {
  settings.classList.toggle("show");
  showSettings.classList.toggle("rotate");
  stopScrolling();
});

// Stop propagation on Settings

settings.onclick = function (e) {
  e.stopPropagation();
};

// Close Settings

document.onclick = function (e) {
  if (e.target !== settings && e.target !== showSettings) {
    settings.classList.remove("show");
    showSettings.classList.remove("rotate");
    stopScrolling();
  }
};

// Set Main Color

if (localStorage.getItem("color")) {
  let mainColor = localStorage.getItem("color");
  document.documentElement.style.setProperty("--main-color", mainColor);
  colors.forEach((e) => {
    if (e.dataset.color === mainColor) {
      setClass(e, colors, "active");
    }
  });
}

colors.forEach((e) => {
  e.addEventListener("click", () => {
    setClass(e, colors, "active");
    document.documentElement.style.setProperty("--main-color", e.dataset.color);
    localStorage.setItem("color", e.dataset.color);
  });
});

// Video Control

playVideo.addEventListener("click", () => {
  video.pause();
  setStyle(stopVideo, playVideo);
});
stopVideo.addEventListener("click", () => {
  video.play();
  setStyle(playVideo, stopVideo);
});
mutedVideo.addEventListener("click", () => {
  video.muted = false;
  setStyle(unmutedVideo, mutedVideo);
});
unmutedVideo.addEventListener("click", () => {
  video.muted = true;
  setStyle(mutedVideo, unmutedVideo);
});

// Create Bullets

let myUl = document.createElement("ul");
menuLinks.forEach((e) => {
  createLinksBl(myUl, e.getAttribute("href"));
});
bullets.appendChild(myUl);

// Disable bullets on small screnn in start

if (body.offsetWidth < 767) {
  setBulletsBtn[0].classList.remove("active");
  setBulletsBtn[1].classList.add("active");
  setBullets(setBulletsBtn[1]);
}

// Enable and Disable Bullets

if (localStorage.getItem("active")) {
  setBulletsBtn.forEach((e) => {
    if (e.classList.contains(localStorage.getItem("active"))) {
      setClass(e, setBulletsBtn, "active");
    }
    setBullets(e);
  });
}

setBulletsBtn.forEach((el) => {
  el.onclick = function () {
    setClass(el, setBulletsBtn, "active");
    localStorage.setItem("active", el.classList[0]);
    setBullets(el);
  };
});

// Set goTop icon

goTop.onclick = function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

window.onscroll = function () {
  // Show and Hide goTop

  if (scrollY > document.documentElement.clientHeight) {
    goTop.classList.add("show");
  } else {
    goTop.classList.remove("show");
  }

  // Show and Hide Bullets

  if (scrollY > document.documentElement.clientHeight - 300) {
    bullets.classList.add("show");
  } else {
    bullets.classList.remove("show");
  }
  // Set Active Bullet
  let bulletsLinks = document.querySelectorAll(".bullets ul li a");

  allSections.forEach((e) => {
    if (
      scrollY > e.offsetTop - 200 &&
      scrollY < e.offsetTop + e.offsetHeight + 200
    ) {
      bulletsLinks.forEach((el) => {
        if (el.dataset.section === e.classList[0]) {
          setClass(el, bulletsLinks, "active");
        }
      });
    }
  });
};

// Functions

function setClass(e, val, cls) {
  val.forEach((e) => {
    e.classList.remove(cls);
  });
  e.classList.add(cls);
}

function setStyle(a, b) {
  a.style.display = "block";
  b.style.display = "none";
}

function stopScrolling() {
  if (settings.classList.contains("show")) {
    body.classList.add("stop-scrolling");
    overlay.style.display = "block";
    bouncing.style.display = "none";
  } else {
    body.classList.remove("stop-scrolling");
    overlay.style.display = "none";
    bouncing.style.display = "block";
  }
}

function createLinksBl(ul, link) {
  let li = document.createElement("li");
  let a = document.createElement("a");
  a.setAttribute("data-section", link.substr(1));
  a.href = link;
  li.appendChild(a);
  ul.appendChild(li);
}

function setBullets(e) {
  if (e.classList.contains("active")) {
    if (e.classList[0] === "true") {
      bullets.classList.remove("disable");
    } else {
      bullets.classList.add("disable");
    }
  }
}
