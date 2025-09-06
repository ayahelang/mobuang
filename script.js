// Daftar website
const websites = [
  "https://example.com",
  "https://wikipedia.org",
  "https://github.com",
  "https://stackoverflow.com",
  "https://openai.com",
  "https://mozilla.org",
  "https://unsplash.com",
  "https://pexels.com",
  "https://cnn.com",
  "https://bbc.com"
];

// API Screenshot
const apiKey = "44ccf5"; 
const dimension = "1024x768";

// Elemen utama
const slidesContainer = document.getElementById("slides");
const dotsContainer = document.getElementById("dots");
const sliderElement = document.getElementById("slider");
const playPauseBtn = document.getElementById("playPauseBtn");

// Overlay hover
const hoverOverlay = document.getElementById("hoverOverlay");
const hoverImg = document.getElementById("hoverImg");
const hoverLink = document.getElementById("hoverLink");

// Buat slide & dot
websites.forEach((url, index) => {
  const imgSrc = `https://api.screenshotmachine.com?key=${apiKey}&url=${encodeURIComponent(url)}&dimension=${dimension}`;
  
  const slide = document.createElement("div");
  slide.className = "slide";
  slide.innerHTML = `
    <a href="${url}" target="_blank" rel="noopener noreferrer">
      <img src="${imgSrc}" alt="Screenshot of ${url}" loading="lazy">
    </a>
  `;
  slidesContainer.appendChild(slide);

  // Hover event → tampilkan overlay
  const imgEl = slide.querySelector("img");
  imgEl.addEventListener("mouseenter", () => {
    hoverImg.src = imgSrc;
    hoverLink.href = url;
    hoverOverlay.style.display = "block";
  });
});

// Tutup overlay jika mouse keluar dari area overlay (karena ukurannya = gambar)
hoverOverlay.addEventListener("mouseleave", () => {
  hoverOverlay.style.display = "none";
  hoverImg.src = "";
  hoverLink.href = "#";
});

// Dot navigation
websites.forEach((url, index) => {
  const dot = document.createElement("span");
  dot.className = "dot";
  if (index === 0) dot.classList.add("active");
  dot.addEventListener("click", () => {
    currentIndex = index;
    updateSlide();
    resetAutoSlide();
  });
  dotsContainer.appendChild(dot);
});

const slides = document.querySelector(".slides");
const slide = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

let currentIndex = 0;
const totalSlides = slide.length;
const slidesToShow = 3;
let autoSlide;
let isPlaying = true;

// Update posisi slider & dot
function updateSlide() {
  slides.style.transform = `translateX(-${(100 / slidesToShow) * currentIndex}%)`;
  dots.forEach((d, i) => d.classList.toggle("active", i === currentIndex));
}

// Next
nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % (totalSlides - slidesToShow + 1);
  updateSlide();
  resetAutoSlide();
});

// Prev
prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + (totalSlides - slidesToShow + 1)) % (totalSlides - slidesToShow + 1);
  updateSlide();
  resetAutoSlide();
});

// Auto slide
function startAutoSlide() {
  autoSlide = setInterval(() => {
    currentIndex = (currentIndex + 1) % (totalSlides - slidesToShow + 1);
    updateSlide();
  }, 4000);
}
function stopAutoSlide() {
  clearInterval(autoSlide);
}
function resetAutoSlide() {
  if (isPlaying) {
    stopAutoSlide();
    startAutoSlide();
  }
}

// Tombol Play/Pause
playPauseBtn.addEventListener("click", () => {
  if (isPlaying) {
    stopAutoSlide();
    playPauseBtn.textContent = "▶ Play";
  } else {
    startAutoSlide();
    playPauseBtn.textContent = "⏸ Pause";
  }
  isPlaying = !isPlaying;
});

// Pause on hover slider
sliderElement.addEventListener("mouseenter", () => { if (isPlaying) stopAutoSlide(); });
sliderElement.addEventListener("mouseleave", () => { if (isPlaying) startAutoSlide(); });

// Start autoplay
startAutoSlide();
