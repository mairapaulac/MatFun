import type { Metadata } from "next";
import { Paytone_One } from "next/font/google";
import "./globals.css";

const paytone = Paytone_One({
  subsets: ['latin'], // caracteres que serão carregados
  weight: ['400'],      // essa fonte só tem 400
  variable: '--font-paytone', // opcional, para usar no CSS
});
export const metadata: Metadata = {
  title: "MatFun",
  description: "Plataforma gameficada de matemática para crianças com 10 a 14 anos de idade.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${paytone.variable}  antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
