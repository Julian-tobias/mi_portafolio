const themeButton = document.getElementById('themeButton');
const themeStatus = document.getElementById('theme-status');
const menuButton = document.getElementById('menuButton');
const navMenu = document.getElementById('navMenu');
const contactForm = document.getElementById('contactForm');
const contactAlert = document.getElementById('contactAlert');
const contactName = document.getElementById('contactName');
const contactEmail = document.getElementById('contactEmail');
const contactMessage = document.getElementById('contactMessage');

function setTheme(theme) {
    if (theme === 'dark') {
        document.body.classList.add('dark-theme');
        themeStatus.textContent = 'Modo oscuro activado.';
        themeButton.textContent = 'Volver a modo claro';
    } else {
        document.body.classList.remove('dark-theme');
        themeStatus.textContent = 'Modo claro activado.';
        themeButton.textContent = 'Cambiar tema';
    }
}

function initializeTheme() {
    const savedTheme = localStorage.getItem('site-theme') || 'light';
    setTheme(savedTheme);
}

function toggleTheme() {
    const currentTheme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('site-theme', nextTheme);
}

function toggleMenu() {
    const isExpanded = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!isExpanded));
    navMenu.classList.toggle('active');
}

function closeMenu() {
    menuButton.setAttribute('aria-expanded', 'false');
    navMenu.classList.remove('active');
}

function showContactMessage(message, type = 'success') {
    if (!contactAlert) return;
    contactAlert.textContent = message;
    contactAlert.style.color = type === 'success' ? '#a5f3fc' : '#fda4af';
}

if (menuButton) {
    menuButton.addEventListener('click', toggleMenu);
}

if (navMenu) {
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });
}

if (contactForm) {
    contactForm.addEventListener('submit', event => {
        event.preventDefault();
        const name = contactName.value.trim();
        const email = contactEmail.value.trim();
        const message = contactMessage.value.trim();

        if (!name || !email || !message) {
            showContactMessage('Completa todos los campos antes de enviar.', 'error');
            return;
        }

        const subject = encodeURIComponent(`Contacto desde portafolio - ${name}`);
        const body = encodeURIComponent(`Nombre: ${name}\nEmail: ${email}\n\n${message}`);
        window.location.href = `mailto:juliantobias2005x@gmail.com?subject=${subject}&body=${body}`;
        showContactMessage('Tu mensaje está listo para enviar.', 'success');
        contactForm.reset();
    });
}

initializeTheme();
