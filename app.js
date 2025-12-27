const gallery = document.getElementById("gallery")

let page = 1
let busy = false
let cards = []

const loadImages = async () => {
  if (busy) return
  busy = true

  const res = await fetch(`https://picsum.photos/v2/list?page=${page}&limit=14`)
  const data = await res.json()

  data.forEach((img, i) => {
    const card = document.createElement("div")
    card.className = "card"

    const image = new Image()
    image.src = `https://picsum.photos/id/${img.id}/900/1200`

    const info = document.createElement("div")
    info.className = "info"
    info.textContent = img.author

    card.appendChild(image)
    card.appendChild(info)
    gallery.appendChild(card)

    cards.push({ card, image, speed: 0.12 + (i % 6) * 0.03 })
  })

  page++
  busy = false
}

loadImages()

let ticking = false

const animate = () => {
  cards.forEach(({ card, image, speed }) => {
    const rect = card.getBoundingClientRect()
    const offset = rect.top * speed

    image.style.transform = `translateY(${offset}px) scale(1.08)`
    card.style.filter = `blur(${Math.min(Math.abs(offset) / 300, 2)}px)`
  })

  ticking = false
}

window.addEventListener("scroll", () => {
  if (!ticking) {
    requestAnimationFrame(animate)
    ticking = true
  }

  if (window.innerHeight + window.scrollY > document.body.offsetHeight - 700) {
    loadImages()
  }
})
