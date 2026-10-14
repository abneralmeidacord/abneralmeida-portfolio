import starwarsImage from '../assets/images/starwars.png'
import vcleanImage from '../assets/images/vclean.png'
import overwatchImage from '../assets/images/overwatch.png'
import snakeImage from '../assets/images/snake.png'

// Datas do Figma. Tecnologias conferidas nos repositórios enviados.
export const projects = [
  {
    id: 'starwars', name: 'StarWars Wiki', type: 0, date: '2021-08', period: '08 / 2021',
    image: starwarsImage, repository: 'https://github.com/abneralmeidacord/starwarswiki-expo-DevRiseWeek',
    technologies: ['React Native', 'Expo', 'Zustand', 'Axios'],
    description: { pt: 'Aplicativo desenvolvido durante a DevRiseWeek para explorar filmes e personagens de Star Wars, com navegação e listas de favoritos.', en: 'An app built during DevRiseWeek to explore Star Wars films and characters, featuring navigation and favorite lists.' },
  },
  {
    id: 'vclean', name: 'Vclean Higienização', type: 1, date: '2021-08', period: '08 / 2021',
    image: vcleanImage, repository: 'https://github.com/abneralmeidacord/Vclean-website--Correct-',
    technologies: ['React Native', 'Expo', 'Expo Router'],
    description: { pt: 'Projeto de apresentação dos serviços da Vclean Higienização. Interface pensada para destacar a empresa e facilitar o contato com clientes.', en: 'A project showcasing Vclean Higienização services, designed to present the company and make it easier for customers to get in touch.' },
  },
  {
    id: 'overwatch', name: 'Overwatch Wiki', type: 2, date: '2026-02', period: '02 — 07 / 2026',
    image: overwatchImage, repository: 'https://github.com/abneralmeidacord/trabalho-pratico-DIW-PUC',
    demo: 'https://github.com/user-attachments/assets/df2a3258-fbd9-4d64-bfdb-178a8af98bfa',
    technologies: ['HTML', 'CSS', 'JavaScript', 'Bootstrap', 'JSON Server'],
    description: { pt: 'Wiki de heróis de Overwatch com cards dinâmicos, detalhes dos personagens, busca, cadastro, login e favoritos. Trabalho acadêmico de desenvolvimento web.', en: 'An Overwatch hero wiki with dynamic cards, character details, search, registration, login and favorites. A university web development project.' },
  },
  {
    id: 'snake', name: 'COBRINHA.ZIP', type: 2, date: '2026-06', period: '06 — 07 / 2026',
    image: snakeImage, repository: 'https://github.com/abneralmeidacord/snakegame-algoritmos-PUC',
    technologies: ['Python', 'Pygame'],
    description: { pt: 'Jogo da cobrinha desenvolvido em grupo para Introdução a Algoritmos. Inclui pontuação, ranking, recordes, pausa e efeitos sonoros.', en: 'A snake game developed as a group project for Introduction to Algorithms, featuring scores, rankings, records, pause and sound effects.' },
  },
]
