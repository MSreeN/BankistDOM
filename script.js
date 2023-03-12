'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach((btn) => {
  btn.addEventListener('click', openModal)
})

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

/////////////////////////////////////////////////////
////////////Selecting elements
console.log(document.documentElement);
const header = document.querySelector('header');header
const sections = console.log(document.querySelectorAll('.section'));
const button = document.getElementsByTagName('button')
// console.log(button);
const qsButton = document.querySelectorAll('button');
console.log(qsButton);
// console.log(document.getElementsByClassName('section'));

////////////////////////////////////////////////////
///creating and inserting elements
const message = document.createElement('div');
message.classList.add('cookie-message');
message.innerHTML = 'We use cookies for improved functionality and analytics. <button class ="btn btn--close-cookie"> Got it!</button>';
header.prepend(message)
// header.append(message.cloneNode(true))
header.before(message)
//////////////////////////////////////////////////////
//Deleting elements

const delButton = document.querySelector('.btn--close-cookie');
delButton.addEventListener('click', ()=>{
  message.remove();
})


/////////////////////////////////////////////////////
///////////setting styles
console.log(getComputedStyle(message).height);
message.style.height = Number.parseFloat(getComputedStyle(message).height) + 30 + 'px';

document.documentElement.style.setProperty('--color-primary', 'orangered');
console.log(document.documentElement.style.removeProperty('--color-primary'));

/////////////////////////////////////////////////////
////////////////setting attributes
document.querySelector('.header__img').alt = "testing"
// document.querySelector('.header__img').className = 'hello'
console.log(document.querySelector('.header__img').getAttribute('class'))

console.log(document.querySelector('.header__img').alt);

 
//////////////////////////////////////////////////////////
//////////////Data attributes
const img = document.querySelector(".header__img");
// console.log(img.dataset.versionNumber);

//////////////////////////////////////////////////////////
///////////////Implementing smooth scrolling

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click',function(e){
  console.log(e.target.getBoundingClientRect());
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);
  /////////////to get the scroll bar position
  console.log("Scroll bar position (x/y)", window.scrollX, "/", scrollY);
  ////to get the current window width and height
  console.log("height/width viewport", document.documentElement.clientHeight, "/", document.documentElement.clientWidth);

  ///Scrolling
  //by adding scrollY to the top makes the position of the section relative to the page top not to the viewport
  //Normal scrolling and old way

  // window.scrollTo(s1coords.left, s1coords.top+scrollY);


  //smooth scrolling (old school way)
  // window.scrollTo({
  //   left: s1coords.left,
  //   top: s1coords.top + scrollY,
  //   behavior: 'smooth'
  // });
 
  //Smooth scrolling (only supported in modern browsers)
  section1.scrollIntoView({behavior: "smooth"})
})

// document.querySelector('#section--1').addEventListener('click', function(e){
//   console.log(e.target.getBoundingClientRect());
//   console.log(window.scrollY);
// })

///////////////////////////////////////////////////////
//////////////events and event handlers////////////////

const h1 = document.querySelector('h1');
h1.addEventListener("click", function(e){
  console.log(getComputedStyle(h1).fontFamily);
})

/////old way of listening to events(not working when i tried)
h1.click = function(e){
 console.log(getComputedStyle(h1).fontFamily)
 console.log('hello');
}