# Background Pattern - Documentação

## Visão Geral

O padrão de background SVG foi implementado globalmente em todas as páginas da aplicação MatFun. Ele funciona como um "sticker" decorativo que se repete por toda a interface, posicionado atrás de todos os elementos da UI.

## Como Funciona

### Implementação CSS

O padrão é aplicado através do arquivo `src/app/globals.css` no elemento `body`:

```css
body {
  @apply bg-background text-foreground;
  font-family: var(--font-paytone), sans-serif;
  /* Background pattern overlay */
  background-image: url('/bg-pattern.svg');
  background-repeat: repeat;
  background-size: 400px 130px;
  background-attachment: fixed;
  background-position: 0 0;
}
```

### Propriedades CSS Explicadas

- **`background-image: url('/bg-pattern.svg')`**: Define o arquivo SVG como imagem de fundo
- **`background-repeat: repeat`**: Faz o padrão se repetir infinitamente em todas as direções
- **`background-size: 400px 130px`**: Redimensiona o padrão para um tamanho adequado (o SVG original é 2518x813px)
- **`background-attachment: fixed`**: Mantém o padrão fixo durante o scroll, criando um efeito parallax sutil
- **`background-position: 0 0`**: Posiciona o padrão no canto superior esquerdo

## Características do Padrão

### Elementos Visuais

O SVG contém elementos matemáticos decorativos:
- Formas geométricas (círculos, retângulos, linhas)
- Símbolos matemáticos (multiplicação, adição, igual)
- Elementos em cor `#1D2D58` com 50% de opacidade
- Design minimalista que complementa a interface

### Integração com a Interface

- **Posicionamento**: O padrão fica atrás de todos os elementos da UI
- **Transparência**: Os elementos da interface (cards, botões, navbar) ficam sobrepostos ao padrão
- **Consistência**: Aplicado globalmente em todas as páginas da aplicação
- **Performance**: SVG otimizado para carregamento rápido

## Arquivo SVG

### Localização
- **Arquivo**: `public/bg-pattern.svg`
- **Dimensões originais**: 2518x813 pixels
- **Formato**: SVG vetorial (escalável)

### Conteúdo
O SVG contém múltiplos elementos `<path>` com:
- Formas geométricas decorativas
- Símbolos matemáticos estilizados
- Cor base: `#1D2D58` com `fill-opacity="0.5"`

## Responsividade

O padrão se adapta automaticamente a diferentes tamanhos de tela:

- **Mobile**: O padrão se redimensiona proporcionalmente
- **Tablet**: Mantém a proporção adequada para telas médias
- **Desktop**: Escala apropriadamente para telas maiores

## Customização

### Alterando o Tamanho do Padrão

Para ajustar o tamanho do padrão, modifique a propriedade `background-size`:

```css
/* Padrão menor */
background-size: 300px 100px;

/* Padrão maior */
background-size: 500px 160px;
```

### Alterando a Opacidade

Para modificar a intensidade do padrão, você pode:

1. **Via CSS Filter** (aplicado ao body):
```css
body {
  filter: brightness(0.8); /* Escurece o padrão */
}
```

2. **Via SVG** (editando o arquivo):
```xml
<!-- Reduzir fill-opacity de 0.5 para 0.3 -->
fill-opacity="0.3"
```

### Alterando o Arquivo SVG

Para substituir o padrão:

1. Substitua o arquivo `public/bg-pattern.svg`
2. Ajuste o `background-size` se necessário
3. Mantenha a mesma estrutura CSS

## Exemplo de Uso

O padrão é aplicado automaticamente em todas as páginas:

```tsx
// Não é necessário fazer nada nas páginas
// O padrão é aplicado globalmente via globals.css

export default function HomePage() {
  return (
    <div className="bg-[#24366b]">
      {/* Conteúdo da página com padrão de fundo automático */}
    </div>
  );
}
```

## Troubleshooting

### Padrão Não Aparece

1. Verifique se o arquivo `bg-pattern.svg` existe em `public/`
2. Confirme se o caminho no CSS está correto: `url('/bg-pattern.svg')`
3. Verifique se não há conflitos de CSS que sobrescrevam o background

### Padrão Muito Intenso

1. Reduza a opacidade no SVG: `fill-opacity="0.3"`
2. Ou aplique um filtro CSS: `filter: brightness(0.7)`

### Performance

- O SVG é otimizado para performance
- Usa `background-attachment: fixed` para melhor experiência de scroll
- Carrega uma vez e se repete via CSS (eficiente)

## Considerações de Design

- **Hierarquia Visual**: O padrão deve complementar, não competir com o conteúdo
- **Legibilidade**: Garante que textos e elementos importantes permaneçam legíveis
- **Consistência**: Mantém a identidade visual em todas as páginas
- **Acessibilidade**: Não interfere na navegação ou leitura de conteúdo
