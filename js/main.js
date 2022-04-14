const header = document.querySelector('header.container');
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
const formSubmit = document.querySelector('#form-submit');
const errorMessages = document.querySelectorAll('.error');
const successMessage = document.querySelector('#success');

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


// Particle animation on intro
// Credit: Franks laboratory on YouTube 
// https://www.youtube.com/watch?v=d620nV6bp0A
const canvas = document.querySelector('#intro-canvas');
const ctx = canvas.getContext('2d');

// Create animated canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particlesArray;

// get mouse position
let mouse = {
  x: null,
  y: null,
  radius: (canvas.height/80) * (canvas.width/80)
}
window.addEventListener('mousemove', function(e) {
  mouse.x = e.x;
  mouse.y = e.y;
});

// create particle
class Particle {
  constructor(x, y, directionX, directionY, size, color) {
    this.x = x;
    this.y = y;
    this.directionX = directionX;
    this.directionY = directionY;
    this.size = size;
    this.color = color;
  };
  // method to draw individual particle
  draw() {    
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    // change opacity value for circles to be more opaque
    ctx.fillStyle = 'rgba(219, 62, 56, 0.1)';
    ctx.fill();
  };
  // check particle position, check mouse position, move the particle, draw the particle
  update() {
    // check if particle is still within canvas
    if (this.x > canvas.width || this.x < 0) {
      this.directionX = -this.directionX;
    }
    if (this.y > canvas.height || this.y < 0) {
      this.directionY = -this.directionY;
    }
    // check collision detection - mouse pos / particle pos
    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y;
    let distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < mouse.radius + this.size) {
      if (mouse.x < this.x && this.x < canvas.width - this.size * 10) {
        this.x += 5;
        this.directionX = -this.directionX;        
      }
      if (mouse.x > this.x && this.x > this.size * 10) {
        this.x -= 5;
        this.directionX = -this.directionX;        
      }
      if (mouse.y < this.y && this.y < canvas.height - this.size * 10) {
        this.y += 5;        
        this.directionY = -this.directionY;
      } 
      if (mouse.y > this.y && this.y > this.size * 10) {
        this.y -= 5;        
        this.directionY = -this.directionY;
      }
    }
    // move particle
    this.x += 0.5 * this.directionX;
    this.y += 0.5 * this.directionY;
    // draw particle
    this.draw();
  };
};

// create particle array
const init = () => {
  particlesArray = [];
  
  // divide by smaller number for more particles (9000)
  let numberOfParticles = (canvas.height * canvas.width) / 4000;
  for (let i = 0; i < numberOfParticles/2; i++) {
    const size = (Math.random() * 5) + 1;
    let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
    let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
    let directionX = (Math.random() * 5) - 2.5;
    let directionY = (Math.random() * 5) - 2.5;
    let color = '#DB3E38';    

    particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
  }
};

// check if particles are close enough to draw line between them
const connect = () => {
  let opacityValue = 1;
  for (let a = 0; a < particlesArray.length; a++) {
    for (let b = a; b < particlesArray.length; b++) {
      let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x)) + ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
      // divide by smaller number for longer (w/7; h/7)
      if (distance < (canvas.width/3) * (canvas.height/3)) {
        // divide by larger number for opacity to decrease slower (20000)
        opacityValue = 1 - (distance/50000)
        ctx.strokeStyle = 'rgba(219, 62, 56, ' + opacityValue + ')';        
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
        ctx.stroke();
      }
    }
  }
};

// animation loop
const animate = () => {
  requestAnimationFrame(animate);
  ctx.clearRect(0 ,0 ,innerWidth ,innerHeight);
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
  }
  connect();
};
// resize event
window.addEventListener('resize', () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  mouse.radius = ((canvas.height/80) * (canvas.height/80));
  init();
});
// mouse out event
window.addEventListener('mouseout', () => {
  mouse.x = null;
  mouse.y = null;
});

init();
animate();