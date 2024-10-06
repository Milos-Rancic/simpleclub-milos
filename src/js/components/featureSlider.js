import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);


/***********************************************************************
 This animation trigers a click event
 on a first tab when the "tabs-features" element is scrolled in the view
 on each click we first loop throung all the tabs and stop any curent ongoing animations (kill())
 and then create a new timeline for the tab that is being clicked
 When the animation is finished, we triger a click on the next sibling tab
 if there are not sibling tabs, we triger a click on the first tab
 Also when the '.tabs-features' element leaves the view port we stop and reset all animations
***********************************************************************/
let currentIndex = 0;
let isAnimating = false;

const tabsFeatures = document.querySelector('.tabs-features');
const tabLinks = document.querySelectorAll('.c-autotabs_menu .c-autotabs_link');

// Function to reset all .c-autotabs_load elements to 0% height
function resetTabLoads() {
  tabLinks.forEach(link => {
    const loadElement = link.querySelector('.c-autotabs_load');
    gsap.set(loadElement, { height: '0%' });
  });
}

// Function to stop any running animation on a tab
function stopAnimation() {
  isAnimating = false;
  tabLinks.forEach(link => {
    // Check if the tab has a running timeline stored
    if (link.timeline) {
      link.timeline.kill(); // Kill the specific timeline
      link.timeline = null; // Reset the timeline reference
    }
  });
}

// Function to handle manual tab click
tabLinks.forEach((tab, index) => {
  tab.addEventListener('click', function () {
    // Stop all existing animations
    stopAnimation();
    resetTabLoads();

    // Set the clicked tab as the current index
    currentIndex = index;

    // Animate the clicked tab's load element
    const loadElement = tab.querySelector('.c-autotabs_load');

    // Create a new timeline and store it on the clicked tab
    tab.timeline = gsap.timeline();
    tab.timeline.fromTo(
      loadElement,
      { height: '0%' },
      {
        height: '100%',
        duration: 10, 
        ease: 'none',
        onComplete: function () {
          gsap.set(loadElement, { height: '0%' });
          // Move to the next tab after manual tab animation finishes
          const nextIndex = currentIndex + 1;
          if (nextIndex < tabLinks.length) {
            tabLinks[nextIndex].click(); // Trigger click on the next tab
          } else {
            tabLinks[0].click();
          }
        }
      }
    );
  });
});

// ScrollTrigger to handle pause/resume when tabs-features is in/out of view
ScrollTrigger.create({
  trigger: tabsFeatures,
  start: 'top center', // When the top of tabs-features reaches the center of the viewport
  end: 'bottom center', // When the bottom of tabs-features reaches the center of the viewport
  onEnter: function () {
    if (!isAnimating) {
      isAnimating = true;
      // Simulate clicking on the first tab to start the animation
      tabLinks[0].click(); // Trigger click on the first tab when it enters the viewport
    }
  },
  onLeave: function () {
    // Pause the animation when it leaves the viewport
    stopAnimation();
  },
  onEnterBack: function () {
    if (!isAnimating) {
      isAnimating = true;
      // Simulate clicking on the first tab when scrolled back into view
      tabLinks[0].click();
    }
  },
});
