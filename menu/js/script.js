import data from './products.js';

//Burger menu start
const burgerButton = document.querySelector('.burger-menu-button');
const burgerMenu = document.querySelector('.burger-menu');

function closeBurgerMenu() {
  burgerMenu.classList.remove('burger-menu_active');
  burgerButton.firstElementChild.classList.remove(
    'burger-menu-line_active-upper'
  );
  burgerButton.lastElementChild.classList.remove(
    'burger-menu-line_active-lower'
  );
  document.documentElement.style.overflow = 'auto';
  isClicked = false;
}

let isClicked = false;

burgerButton.addEventListener('click', (event) => {
  if (!isClicked) {
    document.documentElement.style.overflow = 'hidden';
    isClicked = true;
  } else {
    document.documentElement.style.overflow = 'auto';
    isClicked = false;
  }
  burgerButton.firstElementChild.classList.toggle(
    'burger-menu-line_active-upper'
  );
  burgerButton.lastElementChild.classList.toggle(
    'burger-menu-line_active-lower'
  );
  burgerMenu.classList.toggle('burger-menu_active');
});

for (let el of burgerMenu.childNodes[1].lastElementChild.children) {
  el.firstElementChild.addEventListener('click', closeBurgerMenu);
}

window.addEventListener('resize', () => {
  if (window.innerWidth > 768) {
    closeBurgerMenu();
  }
});

//Burger menu end

//Categories of products on the menu page:

const moreFoodButton = document.querySelector('.more-food-button');
const coffeeList = document.querySelector('.coffee-list');
const teaList = document.querySelector('.tea-list');
const dessertList = document.querySelector('.dessert-list');

let currentList = coffeeList;

moreFoodButton.addEventListener('click', () => {
  if (currentList === coffeeList) {
    coffeeList.classList.add('list_visible');
  }
  if (currentList === dessertList) {
    dessertList.classList.add('list_visible');
  }
  moreFoodButton.classList.add('more-food-button_hide');
});

window.addEventListener('resize', () => {
  if (window.innerWidth >= 768) {
    dessertList.classList.remove('list_visible');
    coffeeList.classList.remove('list_visible');
    moreFoodButton.classList.remove('more-food-button_hide');
  }
});

window.addEventListener('resize', () => {
  if (window.innerWidth < 768) {
    dessertList.classList.remove('list_visible');
    coffeeList.classList.remove('list_visible');
    moreFoodButton.classList.remove('more-food-button_hide');
  }
});

const choseFoodButtons = document.querySelectorAll('.choose-food-button');
const coffeButton = choseFoodButtons[0];
const teaButton = choseFoodButtons[1];
const dessertButton = choseFoodButtons[2];

teaButton.addEventListener('click', () => {
  currentList = teaList;
  choseFoodButtons.forEach((el) => {
    el.classList.remove('choose-food-button_active');
  });
  teaButton.classList.add('choose-food-button_active');
  coffeeList.classList.add('hide-list');
  dessertList.classList.add('hide-list');
  teaList.classList.remove('hide-list');
  moreFoodButton.classList.add('more-food-button_hide');
  dessertList.classList.remove('list_visible');
  coffeeList.classList.remove('list_visible');
});

dessertButton.addEventListener('click', () => {
  currentList = dessertList;
  choseFoodButtons.forEach((el) => {
    el.classList.remove('choose-food-button_active');
  });
  dessertButton.classList.add('choose-food-button_active');
  coffeeList.classList.add('hide-list');
  teaList.classList.add('hide-list');
  dessertList.classList.remove('hide-list');
  moreFoodButton.classList.remove('more-food-button_hide');
  coffeeList.classList.remove('list_visible');
});

coffeButton.addEventListener('click', () => {
  currentList = coffeeList;
  choseFoodButtons.forEach((el) => {
    el.classList.remove('choose-food-button_active');
  });
  coffeButton.classList.add('choose-food-button_active');
  teaList.classList.add('hide-list');
  dessertList.classList.add('hide-list');
  coffeeList.classList.remove('hide-list');
  dessertList.classList.remove('list_visible');
  moreFoodButton.classList.remove('more-food-button_hide');
});

// MODAL

const foodCards = document.querySelectorAll('.food-card');
const modalWindow = document.querySelector('.modal-window');
const modalImg =
  modalWindow.firstElementChild.firstElementChild.firstElementChild;
const modalHeader =
  modalWindow.firstElementChild.lastElementChild.firstElementChild;
const modalDescription =
  modalWindow.firstElementChild.lastElementChild.children[1];
const modalSizeS =
  modalWindow.firstElementChild.lastElementChild.children[3].children[0];
const modalSizeM =
  modalWindow.firstElementChild.lastElementChild.children[3].children[1];
const modalSizeL =
  modalWindow.firstElementChild.lastElementChild.children[3].children[2];
const modalAdditives1 =
  modalWindow.firstElementChild.lastElementChild.children[5].children[0];
const modalAdditives2 =
  modalWindow.firstElementChild.lastElementChild.children[5].children[1];
const modalAdditives3 =
  modalWindow.firstElementChild.lastElementChild.children[5].children[2];
const modalPrice =
  modalWindow.firstElementChild.lastElementChild.children[6].children[1];

function showModal() {
  document.body.classList.add('shadow');
  document.documentElement.style.backgroundColor = 'rgb(112, 106, 100)';
  document.documentElement.style.overflow = 'hidden';
  modalWindow.classList.add('show-modal');
}
let currentPrice;
let defaultPrice;

foodCards.forEach((card) => {
  let cardHeader = card.lastElementChild.firstElementChild.textContent;
  card.addEventListener('click', (event) => {
    data.forEach((el) => {
      if (cardHeader === el.name) {
        resetSize();
        modalHeader.textContent = el.name;
        modalImg.src = card.firstElementChild.firstElementChild.src;
        modalImg.alt = card.firstElementChild.firstElementChild.alt;
        modalDescription.textContent = el.description;
        modalSizeS.innerHTML = `<span class="size-button-ico">S</span>${el.sizes.s.size}`;
        modalSizeM.innerHTML = `<span class="size-button-ico">M</span>${el.sizes.m.size}`;
        modalSizeL.innerHTML = `<span class="size-button-ico">L</span>${el.sizes.l.size}`;
        modalAdditives1.innerHTML = `<span class="size-button-ico">1</span>${el.additives[0].name}`;
        modalAdditives2.innerHTML = `<span class="size-button-ico">2</span>${el.additives[1].name}`;
        modalAdditives3.innerHTML = `<span class="size-button-ico">3</span>${el.additives[2].name}`;
        modalPrice.textContent = `$${el.price}`;
        defaultPrice = `$${el.price}`;
        currentPrice = defaultPrice;
        showModal();
        resetButtons();
        resetAddivites();
      }
    });
  });
});

function upPrice(incr) {
  let uppedPrice = +modalPrice.textContent.replace('$', '') + incr;
  let priceStr = '';
  if (uppedPrice.toString().length === 1) priceStr = `$${uppedPrice}.00`;
  if (uppedPrice.toString().length === 3) priceStr = `$${uppedPrice}0`;
  modalPrice.textContent = priceStr;
  currentPrice = priceStr;
}

function resetSize() {
  modalSizeS.classList.add('modal-button_active');
  modalSizeM.classList.remove('modal-button_active');
  modalSizeL.classList.remove('modal-button_active');
}

let sIsclicked = true;
let mIsclicked = false;
let lIsclicked = false;
let isSPrevious = true;
let isMPrevious = false;
let isLPrevious = false;

function resetButtons() {
  mIsclicked = false;
  lIsclicked = false;
  isSPrevious = true;
  isMPrevious = false;
  isLPrevious = false;
  sIsclicked = true;
}
modalSizeS.addEventListener('click', () => {
  if (!sIsclicked && isMPrevious) upPrice(-0.5);
  if (!sIsclicked && isLPrevious) upPrice(-1);
  modalSizeM.classList.remove('modal-button_active');
  modalSizeL.classList.remove('modal-button_active');
  modalSizeS.classList.add('modal-button_active');
  mIsclicked = false;
  lIsclicked = false;
  isSPrevious = true;
  isLPrevious = false;
  sIsclicked = true;
});

modalSizeM.addEventListener('click', () => {
  if (!mIsclicked && !isLPrevious) upPrice(0.5);
  if (!mIsclicked && isLPrevious) upPrice(-0.5);
  mIsclicked = true;
  lIsclicked = false;
  isSPrevious = false;
  isMPrevious = true;
  isLPrevious = false;
  sIsclicked = false;
  modalSizeS.classList.remove('modal-button_active');
  modalSizeL.classList.remove('modal-button_active');
  modalSizeM.classList.add('modal-button_active');
});

modalSizeL.addEventListener('click', () => {
  if (!lIsclicked && isSPrevious) upPrice(1);
  if (!lIsclicked && !isSPrevious) upPrice(0.5);
  mIsclicked = false;
  lIsclicked = true;
  isLPrevious = true;
  sIsclicked = false;
  isMPrevious = false;
  modalSizeS.classList.remove('modal-button_active');
  modalSizeM.classList.remove('modal-button_active');
  modalSizeL.classList.add('modal-button_active');
});

//Addivites buttons

let isAddivites1 = false;
let isAddivites2 = false;
let isAddivites3 = false;

function resetAddivites() {
  isAddivites1 = false;
  isAddivites2 = false;
  isAddivites3 = false;
  modalAdditives1.classList.remove('modal-button_active');
  modalAdditives2.classList.remove('modal-button_active');
  modalAdditives3.classList.remove('modal-button_active');
}

modalAdditives1.addEventListener('click', () => {
  if (!isAddivites1) {
    upPrice(0.5);
    isAddivites1 = true;
    modalAdditives1.classList.add('modal-button_active');
  } else {
    modalAdditives1.classList.remove('modal-button_active');
    upPrice(-0.5);
    isAddivites1 = false;
  }
});

modalAdditives2.addEventListener('click', () => {
  if (!isAddivites2) {
    upPrice(0.5);
    isAddivites2 = true;
    modalAdditives2.classList.add('modal-button_active');
  } else {
    modalAdditives2.classList.remove('modal-button_active');
    upPrice(-0.5);
    isAddivites2 = false;
  }
});

modalAdditives3.addEventListener('click', () => {
  if (!isAddivites3) {
    upPrice(0.5);
    isAddivites3 = true;
    modalAdditives3.classList.add('modal-button_active');
  } else {
    modalAdditives3.classList.remove('modal-button_active');
    upPrice(-0.5);
    isAddivites3 = false;
  }
});

// Close modal

const closeModalButton = document.querySelector('.modal-close-button');

closeModalButton.addEventListener('click', closeModal);

function closeModal() {
  document.body.classList.remove('shadow');
  modalWindow.classList.remove('show-modal');
  document.documentElement.style.backgroundColor = '#e1d4c9';
  document.documentElement.style.overflow = 'auto';
}

document.addEventListener('click', (event) => {
  if (event.target === document.body) closeModal();
});
