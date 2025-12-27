const API_URL = 'https://picsum.photos/v2/list?page=1&limit=30';

let images = [];
let observer = null;

async function fetchImages() {
  try {
    const response = await fetch(API_URL);
    images = await response.json();
    renderGallery();
    initScrollAnimations();
  } catch (error) {
    console.error('Error fetching images:', error);
    document.querySelector('.gallery').innerHTML =
      '<p class="error">Failed to load images. Please try again later.</p>';
  }
}

function renderGallery() {
  const gallery = document.querySelector('.gallery');
  gallery.innerHTML = '';

  images.forEach((image, index) => {
    const card = document.createElement('div');
    card.className = 'gallery-item';
    card.dataset.index = index;

    const isLarge = index % 7 === 0 || index % 11 === 0;
    if (isLarge) card.classList.add('large');

    card.innerHTML = `
      <div class="image-wrapper">
        <img
          src="${image.download_url}"
          alt="${image.author}"
          loading="lazy"
        />
        <div class="image-overlay">
          <div class="image-info">
            <h3>${image.author}</h3>
            <p>${image.width} × ${image.height}</p>
          </div>
        </div>
      </div>
    `;

    gallery.appendChild(card);
  });
}

function initScrollAnimations() {
  const items = document.querySelectorAll('.gallery-item');

  observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  items.forEach(item => observer.observe(item));

  window.addEventListener('scroll', handleParallax);
}

function handleParallax() {
  const scrolled = window.pageYOffset;
  const items = document.querySelectorAll('.gallery-item.visible');

  items.forEach((item, index) => {
    const rect = item.getBoundingClientRect();
    const itemTop = rect.top;
    const itemHeight = rect.height;
    const windowHeight = window.innerHeight;

    if (itemTop < windowHeight && itemTop + itemHeight > 0) {
      const speed = (index % 3 + 1) * 0.5;
      const yPos = (scrolled - item.offsetTop) * speed * 0.15;
      const img = item.querySelector('img');
      const scale = 1 + Math.abs(yPos) * 0.0002;

      img.style.transform = `translateY(${yPos}px) scale(${scale})`;
    }
  });
}

document.addEventListener('DOMContentLoaded', fetchImages);
