import "../scss/main.scss";
import "./dy";

const menuToggle = document.getElementById("menuToggle");
const menuCloseButton = document.getElementById("channelCloseButton");
const menu = document.getElementsByClassName("channel")[0];
const backdrop = document.getElementsByClassName("backdrop")[0];

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
