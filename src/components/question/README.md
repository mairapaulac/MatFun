# Question Screen Components

Sistema modular de componentes para tela de questões de matemática, implementado com React, TypeScript e Tailwind CSS.

## Componentes Principais

### QuestionScreen
Componente principal que integra todos os outros componentes.

```tsx
import { QuestionScreen, ExampleEquationSkeleton } from '@/components/question';

<QuestionScreen
  score={210}
  questionNumber={10}
  moduleLabel="Operações Algébricas"
  questionSkeleton={<ExampleEquationSkeleton />}
  totalMs={60000}
  onSubmit={(answer, metadata) => {
    console.log('Resposta:', answer);
    console.log('Multiplicador:', metadata.multiplier);
    console.log('Tempo decorrido:', metadata.elapsedMs);
  }}
  onTimeout={() => console.log('Tempo esgotado!')}
/>
```

### QuestionCard
Container branco arredondado que aceita qualquer skeleton de questão.

```tsx
<QuestionCard
  questionNumber={10}
  moduleLabel="Operações Algébricas"
>
  <YourCustomSkeleton />
</QuestionCard>
```

### TimeBar
Barra de progresso com zonas de multiplicador.

```tsx
<TimeBar
  progress={0.5} // 0 a 1
  totalMs={60000}
  showLabels={true}
/>
```

### Keypad
Teclado numérico touch-friendly.

```tsx
<Keypad
  value={answer}
  onChange={setAnswer}
  onSubmit={handleSubmit}
  keys={['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '/', '.', '⌫']}
  disabled={false}
/>
```

## Hook useTimer

Controla o timer com lógica de multiplicador baseada no tempo decorrido.

```tsx
const timer = useTimer(60000, true);

// Multiplicadores:
// 0-15s: 8x
// 15-30s: 4x  
// 30-45s: 2x
// 45-60s: 1x
```

## Sistema de Equações Dinâmicas

### EquationSkeleton
Componente especializado para problemas de multiplicação com diferentes tipos de preenchimento.

```tsx
import { EquationSkeleton, generateRandomProblem, GeneratedProblem } from '@/components/question/skeletons/EquationSkeleton';

// Uso básico com problema aleatório
<EquationSkeleton
  equation="___ × ___ = ___"
  variables={["first", "second"]}
  onAnswerChange={(answer) => console.log('Resposta:', answer)}
/>

// Uso com problema específico
const problem: GeneratedProblem = {
  firstNumber: 3,
  secondNumber: 5,
  result: 15,
  type: 'second_filled' // Mostra "3 × ( ) = 15"
};

<EquationSkeleton
  equation="___ × ___ = ___"
  variables={["first", "second"]}
  problem={problem}
  externalAnswer={currentAnswer}
  onAnswerChange={handleAnswerChange}
/>
```

### Tipos de Problemas

O sistema gera automaticamente 4 tipos diferentes de problemas:

#### 1. `both_empty` - Ambos Vazios
```
( ) × ( ) = 36
```
- Jogador preenche ambos os campos
- Aceita formato: "6×6", "66", ou "6" + "6"

#### 2. `first_filled` - Primeiro Preenchido
```
5 × ( ) = 15
```
- Jogador preenche apenas o segundo campo
- Aceita formato: "3" (vai para o segundo campo)

#### 3. `second_filled` - Segundo Preenchido
```
( ) × 5 = 15
```
- Jogador preenche apenas o primeiro campo
- Aceita formato: "3" (vai para o primeiro campo)

#### 4. `result_empty` - Resultado Vazio
```
3 × 5 = ( )
```
- Jogador preenche apenas o resultado
- Aceita formato: "15" (vai para o campo de resultado)

### Geração de Problemas

```tsx
import { generateRandomProblem, GeneratedProblem } from '@/components/question/skeletons/EquationSkeleton';

// Gerar problema aleatório
const problem = generateRandomProblem();
// Resultado: { firstNumber: 3, secondNumber: 7, result: 21, type: 'first_filled' }

// Usar em estado do componente
const [currentProblem, setCurrentProblem] = useState<GeneratedProblem>(() => generateRandomProblem());
```

### Validação Inteligente

O sistema valida automaticamente baseado no tipo do problema:

```tsx
// Exemplo de validação para cada tipo
const checkAnswer = (answer: string, problem: GeneratedProblem): boolean => {
  if (problem.type === 'first_filled') {
    // Valida: primeiroNúmero × resposta = resultado
    return problem.firstNumber * parseInt(answer) === problem.result;
  } else if (problem.type === 'second_filled') {
    // Valida: resposta × segundoNúmero = resultado
    return parseInt(answer) * problem.secondNumber === problem.result;
  } else if (problem.type === 'result_empty') {
    // Valida: resposta = resultado
    return parseInt(answer) === problem.result;
  }
  // ... outros tipos
};
```

### Interface Visual

- **Campos Editáveis**: Fundo branco, borda cinza clara
- **Campos Preenchidos**: Fundo cinza claro, borda cinza escura, não interativo
- **Símbolos de Fundo**: "+" e "×" com opacidade baixa
- **Responsivo**: Adapta-se a diferentes tamanhos de tela

## Criando Question Skeletons

Os skeletons são componentes React que se encaixam no QuestionCard:

```tsx
// Exemplo: Skeleton customizado
function MyCustomSkeleton() {
  return (
    <div className="text-center">
      <div className="text-2xl font-bold">
        Resolva: 2x + 5 = 15
      </div>
      <input 
        type="text" 
        className="mt-4 px-4 py-2 border rounded"
        placeholder="x = ?"
      />
    </div>
  );
}

// Usando no QuestionScreen
<QuestionScreen
  questionSkeleton={<MyCustomSkeleton />}
  // ... outras props
/>
```

## Especificações Visuais

- **Score**: Texto vermelho (#FF3366), 64px, centralizado
- **Questão**: Texto branco, 64px, negrito
- **Módulo**: Texto branco, 32px, semibold
- **Card**: Fundo branco, bordas arredondadas, sombra
- **TimeBar**: Verde com zonas de multiplicador
- **Keypad**: Botões 48x48px mínimo, touch-friendly
- **Responsivo**: Mobile-first, breakpoints sm/md

## Acessibilidade

- Todos os botões têm `aria-label`
- TimeBar tem `aria-live` para atualizações
- Navegação por teclado suportada
- Estados disabled apropriados
- Contraste de cores WCAG AA

## Testes

Execute os testes com:

```bash
npm test -- --testPathPattern=question
```

Testes incluídos:
- Lógica do timer e multiplicadores
- Interações do keypad
- Estados de acessibilidade
- Renderização responsiva

## Integração Completa com Equações

### Exemplo de Implementação Completa

```tsx
import { QuestionScreen, ExampleEquationSkeleton } from '@/components/question';
import { generateRandomProblem, GeneratedProblem } from '@/components/question/skeletons/EquationSkeleton';
import { useState } from 'react';

export default function QuestionPage() {
  const [score, setScore] = useState(0);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [currentProblem, setCurrentProblem] = useState<GeneratedProblem>(() => generateRandomProblem());

  const handleAnswerChange = (answer: string) => {
    setCurrentAnswer(answer);
  };

  const checkAnswer = (answer: string): boolean => {
    const cleanAnswer = answer.trim();
    
    // Validação baseada no tipo do problema
    if (currentProblem.type === 'first_filled') {
      return currentProblem.firstNumber * parseInt(cleanAnswer) === currentProblem.result;
    } else if (currentProblem.type === 'second_filled') {
      return parseInt(cleanAnswer) * currentProblem.secondNumber === currentProblem.result;
    } else if (currentProblem.type === 'result_empty') {
      return parseInt(cleanAnswer) === currentProblem.result;
    } else if (currentProblem.type === 'both_empty') {
      // Lógica para ambos vazios...
    }
    
    return false;
  };

  const handleSubmit = (answer: string, metadata: { elapsedMs: number; multiplier: number }) => {
    const isCorrect = checkAnswer(answer);
    
    if (isCorrect) {
      setScore(prev => prev + 10 * metadata.multiplier);
    }
    
    // Gerar novo problema após resposta
    setTimeout(() => {
      setQuestionNumber(prev => prev + 1);
      setCurrentAnswer('');
      setCurrentProblem(generateRandomProblem());
    }, 1800);
  };

  return (
    <QuestionScreen
      score={score}
      questionNumber={questionNumber}
      moduleLabel="Operações Algébricas"
      questionSkeleton={
        <ExampleEquationSkeleton 
          externalAnswer={currentAnswer} 
          problem={currentProblem} 
        />
      }
      currentAnswer={currentAnswer}
      onAnswerChange={handleAnswerChange}
      totalMs={60000}
      onSubmit={handleSubmit}
    />
  );
}
```

### Fluxo de Funcionamento

1. **Inicialização**: Gera problema aleatório na montagem do componente
2. **Exibição**: Mostra problema com campos apropriados preenchidos/vazios
3. **Input**: Jogador digita resposta no keypad
4. **Parsing**: Sistema coloca resposta no campo correto baseado no tipo
5. **Validação**: Verifica se resposta está correta para o tipo de problema
6. **Feedback**: Mostra resultado (correto/incorreto)
7. **Novo Problema**: Gera automaticamente novo problema após 1.8s

## Integração

1. Importe os componentes necessários
2. Crie seu question skeleton (ou use EquationSkeleton)
3. Configure o QuestionScreen com suas props
4. Implemente a lógica de submissão
5. Adicione roteamento conforme necessário

## Customização

### Cores
Modifique as cores no Tailwind config ou use classes customizadas.

### Teclas do Keypad
Passe array customizado via prop `keys`.

### Timer
Configure `totalMs` para diferentes durações.

### Skeletons
Crie qualquer componente React que se encaixe no QuestionCard.

## Tipos TypeScript

### GeneratedProblem
```tsx
interface GeneratedProblem {
  firstNumber: number;    // 1-9
  secondNumber: number;   // 1-9
  result: number;         // firstNumber * secondNumber
  type: ProblemType;      // Tipo do problema
}

type ProblemType = 
  | 'both_empty'      // ( ) × ( ) = resultado
  | 'first_filled'    // número × ( ) = resultado
  | 'second_filled'   // ( ) × número = resultado
  | 'result_empty';   // número × número = ( )
```

### EquationSkeletonProps
```tsx
interface EquationSkeletonProps {
  equation: string;
  variables: string[];
  onVariableChange?: (variable: string, value: string) => void;
  values?: Record<string, string>;
  onAnswerChange?: (answer: string) => void;
  externalAnswer?: string;
  problem?: GeneratedProblem;
}
```

## APIs Exportadas

### generateRandomProblem()
Gera um problema aleatório com números de 1-9 e tipo aleatório.

```tsx
const problem = generateRandomProblem();
// Exemplo: { firstNumber: 4, secondNumber: 7, result: 28, type: 'second_filled' }
```

### ExampleEquationSkeleton
Componente de exemplo que usa EquationSkeleton internamente.

```tsx
<ExampleEquationSkeleton 
  externalAnswer={currentAnswer}
  problem={currentProblem}
/>
```

## Troubleshooting

### Problema: Validação sempre retorna false
**Solução**: Verifique se o tipo do problema está sendo passado corretamente na validação.

### Problema: Campos não preenchem corretamente
**Solução**: Certifique-se de que o `externalAnswer` está sendo passado e o `problem.type` está correto.

### Problema: Novo problema não é gerado
**Solução**: Verifique se `setCurrentProblem(generateRandomProblem())` está sendo chamado após a resposta.
