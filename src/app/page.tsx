'use client'

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ArrowRight, ShieldCheck, Star, Trophy, Users, Menu } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function LandingPage() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="bg-background text-white min-h-screen w-screen overflow-x-hidden">
      {/* Header */}
      <header className="py-4 px-8 flex justify-between items-center bg-gradient-to-r from-[#2B3A67] via-[#314991] to-[#2B3A67] border-b border-white/10 drop-shadow-xl sticky top-0 z-50">
        <div className="flex items-center">
            <Image src="/logomatfun.svg" alt="MatFun Logo" width={150} height={50} />
            <nav className="hidden lg:flex items-center space-x-6 text-lg ml-10">
              <Link href="#como-funciona" className="hover:text-gray-300 transition-colors">Como Funciona</Link>
              <Link href="#modulos" className="hover:text-gray-300 transition-colors">Módulos</Link>
              <Link href="#ranking" className="hover:text-gray-300 transition-colors">Ranking</Link>
              <Link href="#educadores" className="hover:text-gray-300 transition-colors">Educadores</Link>
            </nav>
        </div>
        <div className="hidden lg:flex items-center gap-2">
          <Button onClick={() => router.push('/auth/signin')} variant="secondary" className="transition-all duration-300 hover:scale-105 active:scale-95">Entrar</Button>
          <Button onClick={() => router.push('/auth/signup')} className="transition-all duration-300 hover:scale-105 active:scale-95">Começar Agora</Button>
        </div>
        <div className="lg:hidden">
            <Button onClick={() => setIsMenuOpen(!isMenuOpen)} variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
            </Button>
        </div>
      </header>

      {isMenuOpen && (
        <div className="lg:hidden bg-gradient-to-b from-[#314991] to-[#2B3A67] py-4 px-8 space-y-4">
            <Link href="#como-funciona" className="block hover:text-gray-300 transition-colors">Como Funciona</Link>
            <Link href="#modulos" className="block hover:text-gray-300 transition-colors">Módulos</Link>
            <Link href="#ranking" className="block hover:text-gray-300 transition-colors">Ranking</Link>
            <Link href="#educadores" className="block hover:text-gray-300 transition-colors">Educadores</Link>
            <div className="flex flex-col space-y-2">
                <Button onClick={() => router.push('/auth/signin')} variant="secondary">Entrar</Button>
                <Button onClick={() => router.push('/auth/signup')}>Começar Agora</Button>
            </div>
        </div>
      )}

      {/* Hero Section */}
      <main className="text-center py-20 px-8 bg-pattern">
        <div className="mb-12 ">
            {/* <Image src="/logo-matfun.svg" alt="MatFun Logo" width={400} height={128} className="mx-auto"/> */}
            <Image src="/logomatfun.svg" alt="MatFun Logo" width={800} height={256} className="mx-auto"/>
        </div>
        <h2 className="text-5xl font-bold mb-4 text-shadow">Aprenda Matemática Jogando!</h2>
        <p className="text-lg max-w-2xl mx-auto mb-8 text-shadow">
          Uma plataforma divertida que ajuda alunos da rede pública a dominar a matemática e se preparar para o SAEB.
        </p>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <Button onClick={() => router.push('/auth/signup')} size="lg" className="w-full md:w-auto transition-all duration-300 hover:scale-105 active:scale-95 rounded-4xl">Começar Agora <ArrowRight className="ml-2" /></Button>
          <Button onClick={() => router.push('#como-funciona')} size="lg" variant="secondary" className="w-full md:w-auto transition-all duration-300 hover:scale-105 active:scale-95 rounded-4xl">Ver como funciona</Button>
        </div>
      </main>

      {/* Como Funciona Section */}
      <section id="como-funciona" className="py-20 px-8 bg-gradient-to-b from-white to-blue-100 text-gray-800">
        <h3 className="text-4xl font-bold text-center mb-12">Como Funciona</h3>
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center p-6 rounded-lg shadow-lg bg-white/50 backdrop-blur-sm">
            <Star className="mx-auto h-12 w-12 text-yellow-500 mb-4" />
            <h4 className="text-2xl font-bold mb-2">Escolha um módulo</h4>
            <p>Frações, Porcentagem, Geometria e muito mais.</p>
          </div>
          <div className="text-center p-6 rounded-lg shadow-lg bg-white/50 backdrop-blur-sm">
            <Trophy className="mx-auto h-12 w-12 text-yellow-500 mb-4" />
            <h4 className="text-2xl font-bold mb-2">Resolva os desafios</h4>
            <p>Responda perguntas e ganhe pontos.</p>
          </div>
          <div className="text-center p-6 rounded-lg shadow-lg bg-white/50 backdrop-blur-sm">
            <Users className="mx-auto h-12 w-12 text-yellow-500 mb-4" />
            <h4 className="text-2xl font-bold mb-2">Suba no ranking!</h4>
            <p>Compare seu desempenho com colegas e escolas.</p>
          </div>
        </div>
      </section>

      {/* Conteúdo Educacional (Módulos) Section */}
      <section id="modulos" className="py-20 px-8 bg-pattern">
        <h3 className="text-4xl font-bold text-center mb-12 text-shadow">Conteúdo Educacional</h3>
        {/* Placeholder for modules */}
        <div className="text-center text-shadow">
          <p>Em breve: Operações e Aventuras Numéricas, Desafio das Frações, Missão Porcentagem e mais!</p>
        </div>
      </section>

      {/* Ranking Section */}
      <section id="ranking" className="py-20 px-8 bg-gradient-to-b from-white to-blue-100 text-gray-800">
        <h3 className="text-4xl font-bold text-center mb-12">Sistema de Ranking e Recompensas</h3>
        {/* Placeholder for ranking */}
        <div className="text-center">
          <p>Em breve: Ranking por aluno, turma e escola, medalhas virtuais e conquistas!</p>
        </div>
      </section>

      {/* Para Professores e Escolas Section */}
      <section id="educadores" className="py-20 px-8 bg-pattern">
        <h3 className="text-4xl font-bold text-center mb-12 text-shadow">Para Professores e Escolas</h3>
        {/* Placeholder for educators */}
        <div className="text-center text-shadow">
          <p>Em breve: Acompanhamento de desempenho, relatórios automáticos e mais!</p>
        </div>
      </section>

      {/* Depoimentos Section */}
      <section id="depoimentos" className="py-20 px-8 bg-gradient-to-b from-white to-blue-100 text-gray-800">
        <h3 className="text-4xl font-bold text-center mb-12">Depoimentos</h3>
        {/* Placeholder for testimonials */}
        <div className="text-center">
          <p>“Agora estudar matemática é divertido!” — Ana, 12 anos</p>
        </div>
      </section>

      {/* Segurança e Inclusão Section */}
      <section id="seguranca" className="py-20 px-8 bg-pattern">
        <h3 className="text-4xl font-bold text-center mb-12 text-shadow">Segurança e Inclusão</h3>
        <div className="max-w-2xl mx-auto text-center">
          <ShieldCheck className="mx-auto h-12 w-12 text-green-400 mb-4" />
          <p className="text-shadow">Plataforma segura, sem anúncios, que respeita a privacidade dos alunos e é acessível em diversos dispositivos.</p>
        </div>
      </section>

      {/* Call to Action Final */}
      <section className="py-20 px-8 text-center bg-gradient-to-b from-white to-blue-100 text-gray-800">
        <h3 className="text-4xl font-bold mb-4">Pronto para entrar no jogo?</h3>
        <Button onClick={() => router.push('/auth/signup')} size="lg" className="transition-all duration-300 hover:scale-105 active:scale-95 rounded-bl-4xl rounded-tr-4xl">Começar Agora!</Button>
      </section>

      {/* Footer */}
      <footer className="py-8 px-8 border-t border-gray-700 text-center bg-gray-800 bg-opacity-50">
        <p>&copy; 2025 MatFun. Todos os direitos reservados.</p>
        <div className="mt-4 space-x-4">
          <Link href="#" className="hover:text-gray-300">Política de Privacidade</Link>
          <Link href="#" className="hover:text-gray-300">Termos de Uso</Link>
          <Link href="#" className="hover:text-gray-300">Contato</Link>
        </div>
      </footer>
    </div>
  );
}