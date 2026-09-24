/**
 * Saffron & Spice Bistro - Interactive Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    const links = document.querySelectorAll('.n-link');

    navToggle?.addEventListener('click', () => {
        navLinks.classList.toggle('open');
        navToggle.classList.toggle('active');
    });

    links.forEach(l => {
        l.addEventListener('click', () => {
            navLinks.classList.remove('open');
            navToggle.classList.remove('active');
        });
    });

    // 2. Active Scroll Spy
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120;
            const sectionId = current.getAttribute('id');
            const targetLink = document.querySelector(`.nav-links a[href*=${sectionId}]`);

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                targetLink?.classList.add('active');
            } else {
                targetLink?.classList.remove('active');
            }
        });
    });

    // 3. Menu Category Filter Tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    const menuItems = document.querySelectorAll('.menu-item');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const selectedCat = btn.getAttribute('data-category');
            menuItems.forEach(item => {
                if (item.getAttribute('data-category') === selectedCat) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeIn 0.4s ease';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Show initial tab (Starters)
    menuItems.forEach(item => {
        if (item.getAttribute('data-category') !== 'starters') {
            item.style.display = 'none';
        }
    });

    // 4. Reservation Booking Form
    const resForm = document.getElementById('reservationForm');
    const resFeedback = document.getElementById('resFeedback');

    // Set minimum date to today
    const resDateInput = document.getElementById('resDate');
    if (resDateInput) {
        const today = new Date().toISOString().split('T')[0];
        resDateInput.setAttribute('min', today);
    }

    if (resForm) {
        resForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('guestName').value;
            const date = document.getElementById('resDate').value;
            const time = document.getElementById('resTime').value;
            const guests = document.getElementById('guestsCount').value;

            resFeedback.style.display = 'block';
            resFeedback.innerHTML = `
                <strong>✨ Table Reserved for ${name}!</strong><br>
                Your table for <strong>${guests}</strong> on <strong>${date} at ${time}</strong> has been secured. A confirmation SMS with directions has been dispatched.
            `;
            resForm.reset();
            setTimeout(() => {
                resFeedback.style.display = 'none';
            }, 8000);
        });
    }
});
