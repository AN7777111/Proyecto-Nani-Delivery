// registrar-cliente.js
document.addEventListener('DOMContentLoaded', () => {

    const formRegister = document.querySelector('.register-form');

    if (!formRegister) return;

    formRegister.addEventListener('submit', (e) => {
        e.preventDefault();

        const inputs = formRegister.querySelectorAll('input');
        let valido = true;

        // Reset estilos
        inputs.forEach(input => {
            input.style.borderColor = '';
        });

        const nombre = inputs[0];
        const email = inputs[1];
        const telefono = inputs[2];
        const direccion = inputs[3];
        const password = inputs[4];
        const confirmPassword = inputs[5];

        // Validación básica
        inputs.forEach(input => {
            if (!input.value.trim()) {
                input.style.borderColor = '#e74c3c';
                valido = false;
            }
        });

        if (!valido) {
            mostrarMensaje('Completa todos los campos.', 'error');
            return;
        }

        // Validar email
        if (!email.value.includes('@')) {
            email.style.borderColor = '#e74c3c';
            mostrarMensaje('Correo electrónico no válido.', 'error');
            return;
        }

        // Validar contraseña
        if (password.value.length < 4) {
            password.style.borderColor = '#e74c3c';
            mostrarMensaje('La contraseña debe tener al menos 4 caracteres.', 'error');
            return;
        }

        // Confirmar contraseña
        if (password.value !== confirmPassword.value) {
            password.style.borderColor = '#e74c3c';
            confirmPassword.style.borderColor = '#e74c3c';
            mostrarMensaje('Las contraseñas no coinciden.', 'error');
            return;
        }

        const cliente = {
            nombre: nombre.value,
            email: email.value,
            telefono: telefono.value,
            direccion: direccion.value
        };

        localStorage.setItem('clienteRegistrado', JSON.stringify(cliente));

        mostrarMensaje('Cuenta creada con éxito. Redirigiendo...', 'success');

        setTimeout(() => {
            window.location.href = 'dashboard-cliente.html';
        }, 1500);

        formRegister.reset();
    });

});


function mostrarMensaje(texto, tipo) {

    let mensaje = document.querySelector('.mensaje-register');

    if (!mensaje) {
        mensaje = document.createElement('div');
        mensaje.classList.add('mensaje-register');
        document.querySelector('.register-card').appendChild(mensaje);
    }

    mensaje.textContent = texto;

    mensaje.style.marginTop = '15px';
    mensaje.style.padding = '12px';
    mensaje.style.borderRadius = '8px';
    mensaje.style.fontWeight = '500';
    mensaje.style.textAlign = 'center';

    if (tipo === 'success') {
        mensaje.style.backgroundColor = '#0FAD83';
        mensaje.style.color = '#FFFFFF';
    } else {
        mensaje.style.backgroundColor = '#e74c3c';
        mensaje.style.color = '#FFFFFF';
    }

    setTimeout(() => {
        mensaje.remove();
    }, 3500);
}
