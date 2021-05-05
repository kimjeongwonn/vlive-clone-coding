import "../scss/main.scss";

const menuToggle = document.getElementById("menuToggle");
const menu = document.querySelector(".channel");
const backdrop = document.querySelector(".backdrop");

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
backdrop.addEventListener("click", (e) => {
  classToggleHandler(e, menu, "is-active", "off");
  classToggleHandler(e, backdrop, "is-active", "off");
});

menuToggle.addEventListener("click", (e) => {
  classToggleHandler(e, menu, "is-active", "toggle");
  classToggleHandler(e, backdrop, "is-active", "toggle");
});

document.addEventListener("keydown", (e) => {
  if (e.key == "Escape") {
    classToggleHandler(null, menu, "is-active", "off");
    classToggleHandler(null, backdrop, "is-active", "off");
  }
});
