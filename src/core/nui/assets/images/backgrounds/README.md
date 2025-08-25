# 🖼️ Backgrounds - Wallpapers do Sistema

Esta pasta contém os wallpapers que podem ser usados como fundo de tela do telefone.

## 📁 Estrutura

```
backgrounds/
└── cloud8.jpg  # Wallpaper principal (nuvens azuis)
```

## 🎨 Wallpaper Atual: cloud8.jpg

- **Nome**: Cloud 8
- **Descrição**: Wallpaper com nuvens em tons azuis
- **Uso**: Background principal da tela do telefone
- **Localização**: `/src/core/nui/assets/images/backgrounds/cloud8.jpg`

## 🔧 Como Funciona

O wallpaper é aplicado diretamente no componente principal (`App.vue`) como background da tela:

```css
.screen-content {
  background: url('/src/core/nui/assets/images/backgrounds/cloud8.jpg') center/cover no-repeat;
}
```

## 📱 Especificações Recomendadas

Para novos wallpapers:
- **Formato**: JPG (otimizado para tamanho)
- **Resolução**: Mínimo 812x1624px (2x do iPhone)
- **Proporção**: 9:19.5 (proporção do iPhone)
- **Cores**: Evitar tons muito claros que dificultem leitura
- **Contraste**: Suficiente para ícones e textos brancos

## 🎯 Futuras Expansões

Esta estrutura permite facilmente:
- Adicionar múltiplos wallpapers
- Sistema de seleção de wallpapers
- Wallpapers dinâmicos ou por categoria
- Wallpapers personalizados por usuário
