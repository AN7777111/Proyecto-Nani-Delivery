// login-admin.js

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.login-form');
    form.addEventListener('submit', loginAdmin);
});

function loginAdmin(e) {
    e.preventDefault();

    const email = document.getElementById('email').value.trim().toLowerCase();
    const password = document.getElementById('password').value;

    if (!email || !password) {
        mostrarError('Completa todos los campos.');
        return;
    }

    const admins = JSON.parse(localStorage.getItem('admins')) || [];

    const adminValido = admins.find(
        admin => admin.email === email && admin.password === password
    );

    if (!adminValido) {
        mostrarError('Credenciales incorrectas.');
        return;
    }

    // Guardar sesión (simulada)
    localStorage.setItem('adminActivo', JSON.stringify({
        email: adminValido.email,
        nombre: adminValido.nombre,
        loginAt: new Date().toISOString()
    }));

    // Redirección al panel admin
    window.location.href = 'dashboard-admin.html';
}


function mostrarError(mensaje) {
    let error = document.querySelector('.error-msg');

    if (!error) {
        error = document.createElement('p');
        error.className = 'error-msg';
        error.style.color = '#e74c3c';
        error.style.marginTop = '15px';
        error.style.fontWeight = '500';
        document.querySelector('.login-card').appendChild(error);
    }

    error.textContent = mensaje;
}
