const header = document.querySelector('header.container')
const navBar = document.querySelector('#nav-bar');
const navLinks = navBar.querySelectorAll('li');
const navToggle = document.querySelector('#nav-toggle');
const navToggleIcon = document.querySelector('#nav-toggle-icon');
const logo = document.querySelector('#logo');
const contactForm = document.querySelector("#contact-form");
const formName = document.querySelector('#form-name input');
const formEmail = document.querySelector('#form-email input');
const formSubject = document.querySelector('#form-subject input');
const formMessage = document.querySelector('#form-message textarea');
const formSubmit = document.querySelector('#form-submit')
const errorMessages = document.querySelectorAll('.error');
const successMessage = document.querySelector('#success')

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
    logo.style.marginBlock = '0.5rem';
    logo.style.width = 'min(2rem, 3rem)';
    logo.style.height = 'min(2rem, 3rem)';
    navToggle.style.top = '0.9rem';
    navToggleIcon.style.fontSize = ('1.5rem');
  } else {
    logo.style.marginBlock = '1rem';
    logo.style.width = 'clamp(2rem, 3rem, 4rem)';
    logo.style.height = 'clamp(2rem, 3rem, 4rem)';
    navToggle.style.top = '2rem';
    navToggleIcon.style.fontSize = ('2rem');
  }
});

// Validate form data
const validateForm = (e) => {
  clearMessage();
  let errorFlag = false;
  if (formName.value.length < 1) {
    errorMessages[0].innerText = 'Please enter your name';
    formName.classList.add('error-border');
    errorFlag = true;
  }
  if (!emailIsValid(formEmail.value)) {
    errorMessages[1].innerText = 'Please enter a valid email';
    formEmail.classList.add('error-border');
    errorFlag = true;
  }
  if (formSubject.value.length < 1) {
    errorMessages[2].innerText = 'Please enter a subject';
    formSubject.classList.add('error-border');
    errorFlag = true;
  }
  if (formMessage.value.length < 1) {
    errorMessages[3].innerText = 'Please enter your message';
    formMessage.classList.add('error-border');
    errorFlag = true;
  }
  if (!errorFlag) {
    contactForm.style.display = 'none';
    successMessage.style.display = 'block';
    successMessage.innerText = 'Message Sent! Thanks for reaching out, I\'ll get back to you as soon as I can.'
    setTimeout(() => {
      contactForm.submit();
    }, 3000);
  }
}

// Check if email is valid
const emailIsValid = (email) => {
  let pattern = /\S+@\S+\.\S+/;
  return pattern.test(email);
}

// Clear error/success message
const clearMessage = () => {
  for (let i = 0; i < errorMessages.length; i++) {
    errorMessages[i].innerText = '';
  }
  successMessage.innerText = '';
  formName.classList.remove('error-border');
  formEmail.classList.remove('error-border');
  formSubject.classList.remove('error-border');
  formMessage.classList.remove('error-border');
}