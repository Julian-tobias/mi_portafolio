// App avanzada: consume API pública y muestra usuarios con búsqueda y animaciones
const usersList = document.getElementById('usersList');
const reloadBtn = document.getElementById('reloadBtn');
const userSearch = document.getElementById('userSearch');
let currentUsers = [];

async function fetchUsers() {
  usersList.innerHTML = '<p>Cargando usuarios...</p>';
  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  currentUsers = await res.json();
  renderUsers(currentUsers);
}

function renderUsers(users) {
  if (!users.length) {
    usersList.innerHTML = '<p>No se encontraron usuarios.</p>';
    return;
  }
  usersList.innerHTML = '';
  users.forEach(user => {
    const card = document.createElement('div');
    card.className = 'about-card';
    card.innerHTML = `<h3>${user.name}</h3><p><strong>Email:</strong> ${user.email}</p><p><strong>Ciudad:</strong> ${user.address.city}</p><p><strong>Empresa:</strong> ${user.company.name}</p>`;
    usersList.appendChild(card);
  });
}

function filterUsers() {
  const query = userSearch.value.trim().toLowerCase();
  const filtered = currentUsers.filter(user =>
    user.name.toLowerCase().includes(query) ||
    user.address.city.toLowerCase().includes(query) ||
    user.company.name.toLowerCase().includes(query)
  );
  renderUsers(filtered);
}

reloadBtn.addEventListener('click', fetchUsers);
userSearch.addEventListener('input', filterUsers);
document.addEventListener('DOMContentLoaded', fetchUsers);