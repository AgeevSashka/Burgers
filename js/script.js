//Меню Бургер

var menu = document.querySelector('.menu-btn');

menu.addEventListener('click', function(e){
  e.preventDefault();
  this.classList.toggle('menu-btn_active');
  
  let nav = document.querySelector('.menu-nav');
  nav.classList.toggle('menu-nav_active');
});
