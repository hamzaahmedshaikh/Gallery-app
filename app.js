const galleryContainer = document.getElementById('gallery');

const API_URL = 'https://picsum.photos/v2/list?limit=15';

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
        
        if (images.length === 0) {
            galleryContainer.innerHTML = "<p>No images found.</p>";
            return;
        }

        images.forEach(data => {
            // OPTIMIZED: Transform the URL to get a specific size (500x500)
            // The default download_url can be too large to load quickly
            const optimizedUrl = `https://picsum.photos/id/${data.id}/500/500`;
            
            const card = createCard(data, optimizedUrl);
            galleryContainer.appendChild(card);
            observer.observe(card);
        });
    } catch (error) {
        console.error("Error loading images:", error);
        galleryContainer.innerHTML = "<p>API Error. Check your internet connection.</p>";
    }
}

function createCard(data, url) {
    const card = document.createElement('div');
    card.className = 'image-card';
    
    card.innerHTML = `
        <div class="img-wrapper">
            <img src="${url}" alt="Photo by ${data.author}">
        </div>
        <span class="author-name">${data.author}</span>
    `;
    
    return card;
}

loadGallery();
