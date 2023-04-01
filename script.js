'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const tabs = document.querySelectorAll('.operations__tab');
const tabContainer = document.querySelector('.operations__tab-container');
const tabContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');

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

// document.querySelectorAll('.nav__link').forEach(function(ele) {
//   ele.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

//Instead of adding click function to every nav like we did above, we make use of event delegation where we will attach that click function to parent element which is common to all navigation anchor tags like ".nav__links".
// so when we click on the any of the nav element it will cause click event and that event will bubble up to the top of the document and in the way we have parent element of nav__link which is "nav__links" click event function will execute in the bubbling phase.
// We were able to navigate to the respective section when clicked on the respective nav__link by using e.target, this will give the target element on which click event is generated and which caused the click event function in the parent element nav__links to execute during the bubbling phase and we are getting the section id which is hard coded in the html and set the "scrollIntoView" on that particular e.target element.

document.querySelector('.nav__links').addEventListener('click', e => {
  e.preventDefault();
  const id = e.target.getAttribute('href');
  //Matching technique
  if (e.target.classList.contains('nav__link')) {
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

////////////////////////////////////////////////////////
/////////////////////Tabbed Component

console.log(tabContainer);
tabContainer.addEventListener('click', function (e) {
  const className = e.target.closest('.operations__tab');
  // console.log(className);
  //Guard clause
  if (!className) return;

  // className.tagName === "SPAN"? console.log(className.parentElement): console.log(className);

  /////putting other buttons  down when clicked a button
  tabs.forEach(tab => {
    tab.classList.remove('operations__tab--active');
  });
  className.classList.toggle('operations__tab--active');

  /////displaying content based on button clicked
  ////using data attribute
  const dataTab = className.dataset.tab;
  //Removing active class from all contents
  // active class set display to grid which was previously none
  tabContent.forEach(content => {
    content.classList.remove('operations__content--active');
  });
  //adding active class to respective content make changing display of that content to grid.
  document
    .querySelector(`.operations__content--${dataTab}`)
    .classList.add('operations__content--active');
});

/////////////////////////////////////////////////////////
//////////Menu fade animation
//using event delegation

function handleHover(e) {
  //we can access e here because js provides this parameter to the function and any handler function can ever have one real argument which is e and we are able to access capacity with the help of this(first argument to bind) which is not really an argument.
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    // console.log(link);
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    // console.log(siblings);
    const logo = link.closest('nav').querySelector('.nav__logo');
    siblings.forEach(ele => {
      if (ele !== link) {
        ele.style.opacity = this;
      }
    });
    logo.style.opacity = this;
  }
}
//50% wil become this(because first argument will be this to bind function, this is the element that this event listener attached to , but here we manually set the this keyword to 50 and 100), and can be accessed using this.
//passing an argument into handler
nav.addEventListener('mouseover', handleHover.bind('50%'));

nav.addEventListener('mouseout', handleHover.bind('100%'));

/////////////////////////////////////////////////////////
///////////////making navigation sticky

btnScrollTo.addEventListener('mouseover', function (e) {
  // console.log(section1.getBoundingClientRect());
});

window.addEventListener('scroll', function (e) {
  let s1coords = section1.getBoundingClientRect();
  //if(s1coords.y <= 0 )-- this also works
  if (window.scrollY > s1coords.top + this.window.scrollY) {
    // nav.classList.add('sticky');
  } else {
    // nav.classList.remove('sticky');
  }
});

////////////////////////////////////////////////////
/////////////Intersection observer api
///This callback will be called when target element is moving into the root and moving out of the root.
const header = document.querySelector('header');
header;
const obsCallBack = (entries, observer) => {
  //entries are the array of threshold entries.
  //same as entries[0]
  const [entry] = entries;
  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
    // console.log(nav.offsetHeight);
  } else {
    nav.classList.remove('sticky');
  }
  // if(entries.)
};

const obsOptions = {
  root: null, // if null then root will be viewport
  //threshold is the amount / percentage of the target element that should be visible within the root element(viewport here), if this condition satisfies then the callback will be executed.
  //what i understood is when the mentioned threshold value is satisfied that means when 0 percent or more than 0 percent is visible in root element callback function gets executed and isIntersecting is set to true and when less than mentioned threshold value is visible in root element then isIntersecting is set to false
  threshold: [0],
  //should be specified in px/%
  rootMargin: `-${nav.offsetHeight}px`,
};

////create new intersection observer
const observer = new IntersectionObserver(obsCallBack, obsOptions);
//observing target element
observer.observe(header);

//////////Revealing elements on scroll
const allSections = document.querySelectorAll('.section');
console.log(allSections);
//In this function we also need observer because here we are selecting multiple sections which is not like single nav element which we did earlier (there we didn't use observer), we can get the details of the target that is currently in the view port from this observer that is generated when target entered root.
function revealSection(entries, observer) {
  const [entry] = entries;
  // console.log(entry);
  if (entry.isIntersecting) {
    entry.target.classList.remove('section--hidden');
    observer.unobserve(entry.target);
  } else {
    entry.target.classList.add('section--hidden');
  }
}

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.1,
});

allSections.forEach(section => {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

////////////////////////////////////////////////////////////////////////////Lazy loading images
const imgTargets = document.querySelectorAll('.features__img');
console.log(imgTargets);

function revealImg(entries, observer) {
  const [entry] = entries;
  console.log(entry);
  if(entry.isIntersecting){
    //There's a bug with the line below.
    //The bug is we are removing the blur class right when the img enters viewport and then replacing the image(this replacing the image happens in the background , js finds the image it should replace and replaces it).If the users internet is very slow that it can't load the high quality image like the one we are replacing here it will take some time to load but we are removing the class before loading the img, if real image isn't loaded then which means user can still see the poor quality image because we removed the blur class, this will make the website look bad

    // entry.target.classList.remove('lazy-img');

    entry.target.src = entry.target.dataset.src;

    // So what should we do here is to remove the blur class when load event is generated, js will emit load event once it finished loading image.
    //We will listen for the event and do something which here is removing blur class.
    entry.target.addEventListener('load', function(e){
      entry.target.classList.remove('lazy-img')
    })
    observer.unobserve(entry.target)
  }
}

const imgObserver = new IntersectionObserver(revealImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px'
});

imgTargets.forEach(img => imgObserver.observe(img));

/////////////////////////////////////////////////////
////////////Selecting elements
// console.log(document.documentElement);

// const sections = console.log(document.querySelectorAll('.section'));
const button = document.getElementsByTagName('button');
// console.log(button);
const qsButton = document.querySelectorAll('button');
// console.log(qsButton);
// console.log(document.getElementsByClassName('section'));

////////////////////////////////////////////////////
///creating and inserting elements
const message = document.createElement('div');
// message.classList.add('cookie-message');
message.innerHTML =
  'We use cookies for improved functionality and analytics. <button class ="btn btn--close-cookie"> Got it!</button>';
// header.prepend(message);
// header.append(message.cloneNode(true))
// header.before(message);
// setTimeout(function(){
//   message.style.display = "none";
// }, 1000)

//////////////////////////////////////////////////////
//Deleting elements

// const delButton = document.querySelector('.btn--close-cookie');
// delButton.addEventListener('click', () => {
//   message.remove();
// });

/////////////////////////////////////////////////////
///////////setting styles
// console.log(getComputedStyle(message).height);
message.style.height =
  Number.parseFloat(getComputedStyle(message).height) + 30 + 'px';

// document.documentElement.style.setProperty('--color-primary', 'orangered');
// console.log(document.documentElement.style.removeProperty('--color-primary'));

/////////////////////////////////////////////////////
////////////////setting attributes
document.querySelector('.header__img').alt = 'testing';
// document.querySelector('.header__img').className = 'hello'
// console.log(document.querySelector('.header__img').getAttribute('class'));

// console.log(document.querySelector('.header__img').alt);

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
///to remove an event listener add event listener should point to the reference of function (shouldn't include function by writing anonymous function) and give that function reference to the removeEvent Listener
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

//////////////////commented out
// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   // this.style.backgroundColor = randomColor();
//   // console.log('link', e.target, e.currentTarget);
//   //Stopping event propagation
//   //This is not the good idea to stop propagation
//   // console.log("1st");
//   e.stopPropagation();
// });

//attaching click event on the nav__link element

//////////////////commented out
// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   // console.log("2st");
//   // console.log('double clicked');
// });

//If the click event is generated on the nav__links then the both current element (nav__links) and its parent element which ever the click event is attached will be handled , so the color of these two(nav__links, nav) changes.
document.querySelector('.nav__links').addEventListener('click', function (e) {
  // this.style.backgroundColor = randomColor();
  // console.log('container', e.target, e.currentTarget);
});
document.querySelector('.nav').addEventListener('click', function (e) {
  // this.style.backgroundColor = randomColor();
  // console.log('nav', e.target, e.currentTarget);
});

////////////////////////////////////////////////////
////////////////////////DOM Traversing

console.log(h1.querySelectorAll('.highlight'));
/////to get all the children
const sp = document.createElement('span');
sp.textContent = 'hello';
// console.log(h1.childNodes);
// h1.firstElementChild.style.color = "white"
// h1.children[2].style.color = "white"

/////////////////Going upwards: parents
console.log(h1.parentElement);
console.log(h1.closest('.smp'));

////////////////////getting siblings

console.log(h1.previousElementSibling);
const child = h1.parentElement.children;
console.log(child);
[...child].forEach(ele => {
  if (ele !== h1) {
    // ele.style.backgroundColor = "red"
  }
});
