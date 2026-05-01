import { Manrope, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-serif",
});

export const metadata = {
  title: "La Posada | Hostería de montaña en San Martín de los Andes",
  description:
    "La Posada, en Estancia Miralejos, te espera con naturaleza, calma y una experiencia auténtica de montaña cerca de San Martín de los Andes.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={`${manrope.variable} ${cormorant.variable}`}>
        {children}
      </body>
    </html>
  );
}
