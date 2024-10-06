// Import Swiper JS and modules
import Swiper from 'swiper';
import { Pagination } from 'swiper/modules';
import { Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// Import custom styling
import '../../css/components/_testimonial-slider.scss';

let testimonialSlider = null;

// Function to initialize the Swiper with responsive settings
function initTestimonialSlider() {
  const screenWidth = window.innerWidth;

  if (testimonialSlider) {
    testimonialSlider.destroy(); // Destroy existing Swiper instance before reinitializing
  }

  testimonialSlider = new Swiper('.swiper', {
    modules: [Pagination, Navigation],
    direction: 'horizontal',
    slidesPerView: screenWidth < 767 ? 1 : screenWidth < 991 ? 2 : 3,
    spaceBetween: screenWidth < 767 ? 16 : 32,
    loop: false,
    preventClicks: false,
    preventClicksPropagation: false,
    pagination: {
      el: ".testimonial-pagination",
      clickable: true
    },
    navigation: {
        nextEl: ".testimonial-button-next",
        prevEl: ".testimonial-button-prev",
    },
  });
}



initTestimonialSlider();

// Initialize Swiper on page load


// Add an event listener for window resize to reinitialize Swiper with updated settings
window.addEventListener('resize', function() {
  initTestimonialSlider();
});
