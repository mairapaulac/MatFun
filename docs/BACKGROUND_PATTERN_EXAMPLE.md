# Exemplo Visual - Background Pattern

## Antes da Implementação

```css
/* Antes: Background simples */
body {
  background-color: #24366b;
}
```

**Resultado**: Fundo sólido azul sem decoração.

## Depois da Implementação

```css
/* Depois: Background com padrão SVG */
body {
  background-color: #24366b;
  background-image: url('/bg-pattern.svg');
  background-repeat: repeat;
  background-size: 400px 130px;
  background-attachment: fixed;
}
```

**Resultado**: Fundo azul com padrão matemático decorativo repetindo.

## Estrutura Visual

```
┌─────────────────────────────────────────┐
│  Navbar (sobreposto ao padrão)         │
├─────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐      │
│  │   Card 1    │  │   Card 2    │      │ ← Cards sobrepostos
│  │ (sobreposto)│  │ (sobreposto)│      │
│  └─────────────┘  └─────────────┘      │
│                                         │
│  🧮 + × = 🎯  🧮 + × = 🎯               │ ← Padrão SVG se repetindo
│  🧮 + × = 🎯  🧮 + × = 🎯               │
│  🧮 + × = 🎯  🧮 + × = 🎯               │
│                                         │
│  ┌─────────────────────────────────┐    │
│  │        Botão Jogar              │    │ ← Botão sobreposto
│  │      (sobreposto)               │    │
│  └─────────────────────────────────┘    │
└─────────────────────────────────────────┘
```

## Camadas de Profundidade

1. **Fundo Base**: `#24366b` (azul sólido)
2. **Padrão SVG**: Elementos matemáticos decorativos
3. **Interface**: Navbar, cards, botões (sobrepostos)

## Responsividade Visual

### Mobile (320px)
```
┌─────────────────┐
│  Navbar         │
├─────────────────┤
│  ┌───────────┐  │
│  │   Card    │  │
│  └───────────┘  │
│  🧮 + × = 🎯    │ ← Padrão menor
│  🧮 + × = 🎯    │
│  ┌───────────┐  │
│  │  Jogar    │  │
│  └───────────┘  │
└─────────────────┘
```

### Tablet (800px)
```
┌─────────────────────────────┐
│        Navbar               │
├─────────────────────────────┤
│  ┌─────────┐ ┌─────────┐    │
│  │  Card 1 │ │  Card 2 │    │
│  └─────────┘ └─────────┘    │
│  🧮 + × = 🎯  🧮 + × = 🎯   │ ← Padrão médio
│  🧮 + × = 🎯  🧮 + × = 🎯   │
│  ┌─────────────────────────┐ │
│  │      Botão Jogar        │ │
│  └─────────────────────────┘ │
└─────────────────────────────┘
```

### Desktop (1200px+)
```
┌─────────────────────────────────────────────┐
│              Navbar                         │
├─────────────────────────────────────────────┤
│  ┌─────────┐ ┌─────────┐ ┌─────────┐        │
│  │  Card 1 │ │  Card 2 │ │  Card 3 │        │
│  └─────────┘ └─────────┘ └─────────┘        │
│  🧮 + × = 🎯  🧮 + × = 🎯  🧮 + × = 🎯      │ ← Padrão grande
│  🧮 + × = 🎯  🧮 + × = 🎯  🧮 + × = 🎯      │
│  ┌─────────────────────────────────────────┐ │
│  │            Botão Jogar                  │ │
│  └─────────────────────────────────────────┘ │
└─────────────────────────────────────────────┘
```

## Código de Exemplo Completo

### Página com Padrão Aplicado

```tsx
export default function HomePage() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-[#24366b]">
      {/* Navbar com fundo sólido sobreposto */}
      <nav className="bg-[#314991]">
        {/* Conteúdo da navbar */}
      </nav>
      
      <main className="flex-1 px-4 py-6">
        {/* Cards com fundo branco sobrepostos */}
        <div className="bg-white rounded-2xl shadow-md">
          {/* Conteúdo do card */}
        </div>
        
        {/* Botão sobreposto */}
        <button className="bg-[#314991] text-white rounded-full">
          Jogar
        </button>
      </main>
    </div>
  );
}
```

### CSS Global Aplicado

```css
body {
  background-color: #24366b;
  background-image: url('/bg-pattern.svg');
  background-repeat: repeat;
  background-size: 400px 130px;
  background-attachment: fixed;
}
```

## Benefícios da Implementação

1. **Consistência Visual**: Padrão uniforme em todas as páginas
2. **Identidade da Marca**: Elementos matemáticos reforçam o tema educacional
3. **Profundidade**: Cria camadas visuais interessantes
4. **Performance**: SVG otimizado e CSS eficiente
5. **Flexibilidade**: Fácil de customizar ou substituir
