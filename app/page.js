"use client";

import { useEffect, useState } from "react";

const heroSlides = [
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1600&q=80",
];

const rooms = [
  {
    title: "Habitaciones dobles",
    copy: "Ideales para parejas o escapadas tranquilas. Con baño en suite y vistas al entorno natural.",
    slides: [
      { src: "/assets/rooms/doble-1.jpg", alt: "Habitación doble con cama matrimonial y terminaciones en madera" },
      { src: "/assets/rooms/doble-2.jpg", alt: "Detalle de la cama y textiles de la habitación doble" },
      { src: "/assets/rooms/doble-3.jpg", alt: "Habitación doble con camas y luz cálida de montaña" },
      { src: "/assets/rooms/doble-4.jpg", alt: "Vista abierta a la montaña desde la habitación doble" },
    ],
  },
  {
    title: "Suites cuádruples",
    copy: "Espacios amplios y funcionales para hasta 4 personas, pensados para familias, grupos o estadías más largas. Cuentan con dos habitaciones y un baño.",
    slides: [
      { src: "/assets/rooms/cuadruple-1.jpg", alt: "Suite cuádruple con cama principal y vista a la montaña" },
      { src: "/assets/rooms/cuadruple-2.jpg", alt: "Detalle cálido de la cama principal de la suite cuádruple" },
      { src: "/assets/rooms/cuadruple-3.jpg", alt: "Habitación principal de la suite cuádruple con ventana y vista" },
      { src: "/assets/rooms/cuadruple-4.jpg", alt: "Vista abierta a la montaña desde la suite cuádruple" },
      { src: "/assets/rooms/cuadruple-6.jpg", alt: "Dormitorio secundario de la suite cuádruple" },
      { src: "/assets/rooms/cuadruple-7.jpg", alt: "Segundo ambiente de descanso en la suite cuádruple" },
      { src: "/assets/rooms/cuadruple-8.jpg", alt: "Baño de la suite cuádruple con doble bacha" },
    ],
  },
];

const includedServices = [
  { icon: "/assets/icons/desayuno.svg", label: "Desayuno" },
  { icon: "/assets/icons/mucama.svg", label: "Servicio de limpieza" },
  { icon: "/assets/icons/espacios-comunes.svg", label: "Espacios comunes" },
  { icon: "/assets/icons/entorno-natural.svg", label: "Entorno natural con senderos" },
  { icon: "/assets/icons/estacionamiento.svg", label: "Estacionamiento" },
];

const optionalExperiences = [
  {
    title: "Servicio de transfer 4x4",
    copy: "Una forma cómoda y segura de moverte por caminos de montaña y llegar a cada experiencia con tranquilidad.",
    src: "/assets/experiences/transfer-4x4.jpg",
  },
  {
    title: "Servicio de cena",
    copy: "Sabores caseros y una propuesta cálida para cerrar el día sin salir del entorno de la posada.",
    src: "/assets/experiences/cena.jpg",
  },
  {
    title: "Caminatas",
    copy: "Senderos y recorridos para descubrir el bosque, respirar aire puro y conectar con la montaña a otro ritmo.",
    src: "/assets/experiences/caminata.jpg",
  },
];

function useActiveSlide(length, intervalMs) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (length <= 1) return undefined;

    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % length);
    }, intervalMs);

    return () => window.clearInterval(timer);
  }, [length, intervalMs]);

  return [index, setIndex];
}

function HeroCarousel() {
  const [activeIndex] = useActiveSlide(heroSlides.length, 5200);

  return (
    <div className="hero__slides" aria-hidden="true">
      {heroSlides.map((src, index) => (
        <div
          key={src}
          className={`hero__slide ${index === activeIndex ? "is-active" : ""}`}
          style={{ backgroundImage: `url('${src}')` }}
        />
      ))}
    </div>
  );
}

function RoomCarousel({ slides, title }) {
  const [activeIndex, setActiveIndex] = useActiveSlide(slides.length, 4200);

  return (
    <div className="room-carousel">
      <div className="room-carousel__track">
        {slides.map((slide, index) => (
          <img
            key={slide.src}
            className={`room-carousel__slide ${index === activeIndex ? "is-active" : ""}`}
            src={slide.src}
            alt={slide.alt}
          />
        ))}
      </div>
      <button
        className="room-carousel__nav room-carousel__nav--prev"
        type="button"
        aria-label={`Imagen anterior de ${title.toLowerCase()}`}
        onClick={() => setActiveIndex((current) => (current - 1 + slides.length) % slides.length)}
      >
        ‹
      </button>
      <button
        className="room-carousel__nav room-carousel__nav--next"
        type="button"
        aria-label={`Imagen siguiente de ${title.toLowerCase()}`}
        onClick={() => setActiveIndex((current) => (current + 1) % slides.length)}
      >
        ›
      </button>
      <div className="room-carousel__dots" aria-label={`Galería de ${title.toLowerCase()}`}>
        {slides.map((slide, index) => (
          <button
            key={slide.src}
            className={`room-carousel__dot ${index === activeIndex ? "is-active" : ""}`}
            type="button"
            aria-label={`Ver imagen ${index + 1} de ${title.toLowerCase()}`}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}

function SectionHeading({ eyebrow, title, copy }) {
  return (
    <div className="section-heading reveal">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      <p>{copy}</p>
    </div>
  );
}

export default function Page() {
  useEffect(() => {
    const elements = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18 }
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <a
        className="floating-whatsapp"
        href="https://wa.me/5490000000000?text=Hola%2C%20quiero%20consultar%20disponibilidad%20en%20La%20Posada."
        target="_blank"
        rel="noreferrer"
        aria-label="Consultar por WhatsApp"
      >
        WhatsApp
      </a>

      <header className="hero" id="inicio">
        <HeroCarousel />
        <div className="hero__overlay" />

        <nav className="topbar">
          <div className="brand">
            <span className="brand__eyebrow">Estancia Miralejos</span>
            <span className="brand__name">La Posada</span>
          </div>
          <a
            className="topbar__cta"
            href="https://wa.me/5490000000000?text=Hola%2C%20quiero%20consultar%20disponibilidad%20en%20La%20Posada."
            target="_blank"
            rel="noreferrer"
          >
            Consultar disponibilidad
          </a>
        </nav>

        <div className="hero__content container reveal">
          <p className="eyebrow">Hostería de montaña en San Martín de los Andes</p>
          <h1>La Posada. Un lugar en la montaña para conectar con la naturaleza</h1>
          <p className="hero__lead">
            En la Estancia Miralejos, a 30 minutos de San Martín de los Andes, te esperamos con vistas únicas, tranquilidad y una experiencia auténtica en la Patagonia.
          </p>
          <a
            className="button button--primary"
            href="https://wa.me/5490000000000?text=Hola%2C%20quiero%20consultar%20disponibilidad%20en%20La%20Posada."
            target="_blank"
            rel="noreferrer"
          >
            Consultar disponibilidad
          </a>
        </div>
      </header>

      <main>
        <section className="section section--light" id="habitaciones">
          <div className="container">
            <SectionHeading
              eyebrow="Descanso con identidad"
              title="Habitaciones pensadas para descansar"
              copy="Nuestras habitaciones combinan calidez, vistas abiertas y la tranquilidad del entorno natural. Cada espacio está diseñado para que puedas desconectar, descansar y disfrutar del ritmo de la montaña."
            />

            <div className="room-grid">
              {rooms.map((room) => (
                <article className="room-card reveal" key={room.title}>
                  <RoomCarousel slides={room.slides} title={room.title} />
                  <div className="room-card__body">
                    <h3>{room.title}</h3>
                    <p>{room.copy}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section section--earth" id="servicios">
          <div className="container services-layout">
            <div className="service-block reveal">
              <p className="eyebrow">Comodidad simple</p>
              <h2>Servicios incluidos</h2>
              <p>Buscamos que tu estadía sea cómoda y simple desde el primer momento.</p>
              <ul className="icon-list">
                {includedServices.map((service) => (
                  <li key={service.label}>
                    <img src={service.icon} alt="" aria-hidden="true" />
                    <span>{service.label}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="service-block service-block--accent reveal">
              <p className="eyebrow">A medida de tu viaje</p>
              <h2>Experiencias opcionales</h2>
              <p>Si querés llevar tu experiencia un paso más allá, podés sumar:</p>
              <div className="experience-grid">
                {optionalExperiences.map((experience) => (
                  <article className="experience-card" key={experience.title}>
                    <img src={experience.src} alt={experience.title} />
                    <div className="experience-card__body">
                      <h3>{experience.title}</h3>
                      <p>{experience.copy}</p>
                    </div>
                  </article>
                ))}
              </div>
              <p className="service-note">Te ayudamos a organizar cada detalle para que solo tengas que disfrutar.</p>
            </div>
          </div>
        </section>

        <section className="section section--light" id="ubicacion">
          <div className="container split-layout">
            <div className="split-layout__media reveal">
              <img
                src="https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1400&q=80"
                alt="Paisaje de montaña y bosque patagónico"
              />
            </div>

            <div className="split-layout__content reveal">
              <p className="eyebrow">El entorno</p>
              <h2>Naturaleza, tranquilidad y aventura</h2>
              <p>
                Estamos ubicados en la Estancia Miralejos, un barrio privado a 30 minutos de San Martín de los Andes. Además contamos con un camino interno, que no pasa por el pueblo, a 30 minutos del Cerro Chapelco. Un entorno único donde el bosque, la montaña y el silencio son protagonistas.
              </p>
              <p>Desde la posada podés acceder a senderos, miradores y paisajes abiertos.</p>

              <div className="map-placeholder" aria-label="Mapa de ubicación">
                <div>
                  <span className="map-placeholder__label">Ubicación</span>
                  <strong>Estancia Miralejos</strong>
                  <p>San Martín de los Andes, Neuquén, Argentina</p>
                </div>
                <a
                  className="button button--secondary"
                  href="https://www.google.com/maps/search/San+Mart%C3%ADn+de+los+Andes+Estancia+Miralejos"
                  target="_blank"
                  rel="noreferrer"
                >
                  Ver mapa
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="section section--forest" id="actividades">
          <div className="container">
            <SectionHeading
              eyebrow="Todo el año"
              title="Experiencias en la montaña todo el año"
              copy="La montaña ofrece algo distinto en cada estación. Desde la posada podés vivir la naturaleza de múltiples formas."
            />

            <div className="activities-grid">
              <article className="activity-card reveal">
                <span className="activity-card__season">Invierno</span>
                <p>A solo 30 minutos del Cerro Chapelco, ideal para esquí y snowboard. También caminatas en la nieve y paisajes únicos.</p>
              </article>

              <article className="activity-card reveal">
                <span className="activity-card__season">Verano</span>
                <p>Senderismo, miradores, lagos y actividades al aire libre en un entorno natural privilegiado.</p>
              </article>

              <article className="activity-card reveal">
                <span className="activity-card__season">Todo el año</span>
                <p>Espacios para descansar, reconectar y disfrutar del ritmo de la montaña.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="section section--cta" id="contacto">
          <div className="container cta-card reveal">
            <p className="eyebrow">Tu próxima escapada</p>
            <h2>Viví una experiencia de Montaña en La Posada</h2>
            <p>Escribinos y te ayudamos a planificar tu estadía.</p>
            <a
              className="button button--primary"
              href="https://wa.me/5490000000000?text=Hola%2C%20quiero%20consultar%20por%20mi%20estad%C3%ADa%20en%20La%20Posada."
              target="_blank"
              rel="noreferrer"
            >
              Consultar por WhatsApp
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
