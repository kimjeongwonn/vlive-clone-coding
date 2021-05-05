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
