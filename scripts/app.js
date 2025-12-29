// App Logic

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initScrollReveal();
    initSmoothScroll();
});

/* -------------------
   Navigation Handler
   ------------------- */
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    // Sticky Navbar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    hamburger.addEventListener('click', () => {
        // Simple toggle implementation
        // ideally we would add a 'show' class in CSS, but check existing CSS
        // modifying CSS via JS for quick toggle if class not present
        if (navLinks.style.display === 'flex') {
            navLinks.style.display = 'none'; // reset to CSS default or hide
             // Actually, checking CSS query relies on class
        } else {
           // For simple implementation without extra CSS classes:
           // We need to support the 'active' state in CSS or here.
        }
        
        // Better approach: toggle a class and style that class in CSS
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}
/* Note: I need to add .nav-links.active styles to components.css for this to work on mobile */


/* -------------------
   Scroll Reveal
   ------------------- */
function initScrollReveal() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Reveal once
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => observer.observe(el));
}

/* -------------------
   Smooth Scroll
   ------------------- */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Account for fixed header
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}
