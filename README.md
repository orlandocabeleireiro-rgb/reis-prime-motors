# Reis Prime Motors

Site do stand automóvel **Reis Prime Motors** (Gondomar, Porto). Construído em
React + Vite + Tailwind CSS, com esquema de cores preto / branco / prateado.

## Stack

- [Vite](https://vite.dev/) — build tool
- [React 18](https://react.dev/)
- [React Router](https://reactrouter.com/) — navegação entre páginas
- [Tailwind CSS](https://tailwindcss.com/) — estilos

## Estrutura

```
public/
  reis-mark.png       Ícone da marca (favicon e cabeçalho)
  reis-lockup.png      Logótipo completo (página de contactos)
  _redirects            Regra de SPA para deploy na Netlify
src/
  data/cars.js           Dados das viaturas (mock — substituir por API/CMS)
  components/
    Header.jsx            Cabeçalho com navegação
    Footer.jsx             Rodapé
    CarCard.jsx           Cartão de viatura usado na listagem
  pages/
    Home.jsx                Página inicial — hero + catálogo com filtros
    CarDetail.jsx           Detalhe de uma viatura (/carros/:id)
    Contacts.jsx            Página de contactos (/contactos)
    NotFound.jsx            Página 404
  App.jsx                    Layout e definição de rotas
  main.jsx                   Ponto de entrada
```

## Desenvolvimento

```bash
npm install
npm run dev
```

Abre `http://localhost:5173`.

## Build de produção

```bash
npm run build
npm run preview   # pré-visualizar o build localmente
```

Os ficheiros de produção são gerados em `dist/`.

## Publicar (deploy)

O projeto é uma SPA (Single Page Application) e já vem preparado para os dois
destinos mais comuns:

### Vercel
1. Importar o repositório em [vercel.com/new](https://vercel.com/new).
2. Framework preset: **Vite** (é detetado automaticamente).
3. Build command: `npm run build` · Output directory: `dist`.
4. O ficheiro `vercel.json` já trata do redirecionamento das rotas (para que
   `/carros/1` ou `/contactos` funcionem diretamente, não só a partir da home).

### Netlify
1. Importar o repositório em [app.netlify.com](https://app.netlify.com/).
2. Build command: `npm run build` · Publish directory: `dist`.
3. O ficheiro `public/_redirects` já garante que todas as rotas da SPA
   carregam corretamente.

### Qualquer outro alojamento estático (GitHub Pages, S3, etc.)
Basta publicar o conteúdo de `dist/` após o `npm run build`, garantindo que o
servidor devolve `index.html` para rotas desconhecidas (fallback de SPA).

## Próximos passos sugeridos

- Substituir as imagens de viaturas (atualmente placeholders) por fotografias
  reais — basta adicionar um campo `imagens` a cada viatura em `src/data/cars.js`.
- Ligar o formulário de contacto (`src/pages/Contacts.jsx`) a um serviço real
  (ex. [Formspree](https://formspree.io/), Netlify Forms, ou uma API própria).
- Substituir os dados mock de `src/data/cars.js` por uma API ou CMS, caso o
  catálogo passe a ser gerido fora do código.
- Adicionar Google Maps API key própria caso se pretenda um mapa interativo
  em vez do embed público usado atualmente.
