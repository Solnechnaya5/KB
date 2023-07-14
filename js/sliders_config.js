
let swiper = new Swiper(".monitoring-slider", {
    // loop: true,
    // autoplay:true,
    slidesPerView: 1,
  pagination: {
    el: ".swiper-pagination",
  },
});


let swiper2 = new Swiper(".projects-slider", {
  loop: true,
  // autoplay:true,
  slidesPerView: 1,
pagination: {
  el: ".swiper-pagination",
},
navigation: {
  nextEl: ".swiper-button-next",
  prevEl: ".swiper-button-prev",
},
});