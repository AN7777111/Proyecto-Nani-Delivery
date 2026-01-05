document.addEventListener('DOMContentLoaded', () => {
    ocultarCodigo();
});

function generarCodigo() {

    const cliente = document.getElementById('Cliente');
    const origen = document.getElementById('origen');
    const destino = document.getElementById('destino');
    const tipo = document.getElementById('tipo');

    [cliente, origen, destino, tipo].forEach(campo => {
        campo.style.borderColor = '';
    });

    if (
        !cliente.value.trim() ||
        !origen.value.trim() ||
        !destino.value.trim() ||
        !tipo.value
    ) {
        marcarError(cliente);
        marcarError(origen);
        marcarError(destino);
        marcarError(tipo);
        mostrarMensaje('Completa todos los campos para generar el pedido.');
        return;
    }

    const codigo = crearCodigoSeguimiento();
    mostrarCodigo(codigo);

    const pedido = {
        codigo: codigo,
        cliente: cliente.value.trim(),   // ✅ AQUÍ ESTABA EL PROBLEMA
        origen: origen.value.trim(),
        destino: destino.value.trim(),
        tipo: tipo.value,
        estado: 'Pendiente',
        fecha: new Date().toLocaleDateString('es-PE')
    };

    guardarPedido(pedido);

    document.querySelector('.pedido-form').reset();
}

function crearCodigoSeguimiento() {
    const random = Math.floor(Math.random() * 900 + 100);
    const fecha = new Date().getFullYear();
    return `NANI-${fecha}-${random}`;
}

function mostrarCodigo(codigo) {
    const box = document.getElementById('codigo-box');
    const texto = document.getElementById('codigo-generado');
    texto.textContent = codigo;
    box.classList.remove('hidden');
}

function ocultarCodigo() {
    const box = document.getElementById('codigo-box');
    if (box) box.classList.add('hidden');
}

function guardarPedido(pedido) {
    let pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];
    pedidos.push(pedido);
    localStorage.setItem('pedidos', JSON.stringify(pedidos));
}

function marcarError(campo) {
    campo.style.borderColor = '#e74c3c';
}

function mostrarMensaje(texto) {
    let msg = document.querySelector('.mensaje-dashboard');

    if (!msg) {
        msg = document.createElement('div');
        msg.className = 'mensaje-dashboard';
        document.querySelector('.pedido-card').appendChild(msg);
    }

    msg.textContent = texto;
    msg.style.marginTop = '15px';
    msg.style.padding = '12px';
    msg.style.borderRadius = '8px';
    msg.style.backgroundColor = '#e74c3c';
    msg.style.color = '#fff';
    msg.style.textAlign = 'center';
    msg.style.fontWeight = '500';

    setTimeout(() => {
        msg.remove();
    }, 3000);
}
