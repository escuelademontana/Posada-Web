import "./globals.css";
import Script from "next/script";

export const metadata = {
  title: "La Posada | Hostería de montaña en San Martín de los Andes",
  description:
    "La Posada, en Estancia Miralejos, te espera con naturaleza, calma y una experiencia auténtica de montaña cerca de San Martín de los Andes.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        {children}
        <Script src="https://app.hospedarmas.com/embed.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
