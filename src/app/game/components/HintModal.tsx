"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Lightbulb } from "lucide-react";
import { ReactNode } from "react";

interface HintModalProps {
  isOpen: boolean;
  onClose: () => void;
  questionType: string;
}

// Placeholder hint components
function EquationHint(): ReactNode {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-gray-800 mb-3">Operações Algébricas</h3>
      <div className="bg-gray-50 p-4 rounded-lg">
        <p className="text-lg font-semibold text-gray-700 mb-2">Dicas:</p>
        <ul className="text-sm text-gray-600 space-y-2">
          <li>• Multiplicação: a × b = resultado</li>
          <li>• Se dois números estão vazios, você pode inserir qualquer combinação que resulte no produto</li>
          <li>• Se um número está preenchido, calcule o outro</li>
          <li>• Se o resultado está vazio, calcule a multiplicação</li>
        </ul>
      </div>
    </div>
  );
}

function AreaTrapezioHint(): ReactNode {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-gray-800 mb-3">Área do Trapézio</h3>
      <div className="bg-gray-50 p-4 rounded-lg">
        <p className="text-lg font-semibold text-gray-700 mb-2">Fórmula:</p>
        <div className="text-center bg-white p-3 rounded border-2 border-gray-300">
          <span className="text-2xl font-bold text-blue-600">
            A = (B + b) × h ÷ 2
          </span>
        </div>
      </div>
      <div className="text-sm text-gray-600 space-y-1">
        <p><strong>B</strong> = base maior</p>
        <p><strong>b</strong> = base menor</p>
        <p><strong>h</strong> = altura</p>
      </div>
    </div>
  );
}

function AreaCirculoHint(): ReactNode {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-gray-800 mb-3">Área do Círculo</h3>
      <div className="bg-gray-50 p-4 rounded-lg">
        <p className="text-lg font-semibold text-gray-700 mb-2">Fórmula:</p>
        <div className="text-center bg-white p-3 rounded border-2 border-gray-300">
          <span className="text-2xl font-bold text-blue-600">
            A = π × r²
          </span>
        </div>
      </div>
      <div className="text-sm text-gray-600 space-y-1">
        <p><strong>π</strong> ≈ 3 (pi)</p>
        <p><strong>r</strong> = raio do círculo</p>
        <p><strong>r²</strong> = raio ao quadrado</p>
      </div>
    </div>
  );
}

function AreaRetanguloHint(): ReactNode {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-gray-800 mb-3">Área do Retângulo</h3>
      <div className="bg-gray-50 p-4 rounded-lg">
        <p className="text-lg font-semibold text-gray-700 mb-2">Fórmula:</p>
        <div className="text-center bg-white p-3 rounded border-2 border-gray-300">
          <span className="text-2xl font-bold text-blue-600">
            A = b × h
          </span>
        </div>
      </div>
      <div className="text-sm text-gray-600 space-y-1">
        <p><strong>b</strong> = base (largura)</p>
        <p><strong>h</strong> = altura</p>
      </div>
    </div>
  );
}

function AreaTrianguloHint(): ReactNode {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-gray-800 mb-3">Área do Triângulo</h3>
      <div className="bg-gray-50 p-4 rounded-lg">
        <p className="text-lg font-semibold text-gray-700 mb-2">Fórmula:</p>
        <div className="text-center bg-white p-3 rounded border-2 border-gray-300">
          <span className="text-2xl font-bold text-blue-600">
            A = (b × h) ÷ 2
          </span>
        </div>
      </div>
      <div className="text-sm text-gray-600 space-y-1">
        <p><strong>b</strong> = base</p>
        <p><strong>h</strong> = altura</p>
        <p><strong>÷ 2</strong> = dividir por 2</p>
      </div>
    </div>
  );
}

function AreaParalelogramoHint(): ReactNode {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-gray-800 mb-3">Área do Paralelogramo</h3>
      <div className="bg-gray-50 p-4 rounded-lg">
        <p className="text-lg font-semibold text-gray-700 mb-2">Fórmula:</p>
        <div className="text-center bg-white p-3 rounded border-2 border-gray-300">
          <span className="text-2xl font-bold text-blue-600">
            A = b × h
          </span>
        </div>
      </div>
      <div className="text-sm text-gray-600 space-y-1">
        <p><strong>b</strong> = base</p>
        <p><strong>h</strong> = altura (perpendicular à base)</p>
      </div>
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
      <h3 className="text-xl font-bold text-gray-800 mb-3">Operações com Frações</h3>
      <div className="bg-gray-50 p-4 rounded-lg">
        <p className="text-lg font-semibold text-gray-700 mb-2">Fórmulas:</p>
        <div className="space-y-3">
          <div className="bg-white p-3 rounded border-2 border-gray-300">
            <p className="text-sm font-semibold text-blue-600 mb-1">Soma:</p>
            <span className="text-lg font-bold text-gray-800">
              a/b + c/d = (a×d + c×b) / (b×d)
            </span>
          </div>
          <div className="bg-white p-3 rounded border-2 border-gray-300">
            <p className="text-sm font-semibold text-green-600 mb-1">Subtração:</p>
            <span className="text-lg font-bold text-gray-800">
              a/b - c/d = (a×d - c×b) / (b×d)
            </span>
          </div>
          <div className="bg-white p-3 rounded border-2 border-gray-300">
            <p className="text-sm font-semibold text-purple-600 mb-1">Multiplicação:</p>
            <span className="text-lg font-bold text-gray-800">
              a/b × c/d = (a×c) / (b×d)
            </span>
          </div>
        </div>
      </div>
      <div className="text-sm text-gray-600 space-y-2">
        <p><strong>Dica:</strong> Use o botão &quot;Alternar Foco&quot; para mudar entre numerador e denominador</p>
        <p><strong>Importante:</strong> Sua resposta não precisa estar simplificada!</p>
      </div>
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
      return <AreaCirculoHint />;
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
    case 'fraction_operation':
      return <FractionOperationHint />;
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
        <div className="bg-white rounded-3xl p-6 mt-4 border-[#6D93FF] border-4">
          {renderHintContent(questionType)}
        </div>
      </DialogContent>
    </Dialog>
  );
}
