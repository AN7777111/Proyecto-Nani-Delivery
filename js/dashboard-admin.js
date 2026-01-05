// dashboard-admin.js

document.addEventListener('DOMContentLoaded', () => {
    verificarSesionAdmin();
    mostrarNombreAdmin();
    configurarLogout();
});


function verificarSesionAdmin() {
    const adminActivo = JSON.parse(localStorage.getItem('adminActivo'));

    if (!adminActivo) {
        window.location.href = 'dashboard-admin.html';
    }
}


function mostrarNombreAdmin() {
    const adminActivo = JSON.parse(localStorage.getItem('adminActivo'));
    if (!adminActivo) return;

    const titulo = document.querySelector('h1');
    if (titulo) {
        titulo.textContent = `Bienvenido, ${adminActivo.nombre}`;
    }
}


function configurarLogout() {
    const logoutBtn = document.querySelector('.logout');

    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();

            localStorage.removeItem('adminActivo');

            window.location.href = 'login-admin.html';
        });
    }
}
