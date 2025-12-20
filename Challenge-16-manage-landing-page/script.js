'use strict';

//Maintain current year
let currYear = document.querySelector('.currYear');
let currYr = new Date();
currYear.textContent = `@${currYr.getFullYear()}`;


// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');
const mobileOverlay = document.getElementById('mobileOverlay');

function toggleMobileMenu() {
    hamburger.classList.toggle('active');
    mobileNav.classList.toggle('active');
    mobileOverlay.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    if (mobileNav.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
}

// Toggle menu when hamburger is clicked
if (hamburger) {
    hamburger.addEventListener('click', toggleMobileMenu);
}

// Close menu when overlay is clicked
if (mobileOverlay) {
    mobileOverlay.addEventListener('click', toggleMobileMenu);
}

// Close mobile menu when clicking on a navigation link
if (mobileNav) {
    const mobileNavLinks = mobileNav.querySelectorAll('a');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', toggleMobileMenu);
    });
}

// Update copyright year dynamically
const yearSpan = document.querySelector('.currYear');
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}

// Smooth scroll for anchor links (optional enhancement)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});