// Blog profesional: carga dinámica de posts y navegación
const posts = [
  {
    title: 'Cómo crear un dashboard avanzado con Chart.js',
    date: '2026-05-10',
    excerpt: 'Aprende a construir dashboards interactivos y visualmente atractivos usando Chart.js y animaciones modernas.',
    content: 'Chart.js es una de las librerías más potentes para crear gráficos en la web. En este artículo te muestro cómo integrarla en un dashboard profesional...'
  },
  {
    title: 'Tips de UX para portafolios que destacan',
    date: '2026-04-28',
    excerpt: 'Descubre los secretos de la experiencia de usuario que hacen que tu portafolio sea memorable y profesional.',
    content: 'Un buen portafolio no solo muestra proyectos, sino que guía al usuario y comunica tu valor. Aquí tienes algunos consejos prácticos...'
  },
  {
    title: 'Automatiza tu flujo de trabajo con GitHub Actions',
    date: '2026-04-15',
    excerpt: 'Optimiza tu desarrollo y despliegue usando CI/CD gratis con GitHub Actions.',
    content: 'GitHub Actions permite automatizar pruebas, builds y despliegues. Te explico cómo configurarlo para tus proyectos front-end...'
  }
];

function renderPosts() {
  const postsList = document.getElementById('postsList');
  postsList.innerHTML = '';
  posts.forEach(post => {
    const card = document.createElement('div');
    card.className = 'about-card';
    card.innerHTML = `<h3>${post.title}</h3><p><em>${post.date}</em></p><p>${post.excerpt}</p><button class="button secondary" onclick="showPost('${post.title.replace(/'/g, '')}')">Leer más</button>`;
    postsList.appendChild(card);
  });
}

window.showPost = function(title) {
  const post = posts.find(p => p.title === title);
  if (!post) return;
  const postsList = document.getElementById('postsList');
  postsList.innerHTML = `<div class='about-card'><h2>${post.title}</h2><p><em>${post.date}</em></p><p>${post.content}</p><button class='button' onclick='renderPosts()'>Volver</button></div>`;
};

document.addEventListener('DOMContentLoaded', renderPosts);