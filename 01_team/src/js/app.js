import "../scss/main.scss";

const menuToggle = document.getElementById("menuToggle");
const menu = document.querySelector(".channel");
let isMenuToggle = false;

function menuToggleHandler(e, method = "toggle") {
  switch (method) {
    case "toggle":
      menu.classList.toggle("is-active");
      isMenuToggle = !isMenuToggle;
      break;
    case "on":
      if (!menu.classList.contains("is-active")) {
        menu.classList.add("is-active");
      }
      break;
    case "off":
      if (menu.classList.contains("is-active")) {
        menu.classList.remove("is-active");
      }
      break;
  }
}

menuToggle.addEventListener("click", menuToggleHandler);

document.addEventListener("keydown", (e) => {
  if (e.key == "Escape") {
    menuToggleHandler(null, "off");
  }
});
