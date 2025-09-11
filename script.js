// Hamburger menu for mobile
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  // Close menu when a nav link is clicked
  const menuAnchors = navLinks.querySelectorAll('a');
  menuAnchors.forEach((anchor) => {
    anchor.addEventListener('click', () => {
      navLinks.classList.remove('open');
    });
  });

  // Close menu when clicking outside of it
  document.addEventListener('click', (event) => {
    const clickedElement = event.target;
    const clickedInsideMenu = navLinks.contains(clickedElement);
    const clickedToggle = navToggle.contains(clickedElement);
    if (navLinks.classList.contains('open') && !clickedInsideMenu && !clickedToggle) {
      navLinks.classList.remove('open');
    }
  });

  // Close menu when resizing to desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth > 700) {
      navLinks.classList.remove('open');
    }
  });
}

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
const bookingFormEl = document.getElementById('booking-form');
if (bookingFormEl) {
  bookingFormEl.addEventListener('submit', async function(e) {
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
}

// Contact form (same as above, update endpoint)
const contactFormEl = document.getElementById('contact-form');
if (contactFormEl) {
  contactFormEl.addEventListener('submit', async function(e) {
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
}

// Newsletter signup (optional)
const newsletterFormEl = document.getElementById('newsletter-form');
if (newsletterFormEl) {
  newsletterFormEl.addEventListener('submit', async function(e) {
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
}

// Handle member card expansion - click anywhere on card to expand
const memberCards = document.querySelectorAll('.member-card');
memberCards.forEach(card => {
  card.addEventListener('click', function(e) {
    // Don't expand if clicking on social links
    if (e.target.closest('.social-links')) {
      return;
    }
    
    const isExpanded = card.classList.contains('expanded');
    
    // Check if any other cards are expanded
    const otherExpandedCard = Array.from(memberCards).find(otherCard => 
      otherCard !== card && otherCard.classList.contains('expanded')
    );
    
    // Check if switching between bios
    const isSwitching = otherExpandedCard && !isExpanded;
    
    // Add switching class for smooth transition
    if (isSwitching) {
      card.classList.add('switching');
    }
    
    // Close all other expanded cards first
    memberCards.forEach(otherCard => {
      if (otherCard !== card && otherCard.classList.contains('expanded')) {
        otherCard.classList.remove('expanded');
      }
    });
    
    // Toggle current card with optimized timing
    if (isExpanded) {
      // Immediate close for instant response
      card.classList.remove('expanded');
      
      // Scroll back to center of members section when closing
      setTimeout(() => {
        const membersSection = document.querySelector('.members-section');
        const headerHeight = document.querySelector('header').offsetHeight;
        const scrollTarget = membersSection.offsetTop - headerHeight - 50;
        
        window.scrollTo({
          top: scrollTarget,
          behavior: 'smooth'
        });
      }, 200);
    } else {
      // Different timing for switching vs opening fresh
      const delay = isSwitching ? 100 : 50;
      
      setTimeout(() => {
        card.classList.add('expanded');
        card.classList.remove('switching');
        
        // Move expanded card to top of grid with smooth transition
        const grid = document.querySelector('.members-grid');
        setTimeout(() => {
          grid.insertBefore(card, grid.firstChild);
        }, isSwitching ? 100 : 50);
        
        // Smooth scroll to show the expanded bio
        setTimeout(() => {
          const cardRect = card.getBoundingClientRect();
          const headerHeight = document.querySelector('header').offsetHeight;
          const scrollTarget = window.pageYOffset + cardRect.top - headerHeight - 20;
          
          window.scrollTo({
            top: scrollTarget,
            behavior: 'smooth'
          });
        }, isSwitching ? 150 : 100);
      }, delay);
    }
  });
});

// Modern animations and interactions
document.addEventListener('DOMContentLoaded', function() {
  // Advanced Intersection Observer for scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        
        // Stagger animations for child elements
        const children = entry.target.querySelectorAll('.member-card, .about-text, .about-photo');
        children.forEach((child, index) => {
          setTimeout(() => {
            child.style.opacity = '1';
            child.style.transform = 'translateY(0)';
          }, index * 150);
        });
      }
    });
  }, observerOptions);

  // Add scroll animations to sections
  const animatedElements = document.querySelectorAll('section');
  animatedElements.forEach(el => {
    observer.observe(el);
  });

  // Enhanced member card animations
  const memberCards = document.querySelectorAll('.member-card');
  memberCards.forEach((card, index) => {
    // Initial state
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    
    // Staggered entrance
    setTimeout(() => {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, index * 100);
  });

  // Smooth scroll for navigation links with offset
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });

  // Enhanced form loading animations
  const forms = document.querySelectorAll('#booking-form, #contact-form');
  forms.forEach(form => {
    form.addEventListener('submit', function() {
      const button = this.querySelector('button[type="submit"]');
      const originalText = button.textContent;
      
      button.textContent = 'Sending...';
      button.classList.add('loading');
      button.style.pointerEvents = 'none';
      
      // Reset after 3 seconds
      setTimeout(() => {
        button.textContent = originalText;
        button.classList.remove('loading');
        button.style.pointerEvents = 'auto';
      }, 3000);
    });
  });




  // Enhanced hover effects for interactive elements
  const interactiveElements = document.querySelectorAll('.member-card, .social-icons a');
  interactiveElements.forEach(el => {
    el.classList.add('interactive-hover');
  });


  // Add scroll progress indicator
  const progressBar = document.createElement('div');
  progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 3px;
    background: linear-gradient(90deg, var(--primary), var(--secondary));
    z-index: 9999;
    transition: width 0.1s ease;
  `;
  document.body.appendChild(progressBar);

  window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    progressBar.style.width = scrolled + '%';
  });
});
