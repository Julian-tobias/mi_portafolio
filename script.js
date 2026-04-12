const themeButton = document.getElementById('themeButton');
const themeStatus = document.getElementById('theme-status');

function toggleTheme() {
    document.body.classList.toggle('dark-theme');

    if (document.body.classList.contains('dark-theme')) {
        themeStatus.textContent = 'Modo oscuro activado.';
        themeButton.textContent = 'Volver a modo claro';
    } else {
        themeStatus.textContent = 'Modo claro activado.';
        themeButton.textContent = 'Cambiar tema';
    }
}

themeButton.addEventListener('click', toggleTheme);
