import "../scss/main.scss";
import "./dy";

const menuToggle = document.getElementById("menuToggle");
const menuCloseButton = document.getElementById("channelCloseButton");
const menu = document.getElementsByClassName("channel")[0];
const backdrop = document.getElementsByClassName("backdrop")[0];
const focusToChannel = document.getElementById("focusToChannel");
const focusToRelated = document.getElementById("focusToRelated");
const related = document.getElementsByClassName("related__header-wrapper")[0];

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

focusToChannel.addEventListener("click", () => {
  menu.focus();
});
focusToRelated.addEventListener("click", () => {
  related.focus();
});

const header = document.getElementsByClassName("video__header")[0];
const video = document.getElementsByClassName("video__content")[0];

document.addEventListener("scroll", (e) => {
  const bodyRect = document.body.getBoundingClientRect();

  if (bodyRect.y <= -60) {
    header.classList.add("is-fixed");
    video.classList.add("is-fixed");
  } else {
    header.classList.remove("is-fixed");
    video.classList.remove("is-fixed");
  }
});
