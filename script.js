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

btnsOpenModal.forEach(btn => {
  btn.addEventListener('click', openModal);
});

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
//////////////////////////////////////////////////////////
///////////////Implementing smooth scrolling
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function (e) {
  console.log(e.target.getBoundingClientRect());
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);
  /////////////to get the scroll bar position
  console.log('Scroll bar position (x/y)', window.scrollX, '/', scrollY);
  ////to get the current window width and height
  console.log(
    'height/width viewport',
    document.documentElement.clientHeight,
    '/',
    document.documentElement.clientWidth
  );

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
  section1.scrollIntoView({ behavior: 'smooth' });
});


////////////////////////////////////////
///////page navigation
document.querySelectorAll('.nav__link').forEach(function(ele) {
  ele.addEventListener('click', function (e) {
    e.preventDefault();
    const id = this.getAttribute('href');
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  });
});



/////////////////////////////////////////////////////
////////////Selecting elements
console.log(document.documentElement);
const header = document.querySelector('header');
header;
const sections = console.log(document.querySelectorAll('.section'));
const button = document.getElementsByTagName('button');
// console.log(button);
const qsButton = document.querySelectorAll('button');
console.log(qsButton);
// console.log(document.getElementsByClassName('section'));

////////////////////////////////////////////////////
///creating and inserting elements
const message = document.createElement('div');
message.classList.add('cookie-message');
message.innerHTML =
  'We use cookies for improved functionality and analytics. <button class ="btn btn--close-cookie"> Got it!</button>';
header.prepend(message);
// header.append(message.cloneNode(true))
header.before(message);

//////////////////////////////////////////////////////
//Deleting elements

const delButton = document.querySelector('.btn--close-cookie');
delButton.addEventListener('click', () => {
  message.remove();
});

/////////////////////////////////////////////////////
///////////setting styles
console.log(getComputedStyle(message).height);
message.style.height =
  Number.parseFloat(getComputedStyle(message).height) + 30 + 'px';

document.documentElement.style.setProperty('--color-primary', 'orangered');
console.log(document.documentElement.style.removeProperty('--color-primary'));

/////////////////////////////////////////////////////
////////////////setting attributes
document.querySelector('.header__img').alt = 'testing';
// document.querySelector('.header__img').className = 'hello'
console.log(document.querySelector('.header__img').getAttribute('class'));

console.log(document.querySelector('.header__img').alt);

//////////////////////////////////////////////////////////
//////////////Data attributes
const img = document.querySelector('.header__img');
// console.log(img.dataset.versionNumber);

// document.querySelector('#section--1').addEventListener('click', function(e){
//   console.log(e.target.getBoundingClientRect());
//   console.log(window.scrollY);
// })

///////////////////////////////////////////////////////
//////////////events and event handlers////////////////

const h1 = document.querySelector('h1');
function h1Alert() {
  console.log('hello');
}
///We can add multiple events by just adding another event listener it won't override below even listener
h1.addEventListener('click', h1Alert);

/////old way of listening to events(not working when i tried)
///if we try to add multiple event listener using below old way it will override below event listener
h1.click = function (e) {
  console.log(getComputedStyle(h1).fontFamily);
  console.log('hello');
};
///to remove an event listener add event listener should point to the reference of function (shouldn't include function by writing anonymous function) and give that function reference to the removeEvnet Listener
h1.removeEventListener('click', h1Alert);

//////////////////////////////////////////////////////////
/////Event propagation and event Bubbling

function randInt(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}
///Generating random color
function randomColor() {
  return `rgba(${randInt(0, 255)}, ${randInt(0, 255)}, ${randInt(0, 255)})`;
}
// console.log(randomColor());
///////attaching event handlers to target nav link and nav links and the whole nav///////////////////////////

////when click event is generated in the nav__link element then along with the action of this nav__link the event attached to it's(nav__link) parent element will be handled in all three places(nav__link, nav__links, nav), so the color of these three changes.
///If click happened on nav__link then all three eventListeners will receive the same event.
//we tried printing e.target in all those 3 eventListeners and they printed the same element which is nav__link because event is generated on this nav__link and the same event is passed to all those other event Listener with click event.
///////////This is because of event Bubbling. event is originated in the below link tag which is nav__link and it bubbles up to its parent element and next parent element and in all of the parent elements we can handle that element
document.querySelector('.nav__link').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  // console.log('link', e.target, e.currentTarget);
  //Stopping event propagation
  //This is not the good idea to stop propagation
  // console.log("1st");
  e.stopPropagation();
});

//attaching click event on the nav__link element

document.querySelector('.nav__link').addEventListener('click', function (e) {
  // console.log("2st");
  // console.log('double clicked');
});

//If the click event is generated on the nav__links then the both current element (nav__links) and its parent element which ever the click event is attached will be handled , so the color of these two(nav__links, nav) changes.
document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  // console.log('container', e.target, e.currentTarget);
});
document.querySelector('.nav').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  // console.log('nav', e.target, e.currentTarget);
});
