// Hamburger menu for mobile
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Tabbed interface for Listen & Watch
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');
tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    tabBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    tabContents.forEach(tc => tc.style.display = 'none');
    document.getElementById(btn.dataset.tab).style.display = 'block';
  });
});

// Booking form submission (using Formspree as example)
document.getElementById('booking-form').addEventListener('submit', async function(e) {
  e.preventDefault();
  const form = e.target;
  const data = new FormData(form);
  // Replace with your Formspree endpoint or backend URL
  const endpoint = 'https://formspree.io/f/your-form-id';
  const response = await fetch(endpoint, {
    method: 'POST',
    body: data,
    headers: { 'Accept': 'application/json' }
  });
  const msg = document.getElementById('form-message');
  if (response.ok) {
    msg.textContent = 'Thank you! We’ll be in touch soon.';
    form.reset();
  } else {
    msg.textContent = 'Sorry, there was a problem. Please try again.';
  }
});

// Contact form (same as above, update endpoint)
document.getElementById('contact-form').addEventListener('submit', async function(e) {
  e.preventDefault();
  const form = e.target;
  const data = new FormData(form);
  const endpoint = 'https://formspree.io/f/your-contact-form-id';
  const response = await fetch(endpoint, {
    method: 'POST',
    body: data,
    headers: { 'Accept': 'application/json' }
  });
  const msg = document.getElementById('contact-form-message');
  if (response.ok) {
    msg.textContent = 'Message sent! Thank you.';
    form.reset();
  } else {
    msg.textContent = 'Sorry, there was a problem. Please try again.';
  }
});

// Newsletter signup (optional)
document.getElementById('newsletter-form').addEventListener('submit', async function(e) {
  e.preventDefault();
  const form = e.target;
  const data = new FormData(form);
  // Replace with your newsletter endpoint
  const endpoint = 'https://formspree.io/f/your-newsletter-form-id';
  const response = await fetch(endpoint, {
    method: 'POST',
    body: data,
    headers: { 'Accept': 'application/json' }
  });
  const msg = document.getElementById('newsletter-message');
  if (response.ok) {
    msg.textContent = 'Signed up! Welcome to the list.';
    form.reset();
  } else {
    msg.textContent = 'Sorry, there was a problem. Please try again.';
  }
});