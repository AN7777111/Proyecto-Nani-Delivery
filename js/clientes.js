// clientes.js

document.addEventListener('DOMContentLoaded', () => {
    verificarSesionAdmin();
    inicializarClientes();
    renderizarClientes();
    configurarBuscador();
    configurarExportacion();
    configurarLogout();
});


function verificarSesionAdmin() {
    const admin = JSON.parse(localStorage.getItem('adminActivo'));
    if (!admin) {
        window.location.href = 'login-admin.html';
    }
}


let clientes = [];

function inicializarClientes() {
    const data = localStorage.getItem('clientes');

    if (!data) {
        clientes = [
            {
                id: '001',
                nombre: 'Ana Torres',
                correo: 'ana@example.com',
                telefono: '987 654 321',
                pedidos: 5
            },
            {
                id: '002',
                nombre: 'Mario Ríos',
                correo: 'mario@example.com',
                telefono: '956 123 888',
                pedidos: 3
            },
            {
                id: '003',
                nombre: 'Lucía Peña',
                correo: 'lucia@example.com',
                telefono: '912 441 009',
                pedidos: 7
            }
        ];

        localStorage.setItem('clientes', JSON.stringify(clientes));
    } else {
        clientes = JSON.parse(data);
    }
}


function renderizarClientes(lista = clientes) {
    const tbody = document.querySelector('.tabla-clientes tbody');
    tbody.innerHTML = '';

    lista.forEach(cliente => {
        const tr = document.createElement('tr');

        tr.innerHTML = `
            <td>#${cliente.id}</td>
            <td>${cliente.nombre}</td>
            <td>${cliente.correo}</td>
            <td>${cliente.telefono}</td>
            <td>${cliente.pedidos}</td>
            <td>
                <button class="btn-ver" data-id="${cliente.id}">Ver</button>
            </td>
        `;

        tbody.appendChild(tr);
    });

    configurarBotonesVer();
}


function configurarBuscador() {
    const input = document.querySelector('.buscador input');

    input.addEventListener('input', () => {
        const texto = input.value.toLowerCase();

        const filtrados = clientes.filter(c =>
            c.nombre.toLowerCase().includes(texto) ||
            c.correo.toLowerCase().includes(texto)
        );

        renderizarClientes(filtrados);
    });
}

function configurarBotonesVer() {
    const botones = document.querySelectorAll('.btn-ver');

    botones.forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.dataset.id;
            const cliente = clientes.find(c => c.id === id);

            alert(
                `Cliente:\n\n` +
                `Nombre: ${cliente.nombre}\n` +
                `Correo: ${cliente.correo}\n` +
                `Teléfono: ${cliente.telefono}\n` +
                `Pedidos: ${cliente.pedidos}`
            );
        });
    });
}


function configurarExportacion() {
    const btn = document.querySelector('.btn-exportar');

    btn.addEventListener('click', () => {
        let csv = 'ID,Nombre,Correo,Teléfono,Pedidos\n';

        clientes.forEach(c => {
            csv += `${c.id},${c.nombre},${c.correo},${c.telefono},${c.pedidos}\n`;
        });

        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = 'clientes_nani_delivery.csv';
        link.click();
    });
}


function configurarLogout() {
    const logoutBtn = document.querySelector('.logout');

    logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.removeItem('adminActivo');
        window.location.href = 'login-admin.html';
    });
}
