'use client'

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ArrowRight, ShieldCheck, Star, Trophy, Users, Menu, Medal, ClipboardList, BarChart, School, Calculator, Percent, Scaling, DivideSquareIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function LandingPage() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const testimonials = [
    {
      name: "Aluna",
      age: 12,
      school: "Escola Estadual",
      text: "Agora estudar matemática é divertido! Consigo entender melhor os conceitos.",
    },
    {
      name: "Aluno",
      age: 13,
      school: "Escola Estadual",
      text: "Adoro competir com meus colegas. Melhorei muito meu desempenho!",
    },
    {
      name: "Aluna",
      age: 11,
      school: "Escola Estadual",
      text: "Os desafios são legais e não fico cansada. Quero jogar todos os dias!",
    },
  ]
  return (
    <div className="bg-background text-white min-h-screen w-screen overflow-x-hidden">
      {/* Header */}
      <header className="py-4 px-8 flex justify-between items-center  bg[#334a91]  border-b border-gray-700  sticky top-0 z-50">
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
        <div className="lg:hidden bg-[#2B3A67] py-4 px-8 space-y-4">
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
        <h2 className="text-5xl font-normal mb-4 text-shadow">Aprenda Matemática Jogando!</h2>
        <p className="text-lg max-w-2xl mx-auto mb-8 text-shadow">
          Uma plataforma divertida que ajuda alunos da rede pública a dominar a matemática e se preparar para o SAEB.
        </p>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <Button onClick={() => router.push('/auth/signup')} size="lg" className="w-full md:w-auto transition-all duration-300 hover:scale-105 active:scale-95 rounded-4xl">Começar Agora <ArrowRight className="ml-2" /></Button>
          <Button onClick={() => router.push('#como-funciona')} size="lg" variant="secondary" className="w-full md:w-auto transition-all duration-300 hover:scale-105 active:scale-95 rounded-4xl">Ver como funciona</Button>
        </div>
      </main>

      {/* Como Funciona Section */}
      <section id="como-funciona" className="py-20 px-8 bg-white  text-gray-800">
        <h3 className="text-4xl font-normal text-center mb-12">Como Funciona</h3>
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center p-6 rounded-lg shadow-lg bg-gray-800 text-white">
            <Star className="mx-auto h-12 w-12 text-yellow-500 mb-4" />
            <h4 className="text-2xl font-normal mb-2">Escolha um módulo</h4>
            <p>Frações, Porcentagem, Geometria e muito mais.</p>
          </div>
          <div className="text-center p-6 rounded-lg shadow-lg bg-gray-800 text-white">
            <Trophy className="mx-auto h-12 w-12 text-yellow-500 mb-4" />
            <h4 className="text-2xl font-normal mb-2">Resolva os desafios</h4>
            <p>Responda perguntas e ganhe pontos.</p>
          </div>
          <div className="text-center p-6 rounded-lg shadow-lg bg-gray-800 text-white">
            <Users className="mx-auto h-12 w-12 text-yellow-500 mb-4" />
            <h4 className="text-2xl font-normal mb-2">Suba no ranking!</h4>
            <p>Compare seu desempenho com colegas e escolas.</p>
          </div>
        </div>
      </section>

      {/* Conteúdo Educacional (Módulos) Section */}
      <section id="modulos" className="py-20 px-8 bg-pattern">
        <h3 className="text-4xl font-normal text-center mb-12 text-shadow">Conteúdo Educacional</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto text-gray-800">
          <div className="text-center p-6 rounded-lg shadow-lg bg-gray-50">
            <Calculator className="mx-auto h-12 w-12 text-blue-500 mb-4" />
            <h4 className="text-2xl font-normal mb-2">Álgebra</h4>
            <p>Resolva equações, domine expressões e prepare-se para desafios algébricos.</p>
          </div>
          <div className="text-center p-6 rounded-lg shadow-lg bg-gray-50">
            <Scaling className="mx-auto h-12 w-12 text-green-500 mb-4" />
            <h4 className="text-2xl font-normal mb-2">Geometria</h4>
            <p>Calcule áreas, perímetros e explore as formas geométricas de maneira interativa.</p>
          </div>
          <div className="text-center p-6 rounded-lg shadow-lg bg-gray-50">
            <DivideSquareIcon className="mx-auto h-12 w-12 text-yellow-500 mb-4" />
            <h4 className="text-2xl font-normal mb-2">Frações</h4>
            <p>Some, subtraia, multiplique e divida frações de forma divertida e visual.</p>
          </div>
          <div className="text-center p-6 rounded-lg shadow-lg bg-gray-50">
            <Percent className="mx-auto h-12 w-12 text-red-500 mb-4" />
            <h4 className="text-2xl font-normal mb-2">Porcentagem</h4>
            <p>Entenda e aplique porcentagens em situações do dia a dia, como descontos e juros.</p>
          </div>
        </div>
      </section>

      {/* Ranking Section */}
      <section id="ranking" className="py-20 px-8 bg-white text-gray-800">
        <h3 className="text-4xl font-normal text-center mb-12">Sistema de Ranking e Recompensas</h3>
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center p-6 rounded-lg shadow-lg bg-gray-800 text-white">
            <Users className="mx-auto h-12 w-12 text-blue-500 mb-4" />
            <h4 className="text-2xl font-normal mb-2">Ranking Competitivo</h4>
            <p>Veja sua posição no ranking de alunos, turmas e escolas. A competição saudável motiva o aprendizado!</p>
          </div>
          <div className="text-center p-6 rounded-lg shadow-lg bg-gray-800 text-white">
            <Trophy className="mx-auto h-12 w-12 text-green-500 mb-4" />
            <h4 className="text-2xl font-normal mb-2">Conquistas</h4>
            <p>Desbloqueie conquistas ao atingir objetivos, como completar módulos ou acertar sequências de perguntas.</p>
          </div>
          <div className="text-center p-6 rounded-lg shadow-lg bg-gray-800 text-white">
            <Medal className="mx-auto h-12 w-12 text-yellow-500 mb-4" />
            <h4 className="text-2xl font-normal mb-2">Medalhas Virtuais</h4>
            <p>Ganhe medalhas de ouro, prata e bronze por seu desempenho excepcional e mostre seu progresso.</p>
          </div>
        </div>
      </section>

      <section id="educadores" className="py-20 px-8 bg-pattern">
        <h3 className="text-4xl font-normal text-center mb-12 text-shadow">Funcionalidades Futuras</h3>
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto text-gray-800">
          <div className="text-center p-6 rounded-lg shadow-lg bg-gray-50">
            <BarChart className="mx-auto h-12 w-12 text-blue-500 mb-4" />
            <h4 className="text-2xl font-normal mb-2">Acompanhamento de Desempenho</h4>
            <p>Monitore o progresso de seus alunos em tempo real, identificando pontos fortes e dificuldades.</p>
          </div>
          <div className="text-center p-6 rounded-lg shadow-lg bg-gray-50">
            <ClipboardList className="mx-auto h-12 w-12 text-green-500 mb-4" />
            <h4 className="text-2xl font-normal mb-2">Relatórios Automáticos</h4>
            <p>Receba relatórios detalhados por aluno, turma ou habilidade, facilitando a tomada de decisões pedagógicas.</p>
          </div>
          <div className="text-center p-6 rounded-lg shadow-lg bg-gray-50">
            <School className="mx-auto h-12 w-12 text-yellow-500 mb-4" />
            <h4 className="text-2xl font-normal mb-2">Atividades Personalizadas</h4>
            <p>Crie e atribua listas de exercícios personalizadas para atender às necessidades específicas de cada turma.</p>
          </div>
        </div>
      </section>

      <section id="depoimentos" className="py-24 px-8 bg-white text-gray-800">
        <h3 className="text-5xl font-bold text-center mb-16">O Que os Alunos Dizem</h3>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="p-8 rounded-2xl shadow-xl bg-gray-50 hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-blue-400  flex items-center justify-center text-white font-bold text-lg">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-lg">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">
                    {testimonial.age} anos • {testimonial.school}
                  </p>
                </div>
              </div>
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 leading-relaxed italic">{testimonial.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="seguranca" className="py-20 px-8 bg-pattern">
        <h3 className="text-4xl font-normal text-center mb-12 text-shadow">Segurança e Inclusão</h3>
        <div className="max-w-2xl mx-auto text-center">
          <ShieldCheck className="mx-auto h-12 w-12 text-green-400 mb-4" />
          <p className="text-shadow">Plataforma segura, sem anúncios, que respeita a privacidade dos alunos e é acessível em diversos dispositivos.</p>
        </div>
      </section>

      <section className="py-20 px-8 text-center bg-white text-gray-800">
        <h3 className="text-4xl font-normal mb-4">Pronto para entrar no jogo?</h3>
        <Button onClick={() => router.push('/auth/signup')} size="lg" className="transition-all duration-300 hover:scale-105 active:scale-95 rounded-bl-4xl rounded-tr-4xl">Começar Agora!</Button>
      </section>

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