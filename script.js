const slides = Array.from(document.querySelectorAll(".hero__slide"));
const reveals = document.querySelectorAll(".reveal");
const roomCarousels = document.querySelectorAll("[data-carousel]");

let currentSlide = 0;

function showNextSlide() {
  if (slides.length <= 1) return;

  slides[currentSlide].classList.remove("is-active");
  currentSlide = (currentSlide + 1) % slides.length;
  slides[currentSlide].classList.add("is-active");
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.18,
  }
);

reveals.forEach((element) => observer.observe(element));

roomCarousels.forEach((carousel) => {
  const roomSlides = Array.from(
    carousel.querySelectorAll(".room-carousel__slide")
  );
  const dots = Array.from(carousel.querySelectorAll(".room-carousel__dot"));
  const prevButton = carousel.querySelector("[data-carousel-prev]");
  const nextButton = carousel.querySelector("[data-carousel-next]");
  let activeIndex = 0;

  function setActiveSlide(nextIndex) {
    roomSlides[activeIndex].classList.remove("is-active");
    dots[activeIndex].classList.remove("is-active");

    activeIndex = (nextIndex + roomSlides.length) % roomSlides.length;

    roomSlides[activeIndex].classList.add("is-active");
    dots[activeIndex].classList.add("is-active");
  }

  prevButton?.addEventListener("click", () => setActiveSlide(activeIndex - 1));
  nextButton?.addEventListener("click", () => setActiveSlide(activeIndex + 1));

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => setActiveSlide(index));
  });

  window.setInterval(() => setActiveSlide(activeIndex + 1), 4200);
});

window.setInterval(showNextSlide, 5200);
