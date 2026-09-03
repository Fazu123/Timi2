document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('open');
        });
    }

    const sliderTrack = document.querySelector('.slider-track');
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');

    let currentSlide = 0;

    function goToSlide(index) {
        if (!sliderTrack || slides.length === 0) return;

        currentSlide = (index + slides.length) % slides.length;
        sliderTrack.style.transform = `translateX(-${currentSlide * 100}%)`;

        dots.forEach((dot, dotIndex) => {
            dot.classList.toggle('active', dotIndex === currentSlide);
        });
    }

    if (sliderTrack && slides.length > 0) {
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => goToSlide(index));
        });

        setInterval(() => {
            goToSlide(currentSlide + 1);
        }, 4200);
    }

    const revealBlocks = document.querySelectorAll('.feature-card, .menu-card, .review-card, .team-card, .value-card, .timeline-card, .contact-card, .gallery-card, .story-card, .cta-box');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.style.transition = 'transform 0.6s ease, opacity 0.6s ease, box-shadow 0.6s ease';
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    revealBlocks.forEach((block) => {
        block.style.opacity = '0';
        block.style.transform = 'translateY(18px)';
        revealObserver.observe(block);
    });

    const filterButtons = document.querySelectorAll('.filter-pill');
    const menuItems = document.querySelectorAll('.menu-card-large');

    if (filterButtons.length) {
        filterButtons.forEach((button) => {
            button.addEventListener('click', () => {
                const category = button.dataset.filter;

                filterButtons.forEach((btn) => btn.classList.toggle('active', btn === button));

                menuItems.forEach((item) => {
                    const itemCategory = item.dataset.category;
                    const shouldShow = category === 'all' || itemCategory === category;
                    item.classList.toggle('hidden', !shouldShow);
                });
            });
        });
    }

    const yearNode = document.querySelector('[data-year]');
    if (yearNode) {
        yearNode.textContent = new Date().getFullYear();
    }

    const reservationForm = document.querySelector('.contact-form');
    if (reservationForm) {
        reservationForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const submitButton = reservationForm.querySelector('button[type="submit"]');

            if (submitButton) {
                const originalText = submitButton.textContent;
                submitButton.textContent = 'Request Sent';
                submitButton.disabled = true;

                setTimeout(() => {
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                    reservationForm.reset();
                }, 1800);
            }
        });
    }
});