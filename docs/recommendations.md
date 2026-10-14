# Currículos e cartas de recomendação

A página `#/sobre` apresenta o currículo no idioma selecionado (PT ou EN) e as cartas de recomendação. Os botões de leitura abrem um visualizador de PDF dentro do site, com opção de download. Sem um arquivo configurado, o card mostra “Em breve” e não apresenta links quebrados.

Os currículos PT/EN e a carta de Gabriel Rangel já estão configurados. Os PDFs são cópias integrais dos documentos fornecidos pelo autor.

## Currículos

1. Salve os PDFs em `public/resumes/`, por exemplo `abner-almeida-pt.pdf` e `abner-almeida-en.pdf`.
2. Em `src/data/resumes.js`, substitua o `file: null` de cada idioma pelo caminho correspondente:

```js
export const resumes = [
  { language: 'pt', file: '/resumes/abner-almeida-pt.pdf' },
  { language: 'en', file: '/resumes/abner-almeida-en.pdf' },
]
```

O seletor PT/EN controla qual versão do currículo aparece. A troca de idioma fecha um currículo aberto e passa a mostrar a versão correspondente. O visualizador renderiza as páginas com React-PDF/PDF.js dentro do site, com texto selecionável, links, paginação, zoom e download. Permite fechar pelo botão, pela tecla Esc ou clicando fora. Erros de carregamento apresentam opções para tentar novamente ou baixar o arquivo. Worker, fontes, CMaps e WASM são servidos pelo próprio site.

## Cartas de recomendação

1. Salve cada PDF em `public/recommendations/`.
2. Acrescente os dados reais em `src/data/recommendations.js`:

```js
export const recommendations = [
  {
    title: 'Título da carta',
    author: 'Nome do autor',
    role: 'Cargo ou instituição',
    file: '/recommendations/carta.pdf',
  },
]
```

Use o nome exato do arquivo, incluindo letras maiúsculas e minúsculas. Os caminhos dos arquivos locais respeitam a base de publicação configurada no Vite. Gere um novo build depois de incluir os documentos.
