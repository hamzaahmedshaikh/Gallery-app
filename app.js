const gallery = document.getElementById("gallery");

async function loadImages() {
  const res = await fetch("https://picsum.photos/v2/list?page=1&limit=20");
  const images = await res.json();

  images.forEach((img, index) => {
    const card = document.createElement("div");
    card.className = "card";

    const image = document.createElement("img");
    image.src = `https://picsum.photos/id/${img.id}/800/1000`;
    image.alt = img.author;

    const info = document.createElement("div");
    info.className = "card-info";
    info.innerHTML = `<h3>${img.author}</h3>`;

    card.appendChild(image);
    card.appendChild(info);
    gallery.appendChild(card);

    // Scroll-based parallax
    window.addEventListener("scroll", () => {
      const rect = card.getBoundingClientRect();
      const speed = 0.25 + index * 0.02;
      const offset = rect.top * speed;
      image.style.transform = `translateY(${offset}px) scale(1.05)`;
    });
  });
}

loadImages();
