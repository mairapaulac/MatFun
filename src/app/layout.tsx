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
  description: "Plataforma gameficada de matemática para estudantes do 8º e 9º ano do ensino fundamental.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </head>
      <body
        className={`${paytone.variable}  antialiased touch-pan-x touch-pan-y`}
      >
        {children}
      </body>
    </html>
  );
}
