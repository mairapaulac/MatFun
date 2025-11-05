Tenho um projeto em Next.js (App Router) hospedado na Vercel, e estou enfrentando um problema visual em navegadores de sistemas antigos como Windows 7 e Windows 8. 

O problema é o seguinte:  
na página `/home`, a minha `Navbar` usa gradientes via Tailwind CSS, como por exemplo:

<nav className="bg-gradient-to-r from-[#24366b] via-[#32498f] to-[#24366b]">...</nav>

Ocorre que, em máquinas com Windows 7/8 (ou browsers antigos), esses gradientes não são renderizados corretamente. Em alguns casos, a Navbar e outros elementos ficam transparentes ou piscando, tornando o layout ilegível.

Quero implementar uma **solução de fallback automática** que:

1. Detecte se o usuário está em Windows 7 ou Windows 8 **ou** se o gradiente falhou em renderizar;
2. Caso isso aconteça, adicione uma classe global (`.no-gradient`) no `<html>`;
3. Essa classe deve fazer com que a Navbar (e outros componentes com gradiente) use uma **cor sólida de fallback**, no caso `#24366b`;
4. Nos navegadores modernos (Windows 10/11 e demais), o gradiente original deve continuar aparecendo normalmente.

Peço que você gere o código completo para isso, incluindo:
- Um hook React (`useVisualFallback`) para rodar no client-side;
- Como integrá-lo ao `layout.tsx` principal do Next.js;
- O CSS necessário no `globals.css` para aplicar o fallback;
- Se possível, uma sugestão opcional para prevenir flicker (aplicando a classe no `<head>` via script inline antes da hidratação).

Em resumo: quero que a Navbar de `/home` mantenha seu gradiente em sistemas modernos, mas automaticamente use uma cor sólida `#24366b` como fallback em Windows 7/8 ou navegadores que não renderizem gradientes.
