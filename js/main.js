const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.style.boxShadow = window.scrollY > 10
    ? '0 4px 24px rgba(13,45,107,0.15)'
    : '0 2px 16px rgba(13,45,107,0.10)';
}, { passive: true });

const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
hamburger.addEventListener('click', () => mobileMenu.classList.toggle('open'));
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
revealEls.forEach(el => observer.observe(el));

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      window.scrollTo({ top: target.getBoundingClientRect().top + window.pageYOffset - 80, behavior: 'smooth' });
    }
  });
});

function animateCounter(el, target, prefix, suffix) {
  const duration = 1400;
  const start = performance.now();
  function update(now) {
    const eased = 1 - Math.pow(1 - Math.min((now - start) / duration, 1), 3);
    el.textContent = prefix + Math.floor(eased * target) + suffix;
    if (eased < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

const benefitsSection = document.getElementById('benefits');
let countersRun = false;
new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting && !countersRun) {
    countersRun = true;
    const els = benefitsSection.querySelectorAll('.stat-number');
    [
      { el: els[0], val: 18, pre: '−', suf: '%' },
      { el: els[1], val: 3,  pre: '',  suf: 'x' },
      { el: els[2], val: 5,  pre: '',  suf: 'h' },
      { el: els[3], val: 92, pre: '+', suf: '%' },
    ].forEach(({ el, val, pre, suf }) => el && animateCounter(el, val, pre, suf));
  }
}, { threshold: 0.3 }).observe(benefitsSection);