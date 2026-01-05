
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    form.addEventListener('submit', registrarAdmin);
});

function registrarAdmin(e) {
    e.preventDefault();

    const nombre = document.querySelector('input[name="nombre"]').value.trim();
    const email = document.querySelector('input[name="email"]').value.trim().toLowerCase();
    const password = document.querySelector('input[name="password"]').value;
    const confirm = document.querySelector('input[name="confirm"]').value;

    if (!nombre || !email || !password || !confirm) {
        mostrarError('Todos los campos son obligatorios.');
        return;
    }

    if (password !== confirm) {
        mostrarError('Las contraseñas no coinciden.');
        return;
    }

    let admins = JSON.parse(localStorage.getItem('admins')) || [];

    const existe = admins.some(admin => admin.email === email);
    if (existe) {
        mostrarError('Este correo ya está registrado.');
        return;
    }

    const nuevoAdmin = {
        nombre,
        email,
        password,
        creadoEn: new Date().toISOString()
    };

    admins.push(nuevoAdmin);
    localStorage.setItem('admins', JSON.stringify(admins));

    mostrarExito('Administrador registrado correctamente.');

    setTimeout(() => {
        window.location.href = 'dashboard-admin.html';
    }, 1500);
}


function mostrarError(mensaje) {
    mostrarMensaje(mensaje, '#e74c3c');
}

function mostrarExito(mensaje) {
    mostrarMensaje(mensaje, '#0FAD83');
}

function mostrarMensaje(mensaje, color) {
    let msg = document.querySelector('.msg');

    if (!msg) {
        msg = document.createElement('p');
        msg.className = 'msg';
        msg.style.marginTop = '15px';
        msg.style.fontWeight = '500';
        document.querySelector('.register-box').appendChild(msg);
    }

    msg.style.color = color;
    msg.textContent = mensaje;
}
