"use strict";

function scrollToServices() {
  const services = document.getElementById("services");

  window.scrollTo({
    top: services.offsetTop - 110,
  });
}

const scrollDown = document.querySelector(".scroll-down");

window.addEventListener("scroll", () => {
  if (window.scrollY > 400) {
    scrollDown.classList.add("hidden");
  } else {
    scrollDown.classList.remove("hidden");
  }
});

//MENU TOGGLE OFF
const navMenuToggle = document.querySelector(".nav-menu-toggle");
const navigation = document.querySelector(".navigation");

navMenuToggle.addEventListener("click", () => {
  navigation.classList.toggle("active");
});

document.addEventListener("click", (event) => {
  if (
    !navigation.contains(event.target) &&
    !navMenuToggle.contains(event.target)
  ) {
    navigation.classList.remove("active");
  }
});

//CAROUSEL
const carousel = document.getElementById("carousel");

const images = carousel.querySelectorAll("img");

images.forEach((image) => {
  const clone = image.cloneNode(true);
  carousel.appendChild(clone);
});

let position = 0;

const speed = 1;

const totalWidth = carousel.scrollWidth / 2;

function animate() {
  position -= speed;

  carousel.style.transform = `translateX(${position}px)`;

  if (Math.abs(position) >= totalWidth) {
    position = 0;
  }

  requestAnimationFrame(animate);
}

animate();

//this Year
function thisYear() {
  const dt = new Date();
  let yr = dt.getFullYear();
  document.getElementById("thisYear").innerHTML = yr;
}
thisYear();
