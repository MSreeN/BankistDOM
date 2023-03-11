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