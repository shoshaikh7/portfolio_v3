const header = document.querySelector('header.container')
const navBar = document.querySelector('#nav-bar');
const navLinks = navBar.querySelectorAll('li');
const navToggle = document.querySelector('#nav-toggle');
const navToggleIcon = document.querySelector('#nav-toggle-icon');
const logo = document.querySelector('#logo');

// Toggle nav
const showNav = () => {
  navBar.setAttribute('data-visible', true);
  navToggle.setAttribute('aria-expanded', true);
  navToggleIcon.classList.remove('fa-bars');
  navToggleIcon.classList.add('fa-xmark');
}

const hideNav = () => {
  navToggle.setAttribute('aria-expanded', false);
  navBar.setAttribute('data-visible', false);
  navToggleIcon.classList.remove('fa-xmark');
  navToggleIcon.classList.add('fa-bars');
}

navToggle.addEventListener('click', () => {
  const visibility = navBar.getAttribute('data-visible');
  if (visibility === 'false') {
    showNav();
  } else {
    hideNav();
  }
});

// Close nav if user clicks outside nav
document.addEventListener('click', (e) => {
  if (e.target.id !== 'nav-bar' && e.target.id !== 'nav-toggle-icon') {    
    hideNav();
  }
});


// Highlight active link on nav
navLinks.forEach(link => {
  link.addEventListener('click', function () {
    navLinks.forEach(li => {
      li.classList.remove('active');
      this.classList.add('active');
    })
  });
})

// Decrease header height on scroll
document.addEventListener('scroll', () => {
  let lastKnownScrollPosition = 0;
  lastKnownScrollPosition = window.scrollY;
  if (lastKnownScrollPosition > 0) {
    header.style.paddingBlock = '0'
    logo.style.marginBlock = '0.5rem';
    navToggle.style.top = '1rem';
  } else {
    header.style.paddingBlock = '1rem 0'
    logo.style.marginBlock = '1rem';
    navToggle.style.top = '2rem';
  }
});