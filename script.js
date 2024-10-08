'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnOpenModal = document.querySelectorAll('.btn-show-modal');
const header = document.querySelector('.header');
const message = document.createElement('div');
const btnScrollTo = document.querySelector('.btn-scroll-to');
const section1 = document.querySelector('#section-1');

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

message.classList.add('cookie-message');
message.innerHTML = `We cookied for improved functionality and analytics. 
  <button class="btn btn-close-cookie">Got it!</button>`;
header.before(message);
document
  .querySelector('.btn-close-cookie')
  .addEventListener('click', function () {
    message.remove();
  });

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

// Page Navigation
// document.querySelectorAll('.nav--link').forEach(function(e){
//   e.addEventListener('click' , function(el){
//     el.preventDefault();

//     const id = this.getAttribute('href');

//     document.querySelector(id).scrollIntoView({behavior: 'smooth'})
//   })
// })

// using event delegation

document.querySelector('.nav--links').addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav--link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

// Building a tabbed component
const tabs = document.querySelectorAll('.operations-tab');
const tabsContainer = document.querySelector('.operations-tab-container');
const tabsContent = document.querySelectorAll('.operations-content');

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations-tab');
  console.log(clicked);

  if (!clicked) return;

  tabs.forEach(e => e.classList.remove('operations-tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations-content--active'));

  clicked.classList.add('operations-tab--active');
  document
    .querySelector(`.operations-content--${clicked.dataset.tab}`)
    .classList.add('operations-content--active');
});

// nice effect on nav
const nav = document.querySelector('.nav');

const handlehover = function (e, opacity) {
  if (e.target.classList.contains('nav--link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav--link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(e => {
      if (e !== link) e.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

nav.addEventListener('mouseover', handlehover.bind(0.5));
nav.addEventListener('mouseout', handlehover.bind(1));

// // Sticky nav

// const initCoords = section1.getBoundingClientRect();

// window.addEventListener('scroll' , function(){
//   if(window.scrollY > initCoords.top){
//     nav.classList.add('sticky')
//   }else{
//     nav.classList.remove('sticky')
//   }
// })

// ---------------------

const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerobserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerobserver.observe(header);

// Reveal Sections

const allSections = document.querySelectorAll('.section');
const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (sec) {
  sectionObserver.observe(sec);
  sec.classList.add('section--hidden');
});

// Lazy Loading images
const imgLoading = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};

const imgTargets = document.querySelectorAll('img[data-src]');
const imgObserver = new IntersectionObserver(imgLoading, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

imgTargets.forEach(function (img) {
  imgObserver.observe(img);
});

// Slider

const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const leftBtn = document.querySelector('.slider-btn--left');
  const rightBtn = document.querySelector('.slider-btn--right');

  let curSlide = 0;
  const maxSlides = slides.length;

  const dotsContainer = document.querySelector('.dots');

  const createDots = function () {
    slides.forEach(function (_, i) {
      dotsContainer.insertAdjacentHTML(
        'beforeend',
        `<button class='dots-dot' data-slide='${i}'></button>`
      );
    });
  };

  const activeDot = function (slide) {
    document
      .querySelectorAll('.dots-dot')
      .forEach(dot => dot.classList.remove('dots-dot--active'));

    document
      .querySelector(`.dots-dot[data-slide='${slide}']`)
      .classList.add('dots-dot--active');
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  const nextSlide = function () {
    if (maxSlides - 1 === curSlide) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activeDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlides - 1;
    } else {
      curSlide--;
    }

    goToSlide(curSlide);
    activeDot(curSlide);
  };
  rightBtn.addEventListener('click', nextSlide);
  leftBtn.addEventListener('click', prevSlide);

  const init = function () {
    goToSlide(0);
    createDots();
    activeDot(0);
  };
  init();

  document.addEventListener('keydown', function (e) {
    e.key === 'ArrowRight' && nextSlide();
    e.key === 'ArrowLeft' && prevSlide();
  });

  dotsContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots-dot')) {
      const { slide } = e.target.dataset;

      goToSlide(slide);
      activeDot(slide);
    }
  });
};

slider();

window.addEventListener('beforeunload', function (e) {
  e.preventDefault();
  e.returnValue = '';
});
