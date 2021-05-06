import "../scss/main.scss";

console.log("js loaded!");

const menuToggle = document.getElementById("menuToggle");
const menuCloseButton = document.getElementById("channelCloseButton");
const menu = document.getElementsByClassName("channel")[0];
const backdrop = document.getElementsByClassName("backdrop")[0];
const focusToChannel = document.getElementById("focusToChannel");
const focusToRelated = document.getElementById("focusToRelated");
const header = document.getElementsByClassName("video__header")[0];
const video = document.getElementsByClassName("video__content")[0];
const board = document.getElementsByClassName("board")[0];
let isFixed = null;

function classToggleHandler(e, element, className, method = "toggle") {
  switch (method) {
    case "toggle":
      element.classList.toggle(className);
      break;
    case "on":
      if (!element.classList.contains(className)) {
        element.classList.add(className);
      }
      break;
    case "off":
      if (element.classList.contains(className)) {
        element.classList.remove(className);
      }
      break;
  }
}
menuToggle.addEventListener("click", (e) => {
  classToggleHandler(e, menu, "is-active", "on");
  classToggleHandler(e, backdrop, "is-active", "on");
  menu.setAttribute("tabindex", "0");
  menu.setAttribute("role", "dialog");
  menu.setAttribute("aria-labelledby", "channelLabel");
  menu.focus();
});

backdrop.addEventListener("click", (e) => {
  classToggleHandler(e, menu, "is-active", "off");
  classToggleHandler(e, backdrop, "is-active", "off");
  menu.removeAttribute("tabindex");
  menu.removeAttribute("role");
  menu.removeAttribute("aria-labelledby");
});

menuCloseButton.addEventListener("click", (e) => {
  classToggleHandler(e, menu, "is-active", "off");
  classToggleHandler(e, backdrop, "is-active", "off");
  menu.removeAttribute("tabindex");
  menu.removeAttribute("role");
  menu.removeAttribute("aria-labelledby");
});
menuCloseButton.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    classToggleHandler(e, menu, "is-active", "off");
    classToggleHandler(e, backdrop, "is-active", "off");
    menu.removeAttribute("tabindex");
    menu.removeAttribute("role");
    menu.removeAttribute("aria-labelledby");
    menuToggle.focus();
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    classToggleHandler(e, menu, "is-active", "off");
    classToggleHandler(e, backdrop, "is-active", "off");
    menu.removeAttribute("tabindex");
    menu.removeAttribute("role");
    menu.removeAttribute("aria-labelledby");
    menuToggle.focus();
  }
});

focusToChannel.addEventListener("click", (e) => {
  document.querySelector(".channel__info > a").focus();
});
focusToRelated.addEventListener("click", (e) => {
  document.querySelector("#related__check").focus();
});

document.addEventListener("scroll", (e) => {
  isFixed = window.innerWidth < 1024 && window.innerWidth <= window.innerHeight;
  const scroll = Number(document.documentElement.scrollTop);
  if (isFixed && scroll > 50) {
    classToggleHandler(e, board, "is-fixed", "on");
  } else {
    classToggleHandler(e, board, "is-fixed", "off");
  }
  if (isFixed && scroll > 60) {
    classToggleHandler(e, header, "is-fixed", "on");
    classToggleHandler(e, video, "is-fixed", "on");
  } else {
    classToggleHandler(e, header, "is-fixed", "off");
    classToggleHandler(e, video, "is-fixed", "off");
  }
});

window.addEventListener("resize", (e) => {
  isFixed = window.innerWidth < 1024;
});
