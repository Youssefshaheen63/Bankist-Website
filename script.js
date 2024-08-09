'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnOpenModal = document.querySelectorAll('.btn-show-modal');
const header = document.querySelector('.header');

// OverLay With singup modal
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};
const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// Cookies Message
const message = document.createElement('div');
message.classList.add('cookie-message');
message.innerHTML = `We cookied for improved functionality and analytics. 
  <button class="btn btn-close-cookie">Got it!</button>`;
header.before(message);
document
  .querySelector('.btn-close-cookie')
  .addEventListener('click', function () {
    message.remove();
  });

const btnScrollTo = document.querySelector('.btn-scroll-to');
const section1 = document.querySelector('#section-1');

btnScrollTo.addEventListener('click', function (e) {
  // const s1coords = section1.getBoundingClientRect();
  // console.log(s1coords);
  // console.log(e.target.getBoundingClientRect());

  /*
  Current Scroll :
   - console.log(window.pageXOffset);
   - console.log(window.pageYOffset);
  */

  /*
  Width and Height to th current Viewport :
   - console.log(document.documentElement.clientHeight);
   - console.log(document.documentElement.clientHeight);
  */

  // window.scrollTo(
  //   s1coords.left + window.pageXOffset,
  //   s1coords.top + window.pageYOffset
  // );

  // Old School:
  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  section1.scrollIntoView({ behavior: 'smooth' });
});
