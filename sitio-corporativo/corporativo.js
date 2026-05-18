// Animaciones y validación avanzada de formulario de contacto
const form = document.getElementById('contactForm');
const alertBox = document.getElementById('contactAlert');

form.addEventListener('submit', e => {
    e.preventDefault();
    const nombre = document.getElementById('nombre').value.trim();
    const email = document.getElementById('email').value.trim();
    const mensaje = document.getElementById('mensaje').value.trim();
    if (!nombre || !email || !mensaje) {
        alertBox.textContent = 'Completa todos los campos.';
        alertBox.style.color = '#fda4af';
        return;
    }
    alertBox.textContent = '¡Mensaje enviado! Te responderé pronto.';
    alertBox.style.color = '#a5f3fc';
    form.reset();
});

// Animación de entrada para secciones
window.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.about-card, .hero-highlights li').forEach((el, i) => {
        setTimeout(() => el.style.opacity = 1, 200 + i * 120);
    });
});