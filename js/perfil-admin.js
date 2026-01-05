// perfil-admin.js

document.addEventListener('DOMContentLoaded', () => {
    verificarSesionAdmin();
    cargarDatosAdmin();
    configurarFormulario();
    configurarLogout();
});


function verificarSesionAdmin() {
    const adminActivo = JSON.parse(localStorage.getItem('adminActivo'));
    if (!adminActivo) {
        window.location.href = 'login-admin.html';
    }
}


function cargarDatosAdmin() {
    const admin = JSON.parse(localStorage.getItem('adminActivo'));
    if (!admin) return;

    // Card superior
    document.querySelector('.profile-card h2').textContent = admin.nombre;

    // Inputs
    const inputs = document.querySelectorAll('.profile-form input');

    inputs[0].value = admin.nombre || '';
    inputs[1].value = admin.email || '';
    inputs[2].value = admin.telefono || '';
}


function configurarFormulario() {
    const form = document.querySelector('.profile-form');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const inputs = form.querySelectorAll('input');

        const nombre = inputs[0].value.trim();
        const email = inputs[1].value.trim();
        const telefono = inputs[2].value.trim();
        const passwordActual = inputs[3].value;
        const nuevaPassword = inputs[4].value;

        if (!nombre || !email) {
            alert('Nombre y correo son obligatorios.');
            return;
        }

        const admin = JSON.parse(localStorage.getItem('adminActivo'));

    
        if (nuevaPassword) {
            if (!passwordActual || passwordActual !== admin.password) {
                alert('Contraseña actual incorrecta.');
                return;
            }
            admin.password = nuevaPassword;
        }

        admin.nombre = nombre;
        admin.email = email;
        admin.telefono = telefono;

        localStorage.setItem('adminActivo', JSON.stringify(admin));

        alert('Perfil actualizado correctamente.');
    });
}


function configurarLogout() {
    const logoutBtn = document.querySelector('.logout');

    logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.removeItem('adminActivo');
        window.location.href = 'login-admin.html';
    });
}
