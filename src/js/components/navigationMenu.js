// Import custom styling
import '../../css/components/_navigation-menu.scss';


/*****************************************************
 code for opening and closing the main menu
*****************************************************/
let hamburgerBtn = document.querySelector('.b2b_navbar-hamburger')
let isMenuOpen = false;

if(hamburgerBtn){
  hamburgerBtn.addEventListener('click', function() {
    document.querySelector('.b2b-nav-menu').classList.toggle('menu-open');

    isMenuOpen = !isMenuOpen;
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction= "none";
      document.body.style.position= "fixed";  
    } else {
        document.body.style.overflow = 'auto';
        document.body.style.touchAction= "auto";
        document.body.style.position= "static"; 
    }
  });
}

function closemenu(){
  if (window.innerWidth > 991) {
    document.querySelector('.b2b-nav-menu').classList.remove('menu-open');
    document.body.style.overflow = 'auto';
    document.body.style.touchAction= "auto";
    document.body.style.position= "static"; 
  }

}
window.addEventListener('resize', closemenu);

/*****************************************************
 main menu dropdown links
 on desktop we add class 'menu-dropdown-open' on hover
 and on tablet / mobile we add class on click
*****************************************************/
function setDropdownEventListeners() {
  const dropdowns = document.querySelectorAll('.b2b-dropdown-wrapper');
  
  dropdowns.forEach(accordion => {
    // Remove existing event listeners before adding new ones
    accordion.removeEventListener('click', toggleDropdownOnClick);
    accordion.removeEventListener('mouseenter', toggleDropdownOnHover);
    accordion.removeEventListener('mouseleave', toggleDropdownOnHover);

    if (window.matchMedia('(max-width: 991px)').matches) {
      // Screen size 991px or smaller: use click event
      accordion.addEventListener('click', toggleDropdownOnClick);
    } else {
      // Screen size larger than 991px: use hover event
      accordion.addEventListener('mouseenter', toggleDropdownOnHover);
      accordion.addEventListener('mouseleave', toggleDropdownOnHover);
    }
  });
}

function toggleDropdownOnClick(e) {
  const currentItem = e.currentTarget;

  if (currentItem.classList.contains('menu-dropdown-open')) {
    currentItem.classList.remove('menu-dropdown-open');
  } else {
    let opened = document.querySelectorAll('.menu-dropdown-open');
    if (opened.length > 0) {
      opened.forEach(el => el.classList.remove('menu-dropdown-open'));
      
      setTimeout(() => currentItem.classList.add('menu-dropdown-open'), 500);
    } else {
      currentItem.classList.add('menu-dropdown-open');
    }
  }
}

function toggleDropdownOnHover(e) {
  const currentItem = e.currentTarget;

  if (e.type === 'mouseenter') {
    currentItem.classList.add('menu-dropdown-open');
  } else if (e.type === 'mouseleave') {
    currentItem.classList.remove('menu-dropdown-open');
  }
}

// Run the function on page load
setDropdownEventListeners();

// Update listeners on screen resize
window.addEventListener('resize', setDropdownEventListeners);
