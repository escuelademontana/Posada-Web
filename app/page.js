"use client";

import { useEffect, useState } from "react";

const headerSlides = [{ src: "/assets/header/header-2.jpg", alt: "Vista del paisaje desde La Posada" }];

const aboutSlides = [
  { src: "/assets/header/header-1.jpg", alt: "La Posada entre árboles y ladera de montaña" },
  { src: "/assets/header/header-3.jpg", alt: "Interior cálido con chimenea y vista abierta" },
  { src: "/assets/header/header-4.jpg", alt: "Paisaje patagónico desde La Posada al atardecer" },
  { src: "/assets/header/header-5.jpg", alt: "Chimenea encendida con vista al paisaje de la posada" },
  { src: "/assets/header/header-6.jpg", alt: "Grupo disfrutando el atardecer en la terraza de La Posada" },
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

function ImageCarousel({ slides, intervalMs, className, slideClassName, onOpen }) {
  const [activeIndex] = useActiveSlide(slides.length, intervalMs);
  const normalizedSlides = slides.map((slide) => (typeof slide === "string" ? { src: slide, alt: "" } : slide));
  const activeSlide = normalizedSlides[activeIndex];

  return (
    <div
      className={className}
      aria-hidden={onOpen ? undefined : true}
      role={onOpen ? "button" : undefined}
      tabIndex={onOpen ? 0 : undefined}
      onClick={onOpen ? () => onOpen(activeSlide) : undefined}
      onKeyDown={
        onOpen
          ? (event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                onOpen(activeSlide);
              }
            }
          : undefined
      }
    >
      {normalizedSlides.map((slide, index) => (
        <div
          key={slide.src}
          className={`${slideClassName} ${index === activeIndex ? "is-active" : ""}`}
          style={{ backgroundImage: `url('${slide.src}')` }}
        />
      ))}
    </div>
  );
}

function RoomCarousel({ slides, title, onOpen }) {
  const [activeIndex, setActiveIndex] = useActiveSlide(slides.length, 4200);
  const activeSlide = slides[activeIndex];

  return (
    <div className="room-carousel">
      <div
        className="room-carousel__track"
        role={onOpen ? "button" : undefined}
        tabIndex={onOpen ? 0 : undefined}
        onClick={onOpen ? () => onOpen(activeSlide) : undefined}
        onKeyDown={
          onOpen
            ? (event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  onOpen(activeSlide);
                }
              }
            : undefined
        }
      >
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
        onClick={(event) => {
          event.stopPropagation();
          setActiveIndex((current) => (current - 1 + slides.length) % slides.length);
        }}
      >
        ‹
      </button>
      <button
        className="room-carousel__nav room-carousel__nav--next"
        type="button"
        aria-label={`Imagen siguiente de ${title.toLowerCase()}`}
        onClick={(event) => {
          event.stopPropagation();
          setActiveIndex((current) => (current + 1) % slides.length);
        }}
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
            onClick={(event) => {
              event.stopPropagation();
              setActiveIndex(index);
            }}
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
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState(null);

  const openLightbox = (image) => {
    if (!image) return;
    setLightboxImage(image);
  };

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

  useEffect(() => {
    if (!lightboxImage) return undefined;

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setLightboxImage(null);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [lightboxImage]);

  return (
    <>
      {lightboxImage ? (
        <div className="image-lightbox" role="dialog" aria-modal="true" aria-label={lightboxImage.alt}>
          <button
            className="image-lightbox__backdrop"
            type="button"
            aria-label="Cerrar imagen ampliada"
            onClick={() => setLightboxImage(null)}
          />
          <figure className="image-lightbox__dialog">
            <img src={lightboxImage.src} alt={lightboxImage.alt} />
            <figcaption>{lightboxImage.alt}</figcaption>
          </figure>
          <button
            className="image-lightbox__close"
            type="button"
            aria-label="Cerrar imagen ampliada"
            onClick={() => setLightboxImage(null)}
          >
            ×
          </button>
        </div>
      ) : null}

      <header className="hero" id="inicio">
        <div className="hero__media">
          <ImageCarousel
            slides={headerSlides}
            intervalMs={0}
            className="hero__slides hero__slides--single"
            slideClassName="hero__slide"
            onOpen={openLightbox}
          />
          <div className="hero__overlay hero__overlay--soft" />
          <nav className="top-nav" aria-label="Secciones principales">
            <div className={`top-nav__links top-nav__links--left ${isNavOpen ? "is-open" : ""}`} id="top-nav-links">
              <a href="#habitaciones" onClick={() => setIsNavOpen(false)}>
                Habitaciones
              </a>
              <a href="#servicios" onClick={() => setIsNavOpen(false)}>
                Servicios
              </a>
            </div>
            <a className="top-nav__brand" href="#inicio" aria-label="Volver al inicio">
              <img src="/assets/logo.svg" alt="La Posada" />
            </a>
            <button
              className="top-nav__mobile-brand"
              type="button"
              aria-label={isNavOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={isNavOpen}
              aria-controls="top-nav-links"
              onClick={() => setIsNavOpen((current) => !current)}
            >
              <img src="/assets/logo-reducido.svg" alt="La Posada" />
            </button>
            <div className={`top-nav__links top-nav__links--right ${isNavOpen ? "is-open" : ""}`}>
              <a href="#experiencias" onClick={() => setIsNavOpen(false)}>
                Experiencias
              </a>
              <a href="#ubicacion" onClick={() => setIsNavOpen(false)}>
                Ubicación
              </a>
            </div>
            <button
              className="top-nav__toggle"
              type="button"
              aria-label={isNavOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={isNavOpen}
              aria-controls="top-nav-links"
              onClick={() => setIsNavOpen((current) => !current)}
            >
              <span />
              <span />
              <span />
            </button>
          </nav>
          <div className="hero__headline reveal is-visible">
            <h1>
              <span>Un lugar en la montaña para</span>
              <span>conectar con la naturaleza</span>
            </h1>
            <p>
              En la Estancia Miralejos, a 30 minutos de San Martín de los Andes, te esperamos con vistas únicas, tranquilidad y una experiencia auténtica en la Patagonia.
            </p>
            <a
              className="button button--outline"
              href="https://wa.me/5490000000000?text=Hola%2C%20quiero%20consultar%20disponibilidad%20en%20La%20Posada."
              target="_blank"
              rel="noreferrer"
            >
              CONSULTAR DISPONIBILIDAD
            </a>
          </div>
        </div>

      </header>

      <main>
        <section className="section section--light" id="sobre-la-posada">
          <div className="container about-layout">
            <div className="about-layout__content reveal">
              <p className="eyebrow">Sobre la Posada</p>
              <h2>Una forma distinta de tomarse una pausa</h2>
              <p>
                Con solo seis habitaciones, la experiencia es íntima y sin masividad. Cada espacio invita a quedarse, a bajar el ritmo y a disfrutar del paisaje sin apuro.
              </p>
              <p>
                Podés alojarte por habitación o reservar la posada completa, adaptándose tanto a escapadas personales como a estadías en grupo.
              </p>
              <p className="about-layout__closing">Viví la montaña a tu ritmo.</p>
              <a
                className="about-layout__cta"
                href="https://wa.me/5490000000000?text=Hola%2C%20quiero%20consultar%20disponibilidad%20en%20La%20Posada."
                target="_blank"
                rel="noreferrer"
              >
                Consultá disponibilidad y reservá tu lugar.
              </a>
            </div>

            <div className="about-layout__carousel reveal">
              <ImageCarousel
                slides={aboutSlides}
                intervalMs={4200}
                className="about-carousel"
                slideClassName="about-carousel__slide"
                onOpen={openLightbox}
              />
            </div>
          </div>
        </section>

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
                  <RoomCarousel slides={room.slides} title={room.title} onOpen={openLightbox} />
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
          <div className="container">
            <div className="service-block service-block--plain reveal">
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
          </div>
        </section>

        <section className="section section--light" id="experiencias">
          <div className="container">
            <div className="service-block service-block--accent reveal">
              <p className="eyebrow">A medida de tu viaje</p>
              <h2>Experiencias opcionales</h2>
              <p>Si querés llevar tu experiencia un paso más allá, podés sumar:</p>
              <div className="experience-grid">
                {optionalExperiences.map((experience) => (
                  <article
                    className="experience-card"
                    key={experience.title}
                    role="button"
                    tabIndex={0}
                    onClick={() => openLightbox({ src: experience.src, alt: experience.title })}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        openLightbox({ src: experience.src, alt: experience.title });
                      }
                    }}
                  >
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
            <div
              className="split-layout__media reveal"
              role="button"
              tabIndex={0}
              onClick={() =>
                openLightbox({
                  src: "/assets/header/header-7.jpg",
                  alt: "Vista aérea del barrio y paisaje patagónico",
                })
              }
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  openLightbox({
                    src: "/assets/header/header-7.jpg",
                    alt: "Vista aérea del barrio y paisaje patagónico",
                  });
                }
              }}
            >
              <img
                src="/assets/header/header-7.jpg"
                alt="Vista aérea del barrio y paisaje patagónico"
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

      <footer className="footer">
        <div className="container footer__inner">
          <a className="footer__brand" href="#inicio" aria-label="Volver al inicio">
            <img src="/assets/logo.svg" alt="La Posada" />
          </a>

          <div className="footer__socials" aria-label="Redes sociales">
            <a className="footer__social" href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <rect x="4" y="4" width="16" height="16" rx="4" ry="4" fill="none" stroke="currentColor" strokeWidth="1.8" />
                <circle cx="12" cy="12" r="4.1" fill="none" stroke="currentColor" strokeWidth="1.8" />
                <circle cx="16.8" cy="7.2" r="1.1" fill="currentColor" />
              </svg>
            </a>

            <a className="footer__social" href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M14.2 8.2H16V5.4h-1.8c-2.2 0-3.8 1.4-3.8 4v1.8H8.1v2.8h2.3V19h2.8v-5h2.3l.4-2.8h-2.7V9.8c0-.9.3-1.6 1.4-1.6Z"
                  fill="currentColor"
                />
              </svg>
            </a>
          </div>

          <p className="footer__copy">Estancia Miralejos · San Martín de los Andes, Neuquén, Argentina</p>
        </div>
      </footer>
    </>
  );
}
