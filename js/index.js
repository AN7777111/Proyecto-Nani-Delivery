// index.js
document.addEventListener('DOMContentLoaded', () => {

    const formContacto = document.getElementById('form-contacto');

    if (!formContacto) return;

    formContacto.addEventListener('submit', (e) => {
        e.preventDefault();

        const inputs = formContacto.querySelectorAll('input, textarea');
        let valido = true;

        inputs.forEach(input => {
            if (!input.value.trim()) {
                valido = false;
                input.style.borderColor = '#e74c3c';
            } else {
                input.style.borderColor = '';
            }
        });

        if (!valido) {
            mostrarMensaje('Por favor completa todos los campos.', 'error');
            return;
        }

        mostrarMensaje('Mensaje enviado correctamente. Nos contactaremos contigo.', 'success');
        formContacto.reset();
    });

});


function mostrarMensaje(texto, tipo) {

    let mensaje = document.querySelector('.mensaje-form');

    if (!mensaje) {
        mensaje = document.createElement('div');
        mensaje.classList.add('mensaje-form');
        document.querySelector('.contacto-form').appendChild(mensaje);
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
    }, 4000);
}
