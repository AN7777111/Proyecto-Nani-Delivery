// pedidos.js

document.addEventListener('DOMContentLoaded', () => {
    verificarSesionAdmin();
    inicializarPedidos();
    renderizarPedidos();
    configurarFiltros();
    configurarNuevoPedido();
    configurarLogout();
});


function verificarSesionAdmin() {
    const admin = JSON.parse(localStorage.getItem('adminActivo'));
    if (!admin) {
        window.location.href = 'login-admin.html';
    }
}


let pedidos = [];

function inicializarPedidos() {
    const data = localStorage.getItem('pedidos');

    if (!data) {
        pedidos = [
            {
                codigo: 'PED123',
                cliente: 'Juan Pérez',
                origen: 'Cayma',
                destino: 'Miraflores',
                fecha: '28/11/2025',
                estado: 'pendiente'
            },
            {
                codigo: 'PED124',
                cliente: 'Ana López',
                origen: 'Cerro Colorado',
                destino: 'Paucarpata',
                fecha: '28/11/2025',
                estado: 'en_camino'
            },
            {
                codigo: 'PED125',
                cliente: 'Pedro García',
                origen: 'Yanahuara',
                destino: 'JLByR',
                fecha: '27/11/2025',
                estado: 'entregado'
            }
        ];

        localStorage.setItem('pedidos', JSON.stringify(pedidos));
    } else {
        pedidos = JSON.parse(data);
    }
}


function renderizarPedidos(lista = pedidos) {
    const tbody = document.querySelector('table tbody');
    tbody.innerHTML = '';

    lista.forEach(pedido => {
        const tr = document.createElement('tr');

        tr.innerHTML = `
            <td>#${pedido.codigo}</td>
            <td>${pedido.cliente}</td>
            <td>${pedido.origen}</td>
            <td>${pedido.destino}</td>
            <td>${pedido.fecha}</td>
            <td>${renderEstado(pedido.estado)}</td>
            <td>
                <button class="btn-small" data-codigo="${pedido.codigo}">Ver</button>
            </td>
        `;

        tbody.appendChild(tr);
    });

    configurarBotonesVer();
}

function renderEstado(estado) {
    if (estado === 'pendiente') {
        return `<span class="badge pendiente">Pendiente</span>`;
    }
    if (estado === 'en_camino') {
        return `<span class="badge camino">En camino</span>`;
    }
    return `<span class="badge ok">Entregado</span>`;
}


function configurarFiltros() {
    const input = document.querySelector('.actions input');
    const select = document.querySelector('.actions select');

    input.addEventListener('input', aplicarFiltros);
    select.addEventListener('change', aplicarFiltros);
}

function aplicarFiltros() {
    const texto = document.querySelector('.actions input').value.toLowerCase();
    const estado = document.querySelector('.actions select').value;

    const filtrados = pedidos.filter(p =>
        (
            p.codigo.toLowerCase().includes(texto) ||
            p.cliente.toLowerCase().includes(texto) ||
            p.origen.toLowerCase().includes(texto) ||
            p.destino.toLowerCase().includes(texto)
        ) &&
        (estado === '' || p.estado === estado)
    );

    renderizarPedidos(filtrados);
}


function configurarBotonesVer() {
    document.querySelectorAll('.btn-small').forEach(btn => {
        btn.addEventListener('click', () => {
            const codigo = btn.dataset.codigo;
            const pedido = pedidos.find(p => p.codigo === codigo);

            alert(
                `Pedido ${pedido.codigo}\n\n` +
                `Cliente: ${pedido.cliente}\n` +
                `Origen: ${pedido.origen}\n` +
                `Destino: ${pedido.destino}\n` +
                `Fecha: ${pedido.fecha}\n` +
                `Estado: ${pedido.estado.replace('_', ' ')}`
            );
        });
    });
}


function configurarNuevoPedido() {
    const btn = document.querySelector('.btn-add');

    btn.addEventListener('click', () => {
        alert('Funcionalidad de creación de pedidos en desarrollo.');
    });
}

function configurarLogout() {
    const logout = document.querySelector('.logout');

    logout.addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.removeItem('adminActivo');
        window.location.href = 'login-admin.html';
    });
}
