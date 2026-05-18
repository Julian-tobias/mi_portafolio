const clientForm = document.getElementById('clientForm');
const nameInput = document.getElementById('nameInput');
const emailInput = document.getElementById('emailInput');
const phoneInput = document.getElementById('phoneInput');
const statusInput = document.getElementById('statusInput');
const notesInput = document.getElementById('notesInput');
const searchInput = document.getElementById('searchInput');
const statusFilter = document.getElementById('statusFilter');
const clientTable = document.getElementById('clientTable');
const totalClients = document.getElementById('totalClients');
const activeCount = document.getElementById('activeCount');
const recentClient = document.getElementById('recentClient');
const prospectCount = document.getElementById('prospectCount');
const customerCount = document.getElementById('customerCount');
const partnerCount = document.getElementById('partnerCount');
const clearAllButton = document.getElementById('clearAllButton');
const resetFormButton = document.getElementById('resetFormButton');
const alertMessage = document.getElementById('alertMessage');
const submitButton = document.getElementById('submitButton');

let editingId = null;

function loadClients() {
    return JSON.parse(localStorage.getItem('clientes') || '[]');
}

function saveClients(clients) {
    localStorage.setItem('clientes', JSON.stringify(clients));
}

function formatRecent(name) {
    return name || '—';
}

function showAlert(message, type = 'success') {
    alertMessage.textContent = message;
    alertMessage.style.color = type === 'success' ? '#a5f3fc' : '#fda4af';
    window.setTimeout(() => {
        alertMessage.textContent = '';
    }, 2500);
}

function resetForm() {
    clientForm.reset();
    editingId = null;
    submitButton.textContent = 'Agregar cliente';
}

function getFilteredClients() {
    const query = searchInput.value.trim().toLowerCase();
    const status = statusFilter.value;

    return loadClients().filter(client => {
        const matchesText =
            (client.name || '').toLowerCase().includes(query) ||
            (client.email || '').toLowerCase().includes(query);
        const clientStatus = client.status || 'Archivado';
        const matchesStatus = status === 'Todos' || clientStatus === status;
        return matchesText && matchesStatus;
    });
}

function renderClients() {
    const clients = getFilteredClients();
    clientTable.innerHTML = '';

    if (clients.length === 0) {
        clientTable.innerHTML = '<tr><td colspan="5">No se encontraron clientes.</td></tr>';
    } else {
        clients.forEach(client => {
            const row = document.createElement('tr');
            const statusClass = (client.status || 'Archivado').toLowerCase();
            row.innerHTML = `
                <td>
                    <strong>${client.name}</strong>
                    <div class="client-note">${client.notes || 'Sin notas adicionales'}</div>
                </td>
                <td>${client.email}</td>
                <td>${client.phone}</td>
                <td><span class="status-badge ${statusClass}">${client.status}</span></td>
                <td>
                    <button type="button" class="button tertiary small edit-btn" data-id="${client.id}">Editar</button>
                    <button type="button" class="button danger small delete-btn" data-id="${client.id}">Eliminar</button>
                </td>
            `;
            clientTable.appendChild(row);
        });
    }

    updateSummary();
}

function updateSummary() {
    const clients = loadClients();
    totalClients.textContent = clients.length;
    activeCount.textContent = clients.filter(client => client.status !== 'Archivado').length;
    prospectCount.textContent = clients.filter(client => client.status === 'Prospecto').length;
    customerCount.textContent = clients.filter(client => client.status === 'Cliente').length;
    partnerCount.textContent = clients.filter(client => client.status === 'Socio').length;

    const recent = clients.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];
    recentClient.textContent = formatRecent(recent ? recent.name : '');
}

function startEdit(clientId) {
    const client = loadClients().find(item => String(item.id) === String(clientId));
    if (!client) return;

    editingId = client.id;
    nameInput.value = client.name;
    emailInput.value = client.email;
    phoneInput.value = client.phone;
    statusInput.value = client.status;
    notesInput.value = client.notes || '';
    submitButton.textContent = 'Actualizar cliente';
    showAlert(`Editando cliente: ${client.name}`);
}

function removeClient(clientId) {
    if (!window.confirm('¿Eliminar este cliente permanentemente?')) {
        return;
    }

    const clients = loadClients().filter(client => String(client.id) !== String(clientId));
    saveClients(clients);
    renderClients();
    showAlert('Cliente eliminado correctamente.');
}

clientForm.addEventListener('submit', event => {
    event.preventDefault();

    const clients = loadClients();
    const existingClient = editingId
        ? clients.find(client => String(client.id) === String(editingId))
        : null;

    const clientData = {
        id: editingId || Date.now(),
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        phone: phoneInput.value.trim(),
        status: statusInput.value,
        notes: notesInput.value.trim(),
        createdAt: existingClient ? existingClient.createdAt : new Date().toISOString()
    };

    if (editingId) {
        const index = clients.findIndex(client => String(client.id) === String(editingId));
        if (index === -1) {
            showAlert('No se pudo actualizar el cliente seleccionado.', 'error');
            resetForm();
            renderClients();
            return;
        }

        clients[index] = clientData;
        showAlert('Cliente actualizado con éxito.');
    } else {
        clients.push(clientData);
        showAlert('Cliente agregado con éxito.');
    }

    saveClients(clients);
    resetForm();
    renderClients();
});

resetFormButton.addEventListener('click', resetForm);

clearAllButton.addEventListener('click', () => {
    if (!window.confirm('¿Eliminar todos los clientes? Esta acción no se puede deshacer.')) {
        return;
    }

    saveClients([]);
    renderClients();
    showAlert('Todos los clientes han sido eliminados.');
});

clientTable.addEventListener('click', event => {
    const button = event.target.closest('button');
    if (!button) return;

    const { id: clientId } = button.dataset;
    if (button.classList.contains('edit-btn')) {
        startEdit(clientId);
    }
    if (button.classList.contains('delete-btn')) {
        removeClient(clientId);
    }
});

searchInput.addEventListener('input', renderClients);
statusFilter.addEventListener('change', renderClients);

renderClients();
