// Dashboard avanzado con animaciones y gráficos interactivos
// Simula datos y actualiza métricas en tiempo real

document.addEventListener('DOMContentLoaded', () => {
    // Simulación de datos
    const data = {
        ventasHoy: Math.floor(Math.random() * 200 + 100),
        usuariosActivos: Math.floor(Math.random() * 80 + 20),
        conversion: (Math.random() * 10 + 10).toFixed(2),
        clientesNuevos: Math.floor(Math.random() * 30 + 10),
        ticketsPromedio: Math.floor(Math.random() * 1000 + 2000),
        soporteResuelto: Math.floor(Math.random() * 90 + 10)
    };
    document.getElementById('ventasHoy').textContent = data.ventasHoy;
    document.getElementById('usuariosActivos').textContent = data.usuariosActivos;
    document.getElementById('conversion').textContent = data.conversion + '%';
    document.getElementById('clientesNuevos').textContent = data.clientesNuevos;
    document.getElementById('ticketsPromedio').textContent = data.ticketsPromedio;
    document.getElementById('soporteResuelto').textContent = data.soporteResuelto;

    // Gráfico de ventas
    const ventasChart = new Chart(document.getElementById('ventasChart').getContext('2d'), {
        type: 'line',
        data: {
            labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
            datasets: [{
                label: 'Ventas',
                data: Array.from({length: 7}, () => Math.floor(Math.random() * 200 + 100)),
                borderColor: '#2563eb',
                backgroundColor: 'rgba(37,99,235,0.12)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            plugins: { legend: { display: false } },
            animation: { duration: 1200 }
        }
    });

    // Gráfico de usuarios activos
    const usuariosChart = new Chart(document.getElementById('usuariosChart').getContext('2d'), {
        type: 'bar',
        data: {
            labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul'],
            datasets: [{
                label: 'Usuarios activos',
                data: Array.from({length: 7}, () => Math.floor(Math.random() * 100 + 20)),
                backgroundColor: '#60a5fa',
                borderRadius: 8
            }]
        },
        options: {
            responsive: true,
            plugins: { legend: { display: false } },
            animation: { duration: 1200 }
        }
    });
});