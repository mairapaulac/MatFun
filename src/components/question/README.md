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

## Criando Question Skeletons

Os skeletons são componentes React que se encaixam no QuestionCard:

```tsx
// Exemplo: Skeleton para equações
function MyEquationSkeleton() {
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
  questionSkeleton={<MyEquationSkeleton />}
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

## Integração

1. Importe os componentes necessários
2. Crie seu question skeleton
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
