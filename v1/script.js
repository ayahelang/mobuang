// Daftar website (tinggal ganti sesuai kebutuhan)
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

// Elemen slider
const slidesContainer = document.getElementById("slides");
const dotsContainer = document.getElementById("dots");
const sliderElement = document.getElementById("slider");

// Buat slide & dot dinamis
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

function resetAutoSlide() {
  clearInterval(autoSlide);
  startAutoSlide();
}

// Pause on hover
sliderElement.addEventListener("mouseenter", () => clearInterval(autoSlide));
sliderElement.addEventListener("mouseleave", () => startAutoSlide());

// Start
startAutoSlide();
