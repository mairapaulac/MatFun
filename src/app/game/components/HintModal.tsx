"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Lightbulb } from "lucide-react";
import { ReactNode } from "react";
import Image from "next/image";
import { Carousel, CarouselContent,CarouselItem,CarouselNext,CarouselPrevious } from "@/components/ui/carousel";
interface HintModalProps {
  isOpen: boolean;
  onClose: () => void;
  questionType: string;
}


function AreaTrapezioHint(): ReactNode {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">
        Área do trapézio
      </h3>
      <Image
        src="/trapezoid.svg"
        alt="Calculo de área do trapezio"
         width={250}
         height={150}
        className="mx-auto w-full h-auto"/>
    </div>
  );
}

function AreaCirculoHint(): ReactNode {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">
        Área do círculo
      </h3>
      <Image
        src="/circle.svg"
        alt="Calculo de área do círculo"
         width={250}
         height={100}
        className="mx-auto w-full h-auto"/>
    </div>
  );
}

function AreaRetanguloHint(): ReactNode {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">
        Área do Retângulo
      </h3>
      <Image
        src="/rect.svg"
        alt="Calculo de área do retângulo"
         width={250}
         height={100}
        className="mx-auto w-full h-auto"/>
    </div>
  );
}

function AreaTrianguloHint(): ReactNode {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">
        Área do Triângulo
      </h3>
      <Image
        src="/triangle.svg"
        alt="Calculo de área do triângulo"
         width={250}
         height={100}
        className="mx-auto w-full h-auto"/>
    </div>
  );
}

function AreaParalelogramoHint(): ReactNode {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">
        Área do Paralelogramo
      </h3>
      <Image
        src="/paralelogram.svg"
        alt="Calculo de área do paralelogramo"
         width={250}
         height={100}
        className="mx-auto w-full h-auto"/>
    </div>
  );
}

function PerimetroCirculoHint(): ReactNode {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-gray-800 mb-3">Perímetro do Círculo</h3>
      <div className="bg-gray-50 p-4 rounded-lg">
        <p className="text-lg font-semibold text-gray-700 mb-2">Fórmula:</p>
        <div className="text-center bg-white p-3 rounded border-2 border-gray-300">
          <span className="text-2xl font-bold text-blue-600">
            C = 2 × π × r
          </span>
        </div>
      </div>
      <div className="text-sm text-gray-600 space-y-1">
        <p><strong>C</strong> = circunferência (perímetro)</p>
        <p><strong>π</strong> ≈ 3 (pi)</p>
        <p><strong>r</strong> = raio do círculo</p>
      </div>
    </div>
  );
}

function MultiplicacaoAlgebricaHint(): ReactNode {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-gray-800 mb-3">Multiplicação Algébrica</h3>
      <div className="bg-gray-50 p-4 rounded-lg">
        <p className="text-lg font-semibold text-gray-700 mb-2">Tipos de Problemas:</p>
        <ul className="text-sm text-gray-600 space-y-2">
          <li>• <strong>Ambos vazios:</strong> Insira dois números que multiplicados resultem no produto</li>
          <li>• <strong>Primeiro preenchido:</strong> Calcule o segundo número</li>
          <li>• <strong>Segundo preenchido:</strong> Calcule o primeiro número</li>
          <li>• <strong>Resultado vazio:</strong> Calcule o produto</li>
        </ul>
      </div>
    </div>
  );
}

function FractionOperationHint(): ReactNode {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-normal text-gray-800 mb-1 text-center">
        Operações com Frações (Soma)
      </h3>
      <Carousel className="w-full max-w-xs md:max-w-md mx-auto">
        <CarouselContent>
          <CarouselItem>
            <div className="p-1 text-center">
              <Image
                src="/frac1.svg"
                alt="Soma de frações com mesmo denominador"
                width={200}
                height={100}
                className="mx-auto w-full h-auto"
              />
            </div>
          </CarouselItem>
          <CarouselItem>
            <div className="p-1 text-center">
              <Image
                src="/frac2.svg"
                alt="Soma de frações com denominador diferente"
                width={250}
                height={100}
                className="mx-auto w-full h-auto"
              />
            </div>
          </CarouselItem>
          <CarouselItem>
            <div className="pt-5 text-center">
              <Image
                src="/frac3.svg"
                alt="Soma de frações com denominador diferente"
                width={250}
                height={100}
                className="mx-auto w-full h-auto"
              />
            </div>
          </CarouselItem>
          <CarouselItem>
            <div className="p-1 text-center">
              <Image
                src="/frac4.svg"
                alt="Soma de frações com denominador diferente"
                width={250}
                height={100}
                className="mx-auto w-full h-auto"
              />
            </div>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious className="absolute -left-8 top-1/2 -translate-y-1/2" />
        <CarouselNext className="absolute -right-8 top-1/2 -translate-y-1/2" />
      </Carousel>
    </div>
  );
}
function FractionMultiplicationHint(): ReactNode {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">
        Operações com Frações (Multiplicação)
      </h3>
      <Image
        src="/mult.svg"
        alt="Soma de frações com denominador diferente"
         width={250}
         height={100}
        className="mx-auto w-full h-auto"/>
    </div>
  );
}

// Function to render hint content based on question type
const renderHintContent = (type: string): ReactNode => {
  switch (type) {
    case 'equation':
    case 'algebraic_multiplication':
      return <MultiplicacaoAlgebricaHint />;
    case 'area_trapezio':
    case 'trapezoid':
      return <AreaTrapezioHint />;
    case 'area_circulo':
    case 'circle':
    case 'circle_from_circumference':
      return <AreaCirculoHint /> ;
    case 'area_retangulo':
    case 'rectangle':
      return <AreaRetanguloHint />;
    case 'area_triangulo':
    case 'triangle':
      return <AreaTrianguloHint />;
    case 'area_paralelogramo':
    case 'parallelogram':
      return <AreaParalelogramoHint />;
    case 'perimetro_circulo':
    case 'circle_perimeter':
      return <PerimetroCirculoHint />;
    case 'fraction_operation_addition':
      return <FractionOperationHint />;
    case 'fraction_operation_multiplication':
      return <FractionMultiplicationHint />;
    default:
      return (
        <div className="text-center py-8">
          <p className="text-lg text-gray-600">
            Dica não disponível para este tipo de questão.
          </p>
        </div>
      );
  }
};

export default function HintModal({ isOpen, onClose, questionType }: HintModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTitle className="hidden"></DialogTitle>
      <DialogContent variant="hint" className="max-w-lg">
        {/* Top Icon - Lightbulb sitting on the edge */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-yellow-400 p-3 rounded-full border-4 border-[#3A55A3]">
          <Lightbulb className="size-10 text-white" />
        </div>
        
        {/* White Canvas - Content Area */}
        <div className="bg-white rounded-3xl p-6 mt-1 border-[#6D93FF] border-4">
          {renderHintContent(questionType)}
        </div>
      </DialogContent>
    </Dialog>
  );
}
