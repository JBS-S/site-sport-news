
"use strict";

document.addEventListener("DOMContentLoaded", () => {
   initMenu();
   initSliders();
});




function initMenu() {
   const html = document.documentElement;
   const body = document.body;
   const icon = document.querySelector(".icon-menu");
   const menu = document.querySelector(".menu");


   if (!icon || !menu) return;

   const openMenu = () => {
      html.classList.add("open-menu");
      body.classList.add("scroll-lock");
   };

   const closeMenu = () => {
      html.classList.remove("open-menu");
      body.classList.remove("scroll-lock");

   };

   const toggleMenu = () => {
      html.classList.contains("open-menu") ? closeMenu() : openMenu();
   };

   icon.addEventListener("click", toggleMenu);

   document.addEventListener("click", (e) => {
      const isInsideMenu = e.target.closest(".menu");
      const isBurger = e.target.closest(".icon-menu");

      if (!isInsideMenu && !isBurger) {
         closeMenu();
      }

      const link = e.target.closest(".menu a[href^='#']");
      if (!link) return;

      const href = link.getAttribute("href");
      if (!href || href === "#") return;

      const target = document.querySelector(href);
      if (!target) return;

      closeMenu();
   });

   document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeMenu();
   });
}


function initSliders() {

   if (document.querySelector('.slider-featured-news')) {

      const swiper = new Swiper('.slider-featured-news', {
         loop: true,
         navigation: {
            nextEl: '.slider-arrow--right',
            prevEl: '.slider-arrow--left',
         },

         on: {
            init: function () {
               initPagination(this);
               updatePagination(this);
            },
            slideChange: function () {
               updatePagination(this);
            }
         }
      });

      document.addEventListener('click', (e) => {
         const btn = e.target.closest('.swiper-pagination-btn');
         if (!btn || btn.dataset.index === undefined) return;

         swiper.slideToLoop(Number(btn.dataset.index));
      });

      if (document.querySelector('.slider-articles')) {
         const sliderArticles = new Swiper('.slider-articles', {
            loop: true,
            navigation: {
               nextEl: '.slider-arrow--right',
               prevEl: '.slider-arrow--left',
            },
            breakpoints: {
               320: {
                  slidesPerView: 1,
                  spaceBetween: 15,
               },

               480: {
                  slidesPerView: 1.5,
                  spaceBetween: 20,
               },

               778: {
                  slidesPerView: 2,
                  spaceBetween: 25,
               },

               992: {
                  slidesPerView: 3,
                  spaceBetween: 30,
               },
            },
         });
      }
   }
}


function initPagination(swiper) {
   const buttons = document.querySelectorAll('.swiper-pagination-btn');

   buttons.forEach((btn, i) => {
      btn.dataset.slot = i;
   });
}


function updatePagination(swiper) {

   const current = swiper.realIndex + 1;
   const total = swiper.slides.length;

   const buttons = document.querySelectorAll('.swiper-pagination-btn');

   const maxVisible = buttons.length;
   const half = Math.floor(maxVisible / 2);

   let start = current - half;

   if (start < 1) start = 1;
   if (start + maxVisible - 1 > total) {
      start = total - maxVisible + 1;
   }

   buttons.forEach((btn, i) => {

      const page = start + i;

      if (page <= total) {
         btn.textContent = page;
         btn.dataset.index = page - 1;
         btn.style.display = "flex";

         btn.classList.toggle('is-active', page === current);

      } else {
         btn.style.display = "none";
      }
   });
}


