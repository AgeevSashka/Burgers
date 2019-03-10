//Меню Бургер

var toggled = false;
var nav = document.querySelector('.nav');
const btn = document.querySelector('.nav-tgl');

btn.addEventListener('click', function(e){
    let navBurg = document.querySelector('.burger-nav ');
  if (!toggled) {
        toggled = true;
        e.target.classList.add('toggled');
        nav.classList.add('active');
      navBurg.style.opacity = 1;
    } else {
        toggled = false;
        e.target.classList.remove('toggled');
        nav.classList.remove('active');
        navBurg.style.opacity = 0;
  }

    
});

// Аккардеон Команда 
  const items = document.querySelectorAll(".team__item");

  for (item of items) {
  
    item.addEventListener("click", e => {
      e.preventDefault();
      const curItem = e.currentTarget;
  
      if (curItem.classList.contains('acco-active')) {
        curItem.classList.remove('acco-active');
      } else {
  
        Array.from(items).forEach(elem => {
          elem.classList.remove('acco-active');
        })
  
        curItem.classList.add('acco-active');
      }
  
    });
  }
// Горизонтальный акко

const accoMenuList = document.querySelector('.menu-accordeon__list');
const accoMenuItem = document.querySelectorAll('.menu-accordeon__item');
let accoMenuItemLength = accoMenuItem.length;
const accoMenuClose = document.querySelector('.menu-accordeon__close');

accoMenuList.addEventListener('click', function (e) {
    for (let i = 0; i < accoMenuItemLength; i++) {
        accoMenuItem[i].classList.remove('menu-accordeon__item-active');
    }
});

for (let i = 0; i < accoMenuItemLength; i++) {
    accoMenuItem[i].addEventListener('click', function (e) {
        e.stopPropagation();
        e.preventDefault();

        if (accoMenuItem[i].classList.contains('menu-accordeon__item-active')) {
            accoMenuItem[i].classList.remove('menu-accordeon__item-active');
        } else {
            for (let i = 0; i < accoMenuItemLength; i++) {
                accoMenuItem[i].classList.remove('menu-accordeon__item-active');
            }
            accoMenuItem[i].classList.add('menu-accordeon__item-active');
        }
    });
};

accoMenuClose.addEventListener('click', function (e) {
    accoMenuItem.classList.remove('menu-accordeon__item-active');
});


// Модалка
const reviewsList = document.querySelector('.reviews');
const popupReviews = document.querySelector('.popup__reviews');
const popupTitle = document.querySelector('.popup__content-title');
const popupText = document.querySelector('.popup__content-text');
const closePopupRev = document.querySelector('.popup__close-reviews');
const overlay = document.querySelector('.overlay');

reviewsList.addEventListener('click', e => {
    let elementRev = e.target;
    var _body = document.getElementsByTagName('body')[0];
    _body.style.overflow = "hidden";

    if (elementRev.tagName === 'A') {
        e.preventDefault();
        const reviewsItem = e.target.closest('.reviews__block');
        const reviewsTitle = reviewsItem.querySelector('.reviews__title').textContent;
        const reviewsText = reviewsItem.querySelector('.reviews__subtitle').textContent;
        popupTitle.innerHTML = reviewsTitle;
        popupText.innerHTML = reviewsText;
        popupReviews.style.display = 'block';
    }
});

//Слайдер
const slides = document.querySelectorAll('.slider .slider__item');
var currentSlide = 0;
var fade = setInterval(nextSlide, 1000);

function nextSlide() {
  goToSlide(currentSlide+1);
 }
 
 function previousSlide() {
  goToSlide(currentSlide-1);
 }
 
 function goToSlide(n) {
  slides[currentSlide].className = 'slider__item';
  currentSlide = (n+slides.length)%slides.length;
  slides[currentSlide].className = 'slider__item slider-active';
 }

var timer = false;
 
function pauseSlideshow() {
    timer = false;
    clearInterval(fade);
}
 
function playSlideshow() {
    timer = false;
}

const rightArrow = document.getElementById('next');
const leftArrow = document.getElementById('prev');
  
  rightArrow.addEventListener('click', () =>{
    pauseSlideshow();
    previousSlide();
  });
  leftArrow.addEventListener('click', () =>{
    pauseSlideshow();
    previousSlide();
  });

// Форма с модалкой 

const mainForm = document.querySelector('#form');
  const orderBtn = mainForm.querySelector('.order__form-button');
  const resetBtn = mainForm.querySelector('.order__form-button-reset');
  const formTrue = mainForm.querySelector('.formoverlay-true');
  const formFalse = mainForm.querySelector('.formoverlay-error');
  const formtruecloseBtn = mainForm.querySelector('.formtrue__close');
  const formFalsecloseBtn = mainForm.querySelector('.formFalse__close');
  
  orderBtn.addEventListener('click', e=> {
    event.preventDefault();
    if (validateForm(mainForm)) {
        const name = mainForm.elements.name.value;
        const phone = mainForm.elements.phone.value;
        const comment = mainForm.elements.comment.value;
        const to = 'webdev@mail.ru';
        var formData = new FormData();
            formData.append('name', name);
            formData.append('phone', phone);
            formData.append('comment', comment);
            formData.append('to', to);
            console.log(formData);
            const xhr = new XMLHttpRequest();
            xhr.responseType = 'json';
            xhr.open('POST', 'https://webdev-api.loftschool.com/sendmail/');
            xhr.send(formData);
            xhr.addEventListener('load', e => {
                if (xhr.response.status) {
                  formTrue.style.display = 'block';    
                } else {
                  formFalse.style.display = 'block';
                }

                formtruecloseBtn.addEventListener('click', function() {
                  event.preventDefault();
                  formTrue.style.display = 'none';
                })

                formTrue.addEventListener('click', function() {
                  event.preventDefault();
                  formTrue.style.display = 'none';
                })

                document.addEventListener('keyup', e => {
                  let keyName = e.keyCode;
                
                  if (keyName === 27) {
                    formTrue.style.display = 'none';
                  }
                })

                formFalsecloseBtn.addEventListener('click', function() {
                  event.preventDefault();
                  formFalse.style.display = 'none';
                })

                formFalse.addEventListener('click', function() {
                  event.preventDefault();
                  formFalse.style.display = 'none';
                })
                
                document.addEventListener('keyup', e => {
                  let keyName = e.keyCode;
                
                  if (keyName === 27) {
                    formFalse.style.display = 'none';
                  }
                })
                
            })
    }
})

function validateForm(mainForm) {
  let valid = true;
  
  if (!validateField(mainForm.elements.name)) {
      valid = false;
  }

  if (!validateField(mainForm.elements.phone)) {
      valid = false;
  }

  if (!validateField(mainForm.elements.comment)) {
      valid = false;
  }

  if (!validateField(mainForm.elements.street)) {
    valid = false;
  }

  if (!validateField(mainForm.elements.home)) {
    valid = false;
  }

  return valid;
}

function validateField(field) {
  if (!field.checkValidity()) {
      field.nextElementSibling.textContent = field.validationMessage;
      return false;
  }
  else {
      field.nextElementSibling.textContent = '';
      return true;
  }
}

const nameForm = document.querySelector('#name');
const phoneForm = document.querySelector('#phone');
const homeForm = document.querySelector('#home');
const floorForm = document.querySelector('#floor');

nameForm.addEventListener('keydown', function(event) {
  let isDigit = true;
  let isDash = false;
  let isControl = false;

  if (event.key >= 0 || event.key <=9) {
    isDigit = false;
  }

  if (event.key == '-') {
    isDash = true;
  }

  if (event.key == 'ArrowLeft' || event.key =='ArrowRight' ||event.key == 'Backspace') {
    isControl = true;
  }

  if (isDigit == false && isDash == false && isControl == false) {
    event.preventDefault();
  }
})

phoneForm.addEventListener('keydown', function(event) {
  let isDigit = false;
  let isDash = false;
  let isControl = false;

  if (event.key >= 0 || event.key <=9) {
    isDigit = true;
  }

  if (event.key == '-') {
    isDash = true;
  }

  if (event.key == 'ArrowLeft' || event.key =='ArrowRight' ||event.key == 'Backspace') {
    isControl = true;
  }

  if (isDigit == false && isDash == false && isControl == false) {
    event.preventDefault();
  }
})

homeForm.addEventListener('keydown', function(event) {
  let isDigit = false;
  let isControl = false;

  if (event.key >= 0 || event.key <=9) {
    isDigit = true;
  }

  if (event.key == 'ArrowLeft' || event.key =='ArrowRight' ||event.key == 'Backspace') {
    isControl = true;
  }

  if (isDigit == false && isControl == false) {
    event.preventDefault();
  }
})

floorForm.addEventListener('keydown', function(event) {
  let isDigit = false;
  let isControl = false;

  if (event.key >= 0 || event.key <=9) {
    isDigit = true;
  }

  if (event.key == 'ArrowLeft' || event.key =='ArrowRight' ||event.key == 'Backspace') {
    isControl = true;
  }

  if (isDigit == false && isControl == false) {
    event.preventDefault();
  }
})
