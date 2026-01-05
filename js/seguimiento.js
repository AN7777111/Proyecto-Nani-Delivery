// seguimiento.js

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.seguimiento-form');
    form.addEventListener('submit', consultarPedido);
});

function consultarPedido(e) {
    e.preventDefault();

    const codigoInput = document.getElementById('codigo');
    const codigo = codigoInput.value.trim().toUpperCase();

    if (!codigo) {
        mostrarEstado('Código inválido', 'Ingresa un código de seguimiento válido.', false);
        marcarError(codigoInput);
        return;
    }

    const pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];
    const pedido = pedidos.find(p => p.codigo === codigo);

    if (!pedido) {
        mostrarEstado('Pedido no encontrado', 'No existe un pedido con ese código.', false);
        return;
    }

    mostrarEstadoPedido(pedido);
}


function mostrarEstadoPedido(pedido) {
    const card = document.querySelector('.estado-card');

    card.innerHTML = `
        <h3>Pedido ${pedido.codigo}</h3>
        <p><strong>Origen:</strong> ${pedido.origen}</p>
        <p><strong>Destino:</strong> ${pedido.destino}</p>
        <p><strong>Tipo de Envío:</strong> ${formatearTipo(pedido.tipo)}</p>
        <p><strong>Estado:</strong> ${pedido.estado}</p>
        <p><strong>Fecha:</strong> ${formatearFecha(pedido.fecha)}</p>
    `;

    card.style.borderLeft = '6px solid #0FAD83';
}

function mostrarEstado(titulo, mensaje, success = false) {
    const card = document.querySelector('.estado-card');

    card.innerHTML = `
        <h3>${titulo}</h3>
        <p>${mensaje}</p>
    `;

    card.style.borderLeft = success
        ? '6px solid #0FAD83'
        : '6px solid #e74c3c';
}

function marcarError(input) {
    input.style.borderColor = '#e74c3c';
    setTimeout(() => input.style.borderColor = '', 2000);
}


function formatearTipo(tipo) {
    switch (tipo) {
        case 'express': return 'Express (1 hora)';
        case 'same-day': return 'Mismo Día';
        case 'programado': return 'Programado';
        default: return tipo;
    }
}

function formatearFecha(fechaISO) {
    const fecha = new Date(fechaISO);
    return fecha.toLocaleString('es-PE');
}
