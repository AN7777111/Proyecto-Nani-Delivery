document.addEventListener('DOMContentLoaded', () => {
    cargarPagos();
});

function cargarPagos() {
    const tbody = document.querySelector('tbody');
    tbody.innerHTML = '';

    const pagos = JSON.parse(localStorage.getItem('pagos')) || [];

    if (pagos.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="7" style="text-align:center; padding:20px;">
                    No hay pagos registrados
                </td>
            </tr>
        `;
        return;
    }

    pagos.forEach(pago => {
        const tr = document.createElement('tr');

        tr.innerHTML = `
            <td>${pago.id}</td>
            <td>${pago.cliente}</td>
            <td>S/ ${Number(pago.monto).toFixed(2)}</td>
            <td>${pago.metodo}</td>
            <td>${pago.fecha}</td>
            <td>
                <span class="badge ${estadoClase(pago.estado)}">
                    ${capitalizar(pago.estado)}
                </span>
            </td>
            <td>
                <button class="btn-small">Ver</button>
            </td>
        `;

        tbody.appendChild(tr);
    });
}

function estadoClase(estado) {
    switch (estado) {
        case 'pagado':
            return 'pagado';
        case 'pendiente':
            return 'pendiente';
        case 'fallido':
            return 'fallido';
        default:
            return '';
    }
}

function capitalizar(texto) {
    return texto.charAt(0).toUpperCase() + texto.slice(1);
}
