//Меню Бургер

var toggled = false;
var nav = document.querySelector('.nav');
const btn = document.querySelector('.nav-tgl');

btn.addEventListener('click', function(e){
    let navBurg = document.querySelector('.burger-nav ');
  if (!toggled) {
        toggled = true;
        e.target.classList.add('toggled');
        nav.classList.add('burger-active');
      navBurg.style.opacity = 1;
    } else {
        toggled = false;
        e.target.classList.remove('toggled');
        nav.classList.remove('burger-active');
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


// Модалка отзывы
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
var fade = setInterval(nextSlide, 2000);

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

// Плеер

let player;

function onYouTubeIframeAPIReady() {
  player = new YT.Player("yt-player", {
    width: "660",
    height: "405",
    videoId: "wxsygMrIsmY",
    playerVars: {
      controls: 0,
      disablekb: 0,
      showinfo: 0,
      rel: 0,
      autoplay: 0,
      modestbranding: 0
    },
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange
    }
  });
}

function onPlayerReady(event) {
  const duration = player.getDuration();
  let interval;
  updateTimerDisplay();

  $(".player").removeClass("hidden");

  clearInterval(interval);

  interval = setInterval(() => {
    const completed = player.getCurrentTime();
    const percents = (completed / duration) * 100;

    changeButtonPosition(percents);

    updateTimerDisplay();
  }, 1000);
}

function onPlayerStateChange(event) {
  const playerButton = $(".player__start");
  switch (event.data) {
    case 1:
      $(".player__wrapper").addClass("player__active");
      playerButton.addClass("paused");
      break;
    case 2: 
      playerButton.removeClass("paused");
      break;
  }
}

$(".player__start").on("click", e => {
  const playerStatus = player.getPlayerState(); // 0 - ended, 1 - played, 2 - paused ...

  if (playerStatus !== 1) {
    player.playVideo();
  } else {
    player.pauseVideo();
  }
});


$(".player__playback").on("click", e => {
  e.preventDefault();
  const bar = $(e.currentTarget);
  const newButtonPosition = e.pageX - bar.offset().left;
  const clickedPercents = (newButtonPosition / bar.width()) * 100;
  const newPlayerTime = (player.getDuration() / 100) * clickedPercents;

  changeButtonPosition(clickedPercents);
  player.seekTo(newPlayerTime);
});

$(".player__splash").on("click", e => {
  player.playVideo();
});

function changeButtonPosition(percents) {
  $(".player__playback-button").css({
    left: `${percents}%`
  });
}

function updateTimerDisplay() {
  $(".player__duration-completed").text(formatTime(player.getCurrentTime()));
  $(".player__duration-estimate").text(formatTime(player.getDuration()));
}

function formatTime(time) {
  const roundTime = Math.round(time);

  const minutes = Math.floor(roundTime / 60);
  const seconds = roundTime - minutes * 60;
  const formatedSeconds = seconds < 10 ? `0${seconds}` : seconds;

  return minutes + ":" + formatedSeconds;
}


//OnePageScroll

const sections = $('.section');
const display = $('.mainContent');

let inscroll = false;

const md = new MobileDetect(window.navigator.userAgent);

const isMobile = md.mobile();

const switchActiveClassInsideMenu = menuItemIndex => {
  $('.fixed-menu__item').eq(menuItemIndex).addClass('fixed-menu__item_active').siblings().removeClass('fixed-menu__item_active');
}

const performTransition = sectionEq => {
    if (inscroll) return;

    const sectionEqNum = parseInt(sectionEq);

    inscroll = true;
    
    const position = (sectionEqNum * -100) + '%';

    sections.eq(sectionEq).addClass('active').siblings().removeClass('active');
    
    display.css({
      'transform' : `translateY(${position})`
    });

    setTimeout(() => {
      inscroll = false;
      switchActiveClassInsideMenu(sectionEq);
    }, 1000 + 300); //продолжительность transition + 300ms - время для завершения инерции тачустройств

  };
  

const scrollToSection = direction => {
  const activeSection = sections.filter('.active');
  const nextSection = activeSection.next();
  const prevSection = activeSection.prev();

  if (direction === 'next' && nextSection.length) {
    performTransition(nextSection.index())
  }

  if (direction === 'prev' && prevSection.length) {
    performTransition(prevSection.index())
  }
}

$('.wrapper').on('wheel', e => {
  const deltaY = e.originalEvent.deltaY;

  if (deltaY > 0) {
    scrollToSection('next');
  }

  if (deltaY < 0) {
    scrollToSection('prev');
  }
});

$('.wrapper').on('touchmove', e => {
  e.preventDefault();
});

$(document).on('keydown', e => {
  switch(e.keyCode) {
    case 38: scrollToSection('prev'); break;
    case 40: scrollToSection('next'); break;
  }
});

$('[data-scroll-to]').on('click', e=> {
  e.preventDefault();

  const target = $(e.currentTarget).attr('data-scroll-to');
  performTransition(target);
});

if (isMobile) {
  $(window).swipe({
    swipe: function(event, direction) {
      const nextOrPrev = direction === 'up' ? 'next' : 'prev';
      scrollToSection(nextOrPrev);
    }
  });
}

const hamBtn  = document.querySelector('.nav-tgl');
const popupMenu = document.querySelector('.popup');

hamBtn.addEventListener('click', function(){
  popupMenu.style.display = 'flex';
  document.body.style.overflow = 'hidden';
});

const closeBtn = document.querySelector('.popup__close');
  
closeBtn.addEventListener('click', function() {
  popupMenu.style.display = 'none';
  document.body.style.overflow = '';
});

const popupItem = document.querySelectorAll('.popup__item');

for (i = 0; i < popupItem.length; i++) {
  popupItem[i].onclick = function(){
    popupMenu.style.display = 'none';
    document.body.style.overflow = '';
  };
}
  // Форма с модалкой

 
  const order = document.querySelector('#form');
  const orderBtn = order.querySelector('.order__btn');
  const resetBtn = order.querySelector('.order__reset');
  const formTrue = order.querySelector('.formoverlay-true');
  const formErr = order.querySelector('.formoverlay-error');
  const formtruecloseBtn = order.querySelector('.formtrue__close');
  const formerrcloseBtn = order.querySelector('.formerr__close');
  
  orderBtn.addEventListener('click', e => {
    e.preventDefault();
    if (validateForm(order)) {
        const name = order.elements.name.value;
        const phone = order.elements.phone.value;
        const comment = order.elements.comment.value;
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
                  formErr.style.display = 'block';
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

                formerrcloseBtn.addEventListener('click', function() {
                  event.preventDefault();
                  formErr.style.display = 'none';
                })

                formErr.addEventListener('click', function() {
                  event.preventDefault();
                  formErr.style.display = 'none';
                })
                
                document.addEventListener('keyup', e => {
                  let keyName = e.keyCode;
                
                  if (keyName === 27) {
                    formErr.style.display = 'none';
                  }
                })
                
            })
    }
})

function validateForm(order) {
  let valid = true;
  
  if (!validateField(order.elements.name)) {
      valid = false;
  }

  if (!validateField(order.elements.phone)) {
      valid = false;
  }

  if (!validateField(order.elements.comment)) {
      valid = false;
  }

  if (!validateField(order.elements.street)) {
    valid = false;
  }

  if (!validateField(order.elements.home)) {
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
