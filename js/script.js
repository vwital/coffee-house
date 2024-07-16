//Burger menu start
const burgerButton = document.querySelector(".burger-menu-button");
const burgerMenu = document.querySelector(".burger-menu");

function closeBurgerMenu() {
  burgerMenu.classList.remove("burger-menu_active");
  burgerButton.firstElementChild.classList.remove(
    "burger-menu-line_active-upper"
  );
  burgerButton.lastElementChild.classList.remove(
    "burger-menu-line_active-lower"
  );
  document.documentElement.style.overflow = "auto";
  let isClicked = false;
}

let isClicked = false;

burgerButton.addEventListener("click", (event) => {
  if (!isClicked) {
    document.documentElement.style.overflow = "hidden";
    isClicked = true;
  } else {
    document.documentElement.style.overflow = "auto";
    isClicked = false;
  }
  burgerButton.firstElementChild.classList.toggle(
    "burger-menu-line_active-upper"
  );
  burgerButton.lastElementChild.classList.toggle(
    "burger-menu-line_active-lower"
  );
  burgerMenu.classList.toggle("burger-menu_active");
});

for (el of burgerMenu.childNodes[1].lastElementChild.children) {
  el.firstElementChild.addEventListener("click", closeBurgerMenu);
}
burgerMenu.childNodes[3].firstElementChild.addEventListener(
  "click",
  closeBurgerMenu
);

window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    closeBurgerMenu();
  }
});

//Burger menu end

//Slider

const sliderHeader = document.querySelector(".choose-header ");
const slides = document.querySelectorAll(".favorite-coffee");
const slidesContainer = document.querySelector(".favorite-coffee-container");
const slidesFirst = slides[0];
const slidesSecond = slides[1];
const slidesThird = slides[2];
let currentSlide = slidesFirst;
const sliderArrowLeft = document.querySelector(".choose__arrow-left");
const sliderArrowRight = document.querySelector(".choose__arrow-right");
const sliderContainer = document.querySelector(".choose-slider");
const sliderContent = sliderContainer.childNodes[3];

//Coffee points
const coffeePointers = document.querySelectorAll(".favorite-coffee-pointer");
const coffeePointersFirst = coffeePointers[0].firstElementChild;
const coffeePointersSecond = coffeePointers[1].firstElementChild;
const coffeePointersThird = coffeePointers[2].firstElementChild;

let currentPoint = coffeePointersFirst;
let progress = 0;
let goProgress;

function pointFilling() {
  coffeePointers.forEach((el) => {
    el.firstElementChild.style.width = "0";
    progress = 0;
    clearTimeout(goProgress);
  });
}

function goProgressBar() {
  clearInterval(goProgress);
  progress += 2;
  currentPoint.style.width = progress + "%";
  if (progress <= 100) {
    goProgress = setTimeout(goProgressBar, 100);
  }
  if (progress === 100) {
    clearTimeout(goProgress);
    nextSlide();
  }
}

pointFilling();
goProgressBar();

function goToFirstSlide() {
  slidesFirst.style = "transform:translateX(0)";
  slidesSecond.style = "transform:translateX(0)";
  slidesThird.style = "transform:translateX(0)";
  let progress = 0;
  currentPoint = coffeePointersFirst;
  pointFilling();
  goProgressBar();
  return (currentSlide = slidesFirst);
}

function goToSecondSlide() {
  slidesFirst.style = "transform:translateX(-100%)";
  slidesSecond.style = "transform:translateX(-100%)";
  slidesThird.style = "transform:translateX(-100%)";
  let progress = 0;
  currentPoint = coffeePointersSecond;
  pointFilling();
  goProgressBar();
  return (currentSlide = slidesSecond);
}
function goToThirdSlide() {
  slidesFirst.style = "transform:translateX(-200%)";
  slidesSecond.style = "transform:translateX(-200%)";
  slidesThird.style = "transform:translateX(-200%)";
  let progress = 0;
  currentPoint = coffeePointersThird;
  pointFilling();
  goProgressBar();
  return (currentSlide = slidesThird);
}

function nextSlide() {
  if (currentSlide === slidesFirst) return goToSecondSlide();
  if (currentSlide === slidesSecond) return goToThirdSlide();
  if (currentSlide === slidesThird) return goToFirstSlide();
  resetPadding();
}

function prevSlide() {
  if (currentSlide === slidesFirst) return goToThirdSlide();
  if (currentSlide === slidesSecond) return goToFirstSlide();
  if (currentSlide === slidesThird) return goToSecondSlide();
  resetPadding();
}

sliderArrowRight.addEventListener("click", () => {
  nextSlide();
});

sliderArrowLeft.addEventListener("click", () => {
  prevSlide();
});

function resetPadding() {
  slidesContainer.style.removeProperty("padding");
  slidesContainer.style.removeProperty("padding-left");
  slidesContainer.style.removeProperty("padding-right");
  sliderHeader.style.removeProperty("padding-left");
  sliderHeader.style.removeProperty("padding-right");
}

//Slider touch

let startX;
let currentXPoint;
let difference;
slidesContainer.addEventListener("touchstart", (event) => {
  startX = event.touches[0].clientX;
  clearInterval(goProgress);
});
slidesContainer.addEventListener("touchmove", (event) => {
  currentXPoint = event.touches[0].clientX;
  difference = startX - currentXPoint;
  if (difference > 20) {
    sliderContainer.children[1].style.paddingRight = `50px`;
    sliderHeader.style.paddingRight = `25px`;
  }
  if (difference < -20) {
    sliderContainer.children[1].style.paddingLeft = `50px`;
    sliderHeader.style.paddingLeft = `25px`;
  }
});
slidesContainer.addEventListener("touchend", (event) => {
  if (difference > 50) {
    nextSlide();
    resetPadding();
  }
  if (difference < -50) {
    prevSlide();
    resetPadding();
  }
});

sliderContent.addEventListener("mouseover", () => {
  clearInterval(goProgress);
});

sliderContent.addEventListener("mouseout", () => {
  goProgressBar();
});

sliderContent.addEventListener("start", () => {
  goProgressBar();
});

sliderContent.addEventListener("touchend", () => {
  goProgressBar();
});
//Slider end
