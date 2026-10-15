# Abner Almeida — Portfólio profissional

Portfólio desenvolvido para o LAB01 da disciplina de Desenvolvimento e Integração de Aplicações Web (DIAW), no segundo período de Engenharia de Software da PUC Minas.

O site apresenta minha formação, habilidades, experiências, projetos e formas de contato. A interface foi construída com React e Vite, usando JavaScript/JSX e CSS comum.

## Links úteis

- [Protótipo no Figma](https://www.figma.com/design/mfA3J610RzWl3o9r5k5BaF/Portfolio---website?node-id=0-1)
- [GitHub do autor](https://github.com/abneralmeidacord)
- [LinkedIn](https://www.linkedin.com/in/abner-almeida-/)
- **Site publicado:** pendente — a hospedagem será feita posteriormente pelo autor.
- [Template de README da disciplina](https://github.com/joaopauloaramuni/desenvolvimento-e-integracao-de-aplicacoes-web/blob/main/TEMPLATES/template_README.md)

## Status

A interface local está implementada. O envio de e-mail depende da configuração do EmailJS. Hospedagem e publicação do repositório são etapas posteriores.

## Funcionalidades

- Página inicial com a visão geral, mais páginas próprias de Sobre Mim, Habilidades e Experiências.
- Página Sobre Mim com currículo no idioma selecionado (PT/EN) e a carta de recomendação de Gabriel Rangel em PDF, com visualizador dentro do site e download.
- Página Habilidades com o globo, linguagens, ferramentas, idiomas e diferenciais.
- Alternância entre globo com cards (padrão) e lista de habilidades com filtros por categoria e contagens, em PT/EN.
- Motion: loading inicial com spinner e barra ligados aos recursos da página, apresentação digitada, blocos que convergem e esmaecem com o scroll, diferenciais com fade-in de baixo para cima e timeline com linha e marcadores animados. A preferência de movimento reduzido é respeitada.
- Sobre Mim com um parágrafo sobre a trajetória descrita no currículo; no celular, retrato circular antes do texto.
- Monitoria de Desenvolvimento de Interfaces Web e Webtech Network na PUC Minas desde setembro de 2026; imagens dos projetos preenchendo os cards com `object-fit: fill`.
- Página Experiências com o card profissional e a timeline dos projetos.
- Menu com Sobre Mim, Habilidades e Experiências; projetos junto ao cartão profissional na página Experiências; contato na página inicial.
- Apresentação e conteúdo em português e inglês, alternados pelo seletor PT/EN.
- Menu adaptado ao celular e link para pular diretamente ao conteúdo.
- Globo 3D de habilidades: rotação, arrasto, links e opção de pausar.
- Respeito à preferência de redução de movimento; alternativa textual em caso de indisponibilidade do WebGL.
- Experiências com instituição, cargo, período e descrição.
- Timeline de projetos gerada a partir de uma lista e ordenada do mais antigo ao mais recente.
- Cards com descrição, tecnologias, imagem e link do GitHub.
- Links de e-mail, LinkedIn, Instagram, GitHub e WhatsApp, com os ícones originais exportados do Figma.
- WhatsApp com a mensagem: “Olá! Vim pelo seu portfólio e gostaria de saber mais sobre você! 😉”
- Formulário com nome, e-mail, assunto opcional e mensagem.
- Validação de campos e estados de envio, sucesso e erro.
- Integração de envio com EmailJS; sem configuração, o site informa que o envio está pendente.

## Protótipos

As seis imagens abaixo foram exportadas do arquivo Figma. São referências de design, e não capturas da implementação.

### Página principal

![Protótipo principal](docs/prototypes/main.png)

### Desktop

| Projetos | Habilidades e experiências |
| --- | --- |
| ![Projetos desktop](docs/prototypes/projects-desktop.png) | ![Habilidades desktop](docs/prototypes/skills-desktop.png) |

### Celular

| Página principal | Projetos | Habilidades e experiências |
| --- | --- | --- |
| ![Página principal mobile](docs/prototypes/home-mobile.png) | ![Projetos mobile](docs/prototypes/projects-mobile.png) | ![Habilidades mobile](docs/prototypes/skills-mobile.png) |

A implementação usa o frame principal como referência: seis cards de habilidades com o card de experiência ao lado, logos secundários, diferenciais e contato com foto grande à direita. O formulário foi movido para junto dos ícones, à esquerda da foto, conforme a revisão solicitada. Os textos do protótipo têm tradução para português. Fotos, logos de linguagens e ícones de redes sociais foram exportados das camadas do Figma para arquivos locais, sem substituí-los por ícones de biblioteca.

O header e a timeline cronológica foram mantidos conforme solicitado. O globo fica na página Habilidades, junto aos cards. Os cargos informados pelo autor foram incluídos no card de experiência; o total de 2 anos e 11 meses reproduz o protótipo e não é calculado automaticamente. O formulário de contato fica ao lado dos ícones, na área à esquerda da foto; no celular, os elementos se empilham. A frase “Vamos criar algo juntos?” e o rodapé solicitado pelo autor foram preservados. Os logos abaixo da apresentação foram reduzidos, e o trio voltou à composição com uma leve inclinação.

## Tecnologias e dependências

As versões resolvidas estão em `package-lock.json`. Use `npm ci` para reproduzir a instalação.

| Dependência | Finalidade |
| --- | --- |
| React / React DOM | Componentes, estados e renderização da interface |
| Motion | Animações de carregamento, texto e scroll |
| Vite / plugin React | Servidor de desenvolvimento e build de produção |
| JavaScript / JSX | Lógica e componentes |
| CSS | Layout, responsividade, fontes e variáveis de cores |
| react-icons | Ícones do header, do globo e dos links dos projetos |
| react-pdf / PDF.js | Visualização interna dos PDFs com paginação, zoom e texto selecionável |
| three | Geometria e projeção do globo 3D |
| @react-three/fiber | Integração do Three.js com React |
| @react-three/drei | Câmera interativa e movimento do globo |
| @emailjs/browser | Envio do formulário por um serviço externo |
| ESLint e plugins React | Verificação do código |

As fontes são carregadas pelo Google Fonts em `src/index.css`, com fontes de sistema como alternativa. As fotos e as imagens dos projetos são locais.

## Arquitetura

O navegador executa uma aplicação React. O componente `App` compõe as seções, e as informações ficam em arquivos simples dentro de `src/data`.

As páginas ficam em `src/pages/`. A navegação usa um hook simples (`src/hooks/usePageNavigation.js`) e endereços com `#`, sem uma biblioteca de rotas adicional. Isso permite abrir os links diretamente, atualizar e usar os botões Voltar/Avançar em hospedagens estáticas:

| Página | Endereço |
| --- | --- |
| Início | `#/` |
| Sobre mim e recomendações | `#/sobre` |
| Habilidades e globo | `#/habilidades` |
| Experiências e projetos | `#/experiencias` |
| Acesso direto aos projetos | `#/experiencias/projetos` |
| Contato na página inicial | `#/contato` |

O formulário usa o serviço EmailJS para processar o envio de e-mail: **navegador → EmailJS → caixa de e-mail de Abner**. Não há API própria ou banco de dados neste escopo.

O globo é carregado separadamente por `React.lazy`; sua renderização pausa quando ele fica fora da tela. É o componente mais técnico do projeto, por utilizar gráficos 3D. O restante da interface usa componentes pequenos e CSS comum.

## Instalação e execução

Pré-requisito: **Node.js 22.12 ou superior** (ou uma versão compatível com o campo `engines` do Vite) e npm. A implementação foi verificada com Node.js 22.14.0.

Na pasta do projeto:

```bash
npm ci
npm run dev
```

Abra o endereço indicado no terminal. Normalmente é `http://localhost:5173`; se a porta estiver ocupada, o Vite informa outra.

| Comando | O que faz |
| --- | --- |
| `npm run dev` | Abre o servidor local e atualiza a página ao salvar arquivos |
| `npm run lint` | Verifica o código JavaScript/JSX |
| `npm run build` | Gera o site de produção em `dist/` |
| `npm run preview` | Serve o build para conferência local |

O Vite cuida do servidor e da compilação. A programação dos componentes continua sendo React.

## Como editar

- **Cores e fontes:** `src/styles/tokens.css`. Cada componente usa `var(--color-...)` e `var(--font-...)`.
- **Importação das fontes e estilos gerais:** `src/index.css`.
- **Contato e WhatsApp:** `src/data/profile.js`.
- **Projetos, datas e tecnologias:** `src/data/projects.js`.
- **Experiências:** `src/data/experiences.js`.
- **Habilidades do globo:** `src/data/skills.js`.
- **Ícones originais do Figma:** `src/assets/icons/`, importados em `src/data/designAssets.js`.
- **Textos PT/EN:** `src/data/translations.js`.
- **Cartas de recomendação:** `src/data/recommendations.js` e PDFs em `public/recommendations/`. Veja [como adicionar as cartas](docs/recommendations.md).
- **Currículos PT/EN:** `src/data/resumes.js` e PDFs em `public/resumes/`. Veja [como adicionar os currículos](docs/recommendations.md).
- **Aparência de uma seção:** o arquivo CSS do componente correspondente.

Cada componente tem um arquivo `.jsx` com sua lógica e marcação e um arquivo `.css` com seus estilos. Não há necessidade de criar um terceiro arquivo JavaScript para componentes pequenos.

## Configuração do EmailJS

1. Crie um serviço de e-mail e um template na sua conta EmailJS.
2. Configure o destinatário fixo como `abnersolk@gmail.com`.
3. No template, use `{{from_name}}`, `{{from_email}}`, `{{subject}}` e `{{message}}`. Configure Reply-To como `{{reply_to}}`. O formulário também envia `to_email` e `to_name`; mantenha **To Email fixo em `abnersolk@gmail.com`** no painel para garantir o destinatário.
4. Copie `.env.example` para `.env.local`.
5. Preencha `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID` e `VITE_EMAILJS_PUBLIC_KEY`.
6. Reinicie o servidor. Após publicar, configure os mesmos valores no provedor e gere um novo build.
7. Envie uma mensagem de teste e confirme o recebimento.

Use somente a **chave pública** do EmailJS. Variáveis com prefixo `VITE_` ficam visíveis no navegador; elas não servem para guardar senhas ou chaves privadas.

[Exemplo oficial do EmailJS com React](https://www.emailjs.com/docs/examples/reactjs/)

## Estrutura de pastas

```text
abneralmeida-portfolio/
├── docs/
│   ├── prototypes/             # Seis exports do Figma
│   ├── references/             # Globo original e licença MIT
│   └── entregas.md             # Checklist das três sprints
├── public/
│   └── favicon.svg
├── src/
│   ├── assets/images/          # Fotos e previews exportados do Figma
│   ├── components/
│   │   ├── Header.jsx / Header.css
│   │   ├── About.jsx / About.css
│   │   ├── Skills.jsx / Skills.css
│   │   ├── SkillsGlobe.jsx / SkillsGlobe.css
│   │   ├── Experiences.jsx / Experiences.css
│   │   ├── Projects.jsx / Projects.css
│   │   ├── ProjectCard.jsx / ProjectCard.css
│   │   ├── Contact.jsx / Contact.css
│   │   ├── SocialLinks.jsx / SocialLinks.css
│   │   └── Footer.jsx / Footer.css
│   ├── data/
│   ├── styles/tokens.css
│   ├── App.jsx / App.css
│   ├── index.css
│   └── main.jsx
├── .env.example
├── index.html
├── package.json
├── package-lock.json
├── eslint.config.js
└── vite.config.js
```

## Verificação e entregas

Consulte [o checklist das sprints](docs/entregas.md). Validação realizada: lint e build aprovados; versão de produção conferida em desktop e em 390 × 844 px; seis imagens carregadas; timeline cronológica; troca PT/EN; menu mobile; arrasto e pausa do globo; validação de e-mail inválido e aviso de envio não configurado. O recebimento real de e-mail ainda não foi testado.

Os previews de StarWars e COBRINHA.ZIP são as capas usadas no Figma. Para a S03, acrescente capturas ou GIFs desses projetos realmente em execução. Os projetos aceitam a propriedade opcional `demo` para uma demonstração externa.

As datas dos projetos e os períodos profissionais foram transcritos do protótipo. Os cargos foram informados pelo autor; as descrições são breves e podem ser enriquecidas com atividades reais. A stack do Vclean foi conferida no repositório, que usa Expo, apesar de a capa mostrar uma landing page.

Após a última revisão: lint e build aprovados; páginas de Sobre Mim, Habilidades e Experiências verificadas; Voltar/Avançar e recarregamento direto dos links funcionando; globo e sua pausa na página Habilidades; quatro projetos na página Experiências; área de recomendações vazia até a inclusão das cartas; troca PT/EN; menu mobile e ausência de overflow horizontal em 390 × 844 px. Veja [as camadas exportadas](docs/figma-assets.md) e [a captura atual do contato](docs/qa/contact-pages-layout.jpg). O recebimento real de e-mail continua pendente da configuração do EmailJS.

## Hospedagem

Pendente, conforme o escopo combinado. Para publicar na Vercel, use o preset Vite, comando `npm run build` e pasta `dist`. Configure as variáveis do EmailJS antes do build.

Depois, acrescente o endereço publicado neste README e confirme o envio do formulário no site online. O repositório Git local foi inicializado. A criação do repositório remoto e a publicação no GitHub devem ser concluídas antes da entrega.

## Autor e créditos

A lista de habilidades e os filtros foram adaptados do [SkillsSection de João Paulo Aramuni](https://github.com/joaopauloaramuni/desenvolvimento-e-integracao-de-aplicacoes-web/tree/main/PROJETOS/React/SkillsGlobe/src/components/SkillsSection), mantendo os dados deste portfólio e seus estilos. A licença MIT está em [aramuni-skills-section-LICENSE.txt](docs/references/aramuni-skills-section-LICENSE.txt).

**Abner Almeida** — Engenharia de Software, PUC Minas.

O componente `SkillsGlobe.jsx` e seu CSS foram adaptados do [portfólio de João Paulo Aramuni](https://github.com/joaopauloaramuni/joaopauloaramuni-portfolio), removendo a integração com terminal, tradução e temas do projeto original e usando os tokens deste portfólio.

O código original está em `docs/references/SkillsGlobe.original.jsx` e `SkillsGlobe.original.css`. A licença MIT, incluindo o copyright de João Paulo Aramuni, foi preservada em [aramuni-LICENSE.txt](docs/references/aramuni-LICENSE.txt).
