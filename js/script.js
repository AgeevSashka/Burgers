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
