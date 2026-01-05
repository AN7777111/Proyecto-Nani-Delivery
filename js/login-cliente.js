// login-cliente.js
document.addEventListener('DOMContentLoaded', () => {

    const formLogin = document.querySelector('.login-form');

    if (!formLogin) return;

    formLogin.addEventListener('submit', (e) => {
        e.preventDefault();

        const email = formLogin.querySelector('input[type="email"]');
        const password = formLogin.querySelector('input[type="password"]');

        let valido = true;

        // Reset estilos
        email.style.borderColor = '';
        password.style.borderColor = '';

        if (!email.value.trim()) {
            email.style.borderColor = '#e74c3c';
            valido = false;
        }

        if (!password.value.trim()) {
            password.style.borderColor = '#e74c3c';
            valido = false;
        }

        if (!valido) {
            mostrarMensaje('Completa todos los campos.', 'error');
            return;
        }

        // 🔒 Simulación de login (frontend only)
        if (email.value.includes('@') && password.value.length >= 4) {

            // Guardar sesión simulada
            localStorage.setItem('clienteLogueado', 'true');
            localStorage.setItem('clienteEmail', email.value);

            mostrarMensaje('Acceso correcto. Redirigiendo...', 'success');

            setTimeout(() => {
                window.location.href = 'dashboard-cliente.html';
            }, 1200);

        } else {
            mostrarMensaje('Credenciales inválidas.', 'error');
        }
    });

});

/* ===== Helpers ===== */

function mostrarMensaje(texto, tipo) {

    let mensaje = document.querySelector('.mensaje-login');

    if (!mensaje) {
        mensaje = document.createElement('div');
        mensaje.classList.add('mensaje-login');
        document.querySelector('.login-card').appendChild(mensaje);
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
localStorage.setItem('adminActivo', JSON.stringify(admin));
