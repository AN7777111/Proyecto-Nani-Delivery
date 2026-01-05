document.addEventListener('DOMContentLoaded', () => {
    cargarSeguimientos();
});

const form = document.querySelector('form');
const tbody = document.querySelector('tbody');

form.addEventListener('submit', e => {
    e.preventDefault();

    const inputs = form.querySelectorAll('input, select');

    const seguimiento = {
        pedidoId: inputs[0].value.trim(),
        cliente: obtenerClientePorPedido(inputs[0].value.trim()),
        codigo: inputs[1].value.trim(),
        estado: inputs[2].value,
        ubicacion: inputs[3].value || '—',
        fecha: new Date().toLocaleDateString()
    };

    if (!seguimiento.pedidoId || !seguimiento.codigo || !seguimiento.estado) {
        return;
    }

    guardarSeguimiento(seguimiento);
    form.reset();
    cargarSeguimientos();
});

function cargarSeguimientos() {
    tbody.innerHTML = '';

    const seguimientos = JSON.parse(localStorage.getItem('seguimientos')) || [];

    if (seguimientos.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="6" style="text-align:center; padding:20px;">
                    No hay registros de seguimiento
                </td>
            </tr>
        `;
        return;
    }

    seguimientos.forEach(seg => {
        const tr = document.createElement('tr');

        tr.innerHTML = `
            <td>${seg.pedidoId}</td>
            <td>${seg.cliente}</td>
            <td>${seg.codigo}</td>
            <td>
                <span class="badge ${seg.estado}">
                    ${capitalizar(seg.estado.replace('-', ' '))}
                </span>
            </td>
            <td>${seg.ubicacion}</td>
            <td>${seg.fecha}</td>
        `;

        tbody.appendChild(tr);
    });
}

function guardarSeguimiento(nuevo) {
    let seguimientos = JSON.parse(localStorage.getItem('seguimientos')) || [];

    const index = seguimientos.findIndex(s => s.pedidoId === nuevo.pedidoId);

    if (index !== -1) {
        seguimientos[index] = nuevo; // actualizar
    } else {
        seguimientos.push(nuevo); // nuevo
    }

    localStorage.setItem('seguimientos', JSON.stringify(seguimientos));
}

function obtenerClientePorPedido(pedidoId) {
    const pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];
    const pedido = pedidos.find(p => p.codigo === pedidoId);
    return pedido ? pedido.cliente : 'Desconocido';
}

function capitalizar(texto) {
    return texto.charAt(0).toUpperCase() + texto.slice(1);
}
