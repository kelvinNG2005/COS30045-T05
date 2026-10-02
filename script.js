// Set current year in footer
document.querySelectorAll('.year').forEach(el => {
    el.textContent = new Date().getFullYear();
});

// Page switching
const navLinks = document.querySelectorAll('.nav-link');
const pages    = document.querySelectorAll('.page');

function showPage(pageId) {
    pages.forEach(p => p.classList.remove('active'));

    const target = document.getElementById(pageId);
    if (target) target.classList.add('active');

    navLinks.forEach(link => {
        const isActive = link.dataset.page === pageId;
        link.classList.toggle('active', isActive);
        if (isActive) {
            link.setAttribute('aria-current', 'page');
        } else {
            link.removeAttribute('aria-current');
        }
    });

    const pretty = pageId.charAt(0).toUpperCase() + pageId.slice(1);
    document.title = 'PowerSmart | ' + pretty;

    window.scrollTo(0, 0);
}

navLinks.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        showPage(link.dataset.page);
    });
});

// Logo returns to Home
document.getElementById('logoLink').addEventListener('click', e => {
    e.preventDefault();
    showPage('home');
});

// Keyboard support
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') showPage('home');
});