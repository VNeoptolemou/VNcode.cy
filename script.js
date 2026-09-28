"use strict";

// SAMPLE BUDGET CALCULATOR — edit these rates to change the estimate.
const budgetRates = { base: 100, perPage: 50, perTool: 80 };
const budgetPages = document.getElementById("budget-pages");
const budgetTools = document.getElementById("budget-tools");
const budgetCurrency = new Intl.NumberFormat("en-IE", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

function updateBudget() {
  const pages = Number(budgetPages.value);
  const customTools = Number(budgetTools.value);
  document.getElementById("budget-pages-value").value = pages;
  document.getElementById("budget-tools-value").value = customTools;
  document.getElementById("budget-total").value = budgetCurrency.format(
    budgetRates.base +
      pages * budgetRates.perPage +
      customTools * budgetRates.perTool,
  );
}

// Keep example selections and slider counts in sync in both directions.
function connectBudgetOptions(slider, containerId) {
  const options = Array.from(
    document.querySelectorAll(`#${containerId} input[type="checkbox"]`),
  );

  function syncOptions() {
    const target = Number(slider.value);
    let selected = options.filter((option) => option.checked).length;
    // Preserve existing choices; add unchecked items in list order.
    for (const option of options) {
      if (selected < target && !option.checked) {
        option.checked = true;
        selected++;
      }
    }
    // When reducing the count, remove choices from the bottom of the list.
    for (const option of [...options].reverse()) {
      if (selected > target && option.checked) {
        option.checked = false;
        selected--;
      }
    }
    // Keep the page slider's minimum of one selected page.
    options.forEach((option) => {
      option.disabled = option.checked && selected <= Number(slider.min);
    });
    updateBudget();
  }

  slider.addEventListener("input", syncOptions);
  options.forEach((option) => {
    option.addEventListener("change", () => {
      slider.value = options.filter((item) => item.checked).length;
      syncOptions();
    });
  });
  syncOptions();
}

connectBudgetOptions(budgetPages, "budget-page-options");
connectBudgetOptions(budgetTools, "budget-tool-options");
updateBudget();

//SCROLL TO SERVICES
function scrollToServices() {
  const services = document.getElementById("services");

  window.scrollTo({
    top: services.offsetTop - 120,
  });
}

const scrollDown = document.querySelector(".scroll-down");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
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

//THIS YEAR
function thisYear() {
  const dt = new Date();
  let yr = dt.getFullYear();
  document.getElementById("thisYear").innerHTML = yr;
}
thisYear();
