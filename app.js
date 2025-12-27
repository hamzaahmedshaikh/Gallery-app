const galleryContainer = document.getElementById('gallery');
const API_URL = 'https://picsum.photos/v2/list?limit=12';

// Create observer to trigger animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

async function loadGallery() {
    try {
        const response = await fetch(API_URL);
        const images = await response.json();
        
        images.forEach(data => {
            const card = createCard(data);
            galleryContainer.appendChild(card);
            observer.observe(card);
        });
    } catch (error) {
        console.error("Error loading images:", error);
    }
}

function createCard(data) {
    const card = document.createElement('div');
    card.className = 'image-card';
    
    card.innerHTML = `
        <div class="img-wrapper">
            <img src="${data.download_url}" alt="Photo by ${data.author}" loading="lazy">
        </div>
        <span class="author-name">${data.author}</span>
    `;
    
    return card;
}

// Initial Call
loadGallery();
