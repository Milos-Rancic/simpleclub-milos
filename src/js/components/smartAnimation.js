import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Import custom styling
import '../../css/components/_smart-animation.scss';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);


gsap.timeline({
  scrollTrigger: {
    trigger: ".circle__content",
    start: "top 80%", // Trigger when the top of .circle__content is 20% from the bottom of the screen
  }
})
  .to(".circle-left", {
    xPercent:  document.documentElement.clientWidth > 767 ? -75 : -75,   
    left: "50%", 
    opacity: 1,
    duration: 1,
    ease: "back.out"
  })
  // Animate circle-right from x: 0 to x: -63%, and opacity from 0 to 1 with back.out ease
  .to(".circle-right", {
    xPercent: document.documentElement.clientWidth > 767 ? 75 : 75,    
    right: "50%", 
    opacity: 1,
    duration: 1,
    ease: "back.out"
  }, "<") // Start at the same time as the previous animation
  .to(".circle-left .circle__animate-heading", {
    x: document.documentElement.clientWidth > 991 ? "-60%" : (document.documentElement.clientWidth >= 767 ? "-55%" : -60),
    duration: 1,
    ease: "ease"
  }, "<") // Animate simultaneously with the circle-left
  .to(".circle-right .circle__animate-heading", {
    x: document.documentElement.clientWidth > 991 ? "60%" : (document.documentElement.clientWidth >= 767 ? "55%" : 60),
    duration: 1,
    ease: "ease"
  }, "<") // Animate simultaneously with the circle-right
  // Animate circle__middle after the circle animations
  .from(".circle__middle", {
    opacity: 0,
    duration: 0.5,
    ease: "power1.out"
  })
  .from(".circle__info", {
    y: 50,
    opacity: 0,
    duration: 0.5,
    stagger: 0.2,
    ease: "power1.out"
  }); 
