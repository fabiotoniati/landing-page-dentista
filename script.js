// =============================================
// NAVBAR – scroll effect + mobile menu
// =============================================
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

// =============================================
// HERO PARTICLES
// =============================================
(function createParticles() {
  const container = document.getElementById('particles');
  const count = 22;
  const colors = ['#3b82f6', '#a78bfa', '#06b6d4', '#f59e0b'];

  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.classList.add('particle');
    const size = Math.random() * 6 + 2;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const left = Math.random() * 100;
    const duration = Math.random() * 20 + 15;
    const delay = Math.random() * 20;

    p.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      background: ${color};
      left: ${left}%;
      bottom: -20px;
      animation-duration: ${duration}s;
      animation-delay: -${delay}s;
    `;
    container.appendChild(p);
  }
})();

// =============================================
// SCROLL ANIMATIONS (IntersectionObserver)
// =============================================
const animateTargets = document.querySelectorAll(
  '.treatment-card, .testimonial-card, .credential, .info-card, .sobre-content, .sobre-visual, .section-header'
);

animateTargets.forEach(el => el.classList.add('fade-up'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, 80 * (Array.from(animateTargets).indexOf(entry.target) % 4));
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

animateTargets.forEach(el => observer.observe(el));

// =============================================
// TESTIMONIALS – simple auto-scroll on mobile
// =============================================
let testimonialIndex = 0;
const track = document.getElementById('testimonials-track');
const dots = document.querySelectorAll('.dot');

function goToTestimonial(index) {
  testimonialIndex = index;
  dots.forEach((d, i) => d.classList.toggle('active', i === index));
  const cards = track.querySelectorAll('.testimonial-card');
  if (cards[index]) {
    track.scrollTo({
      left: cards[index].offsetLeft - track.offsetLeft,
      behavior: 'smooth'
    });
  }
}
window.goToTestimonial = goToTestimonial;

// Sync dots on manual scroll
track.addEventListener('scroll', () => {
  const index = Math.round(track.scrollLeft / track.offsetWidth);
  if (index !== testimonialIndex && index >= 0 && index < dots.length) {
    testimonialIndex = index;
    dots.forEach((d, i) => d.classList.toggle('active', i === index));
  }
});

// Auto-advance testimonials on mobile every 4s
let testimonialTimer = setInterval(() => {
  if (window.innerWidth <= 768) {
    testimonialIndex = (testimonialIndex + 1) % 4;
    goToTestimonial(testimonialIndex);
  }
}, 4000);

// =============================================
// CONTACT FORM – basic submit handler
// =============================================
const form = document.getElementById('contato-form');
const submitBtn = document.getElementById('submit-btn');
const formSuccess = document.getElementById('form-success');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  // Simple validation
  const nome = document.getElementById('nome').value.trim();
  const telefone = document.getElementById('telefone').value.trim();
  const email = document.getElementById('email').value.trim();

  if (!nome || !telefone || !email) {
    shake(form);
    return;
  }

  // Simulate sending
  submitBtn.textContent = 'Enviando...';
  submitBtn.disabled = true;
  submitBtn.style.opacity = '0.7';

  setTimeout(() => {
    submitBtn.style.display = 'none';
    formSuccess.classList.add('visible');
    form.reset();

    setTimeout(() => {
      formSuccess.classList.remove('visible');
      submitBtn.style.display = '';
      submitBtn.textContent = 'Enviar Agendamento';
      submitBtn.disabled = false;
      submitBtn.style.opacity = '1';
    }, 5000);
  }, 1400);
});

function shake(el) {
  el.style.animation = 'none';
  el.offsetHeight; // reflow
  el.style.animation = 'shake 0.4s ease';
  setTimeout(() => { el.style.animation = ''; }, 420);
}

// Shake keyframes injection
const style = document.createElement('style');
style.textContent = `
  @keyframes shake {
    0%,100% { transform: translateX(0); }
    20%      { transform: translateX(-8px); }
    40%      { transform: translateX(8px); }
    60%      { transform: translateX(-5px); }
    80%      { transform: translateX(5px); }
  }
`;
document.head.appendChild(style);

// =============================================
// PHONE MASK
// =============================================
const phoneInput = document.getElementById('telefone');
phoneInput.addEventListener('input', (e) => {
  let v = e.target.value.replace(/\D/g, '');
  if (v.length > 11) v = v.slice(0, 11);
  if (v.length > 6) {
    v = `(${v.slice(0,2)}) ${v.slice(2,7)}-${v.slice(7)}`;
  } else if (v.length > 2) {
    v = `(${v.slice(0,2)}) ${v.slice(2)}`;
  } else if (v.length > 0) {
    v = `(${v}`;
  }
  e.target.value = v;
});

// =============================================
// ACTIVE NAV LINK on scroll
// =============================================
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) current = s.id;
  });
  document.querySelectorAll('.nav-links a, .footer-nav a').forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
  });
});
