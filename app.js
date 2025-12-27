const gallery = document.getElementById("gallery")
let page = 1
let loading = false

const loadImages = async () => {
  if (loading) return
  loading = true

  const res = await fetch(`https://picsum.photos/v2/list?page=${page}&limit=12`)
  const data = await res.json()

  data.forEach((img, i) => {
    const card = document.createElement("div")
    card.className = "card"
    card.style.transform = `translateZ(${i * 5}px)`

    const image = document.createElement("img")
    image.src = `https://picsum.photos/id/${img.id}/900/1200`

    const info = document.createElement("div")
    info.className = "info"
    info.textContent = img.author

    card.appendChild(image)
    card.appendChild(info)
    gallery.appendChild(card)
  })

  page++
  loading = false
}

loadImages()

window.addEventListener("scroll", () => {
  const cards = document.querySelectorAll(".card")

  cards.forEach((card, i) => {
    const img = card.querySelector("img")
    const rect = card.getBoundingClientRect()
    const speed = 0.15 + i * 0.015
    const y = rect.top * speed

    img.style.transform = `translateY(${y}px) scale(1.08)`
    card.style.filter = `blur(${Math.abs(y) / 250}px)`
  })

  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 600) {
    loadImages()
  }
})
