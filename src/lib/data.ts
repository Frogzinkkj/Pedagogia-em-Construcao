
import type { ImagePlaceholder } from './placeholder-images';
import { PlaceHolderImages } from './placeholder-images';

// Helper function to get an image by ID
const getImage = (id: string): ImagePlaceholder => {
  const image = PlaceHolderImages.find((img) => img.id === id);
  if (!image) {
    // Return a default or throw an error
    return {
      id: 'default',
      description: 'Default image',
      imageUrl: 'https://picsum.photos/seed/default/1200/800',
      imageHint: 'abstract texture'
    };
  }
  return image;
};

export interface Author {
  id: string;
  name: string;
  bio: string;
  experience: string[];
  expertise: string[];
  publications: string[];
  avatar: ImagePlaceholder;
}

export interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  authorId: string;
  category: 'Apresentação' | 'Jogos' | 'Contação de Histórias' | 'Música' | 'Artes';
  skill: 'Gramática' | 'Vocabulário' | 'Escrita' | 'Metodologia' | 'Leitura' | 'Coordenação Motora' | 'Criatividade';
  ageGroup: string;
  subject: string;
  publishDate: string;
  image: ImagePlaceholder;
}

export interface Comment {
  id: string;
  postId: string;
  authorName: string;
  authorAvatarUrl: string;
  content: string;
  date: string;
}


// Mock Data
export const authors: Author[] = [
  {
    id: '1',
    name: 'Isabela Rosendo das Virgens',
    bio: 'Me chamo Isabela Rosendo das Virgens 29 anos, sou estudante de pedagogia cursando o 4° semestre, trabalho em uma escola da educação infantil na cidade de São Sebastião do Passé.',
    experience: [
      'Estudante de Pedagogia (4º Semestre), unindo a teoria acadêmica com a prática diária.',
      'Atuante na Educação Infantil, com foco em atividades lúdicas e sensoriais.',
      'Criadora do blog "Pedagogia em Construção", um diário de bordo sobre as descobertas na jornada da formação docente.',
    ],
    expertise: [
      'Desenvolvimento da Coordenação Motora Fina',
      'Aprendizagem Criativa e Expressão Artística',
      'Metodologias Lúdicas para a Primeira Infância',
      'Consciência Corporal e Exploração Sensorial',
      'Estímulo à Curiosidade e Contato com a Natureza',
    ],
    publications: [
      'Pequenos Exploradores: Atividades de observação da natureza com lupas para estimular a curiosidade científica e a expressão artística.',
      'Arte Coletiva com Elementos Naturais: Projetos de pintura que utilizam o corpo e a colaboração para desenvolver a socialização e a consciência corporal.',
      'Cores e Pontinhos: Propostas de arte para o aprimoramento do movimento de pinça e o reconhecimento de cores de forma divertida.'
    ],
    avatar: getImage('author-ana-silva'),
  },
];

export const posts: Post[] = [
    {
        id: '1',
        slug: 'bem-vindos-ao-pedagogia-em-construcao',
        title: 'Bem-vindos ao Pedagogia em Construção!',
        excerpt: 'Sou Isabela, futura pedagoga e educadora. Este é o meu diário de bordo, um espaço para compartilhar a jornada entre a teoria da faculdade e a prática na educação infantil. Vamos aprender juntos?',
        content: `
<p>Olá, gente que acredita na educação!</p>
<p>Meu nome é Isabela Rosendo das Virgens, e este espaço é um pouco do meu mundo. Estou cursando Pedagogia, uma jornada que me enche de inspiração. Mas minha sala de aula vai além da faculdade, trabalho diretamente com a energia contagiante das crianças na educação infantil, em uma escola de São Sebastião do Passé.</p>
<p>O <strong>Pedagogia em Construção</strong> nasceu exatamente da ponte entre esses dois universos. Aqui quero dividir não apenas o que já sei, mas principalmente o que estou aprendendo todos os dias – tanto nos livros quanto no chão da sala de aula. Quem disse que é preciso ter um diploma na parede para começar a transformar?</p>
<p>Nosso foco será a língua portuguesa na primeira infância, mas de um jeito leve, prático e cheio de significado. Vamos conversar sobre atividades que estimulam a fala, brincadeiras que preparam para a escrita e como podemos despertar o amor pela leitura desde os primeiros anos. Este é um diário aberto de uma futura pedagoga, e eu adoraria ter a sua companhia para trocar ideias, dúvidas e inspirações.</p>
<p>Vamos aprender juntos?</p>
<p>Sejam muito bem-vindos!</p>`,
        authorId: '1',
        category: 'Apresentação',
        skill: 'Metodologia',
        ageGroup: 'Educadores',
        subject: 'Pedagogia',
        publishDate: '2024-08-01',
        image: getImage('post-welcome'),
    },
    {
        id: '2',
        slug: 'cores-e-pontinhos-jornada-aprendizagem-criatividade',
        title: 'Cores e Pontinhos: Uma Jornada de Aprendizagem e Criatividade',
        excerpt: 'A arte na educação infantil é uma janela para a expressão e o desenvolvimento. Com uma proposta simples, mas repleta de intencionalidade, nossos pequenos artistas mergulharam em um mundo de cores para criar seus próprios arco-íris.',
        content: `
<p>A arte na educação infantil é uma janela para a expressão e o desenvolvimento. Com uma proposta simples, mas repleta de intencionalidade, nossos pequenos artistas mergulharam em um mundo de cores para criar seus próprios arco-íris. A atividade, que consistia em usar pequenos carimbos (ou rolhas) para pintar, foi uma verdadeira jornada de descobertas.</p>
<div class="my-8 grid grid-cols-1 gap-4">
  <img src="/images/image_57f3c7.jpg" alt="Detalhe da pintura de arco-íris com pontinhos" class="rounded-lg shadow-md" />
</div>
<h2 class="text-3xl font-headline mb-4 mt-10">Desenvolvendo a Coordenação Motora Fina</h2>
<p>Cada pontinho de tinta cuidadosamente colocado no papel foi um exercício valioso. Ao segurar o carimbo, as crianças aprimoraram o movimento de pinça e a preensão, habilidades fundamentais para a futura escrita. A precisão necessária para seguir o arco desenhado no papel também estimulou a atenção e a concentração, mostrando como a arte pode ser uma poderosa ferramenta de foco.</p>
<h2 class="text-3xl font-headline mb-4 mt-10">Exploração Sensorial e de Cores</h2>
<p>A experiência foi além do visual. O contato com a tinta, a textura do papel e o ato de carimbar criaram uma rica experiência sensorial. Além disso, a atividade permitiu o reconhecimento e a nomeação das cores primárias, transformando a brincadeira em um aprendizado vibrante e significativo. Ao final, cada caderno exibia um arco-íris único, um reflexo da criatividade e da expressão individual de cada criança. Foi uma celebração da aprendizagem através das cores e das formas!</p>
<div class="my-8 grid grid-cols-1 gap-4"><img src="/images/image_57f3c1.jpg" alt="Criança pintando arco-íris com carimbos" class="rounded-lg shadow-md" /></div>
`,
        authorId: '1',
        category: 'Artes',
        skill: 'Coordenação Motora',
        ageGroup: '3-5 anos',
        subject: 'Artes Visuais',
        publishDate: '2024-08-18',
        image: getImage('post-painting-dots-cover'),
    },
    {
        id: '3',
        slug: 'pequenos-exploradores-da-primavera',
        title: 'Pequenos Exploradores da Primavera: Observando e Criando',
        excerpt: 'A chegada da primavera transformou nosso ambiente escolar em um laboratório a céu aberto! Para celebrar a estação mais colorida do ano, nossas crianças se tornaram verdadeiros exploradores da natureza, equipados com um instrumento mágico: a lupa.',
        content: `
<p>A chegada da primavera transformou nosso ambiente escolar em um laboratório a céu aberto! Para celebrar a estação mais colorida do ano, nossas crianças se tornaram verdadeiros exploradores da natureza, equipados com um instrumento mágico: a lupa.</p>
<h2 class="text-3xl font-headline mb-4 mt-10">Uma Expedição Científica no Jardim</h2>
<p>A aventura começou com uma caminhada atenta pela nossa área verde. Com as lupas em mãos, os pequenos cientistas foram convidados a investigar de perto os detalhes que muitas vezes passam despercebidos. As texturas das folhas, as cores vibrantes das pétalas das flores, os caminhos dos pequenos insetos e a beleza das borboletas ganharam uma nova dimensão. Cada descoberta era celebrada com olhares curiosos e sorrisos de encantamento, estimulando a curiosidade e o respeito pelo meio ambiente.</p>
<h3 class="text-3xl font-headline mb-4 mt-10">Da Observação à Expressão Artística</h3>
<p>Após a expedição, o desafio era registrar tudo o que haviam visto. De volta à sala, lápis de cor, papéis e tesouras se tornaram as ferramentas para transformar as memórias em arte. Cada desenho se tornou um mapa das descobertas, uma representação única do que mais chamou a atenção de cada um. Essa etapa foi fundamental para organizar o pensamento, exercitar a memória e, claro, soltar a imaginação, conectando a vivência prática com a expressão criativa.</p>
`,
        authorId: '1',
        category: 'Artes',
        skill: 'Criatividade',
        ageGroup: '4-6 anos',
        subject: 'Ciências Naturais',
        publishDate: '2024-08-22',
        image: getImage('post-spring-explorers-cover'),
    },
    {
        id: '4',
        slug: 'arte-coletiva-expressao-toque-natureza',
        title: 'Arte Coletiva: A Expressão Através do Toque e da Natureza',
        excerpt: 'Quem disse que para pintar precisamos apenas de pincéis? Em nossa mais recente atividade de artes, descobrimos que as ferramentas mais incríveis que temos são nossos próprios corpos!',
        content: `
<p>Quem disse que para pintar precisamos apenas de pincéis? Em nossa mais recente atividade de artes, descobrimos que as ferramentas mais incríveis que temos são nossos próprios corpos! Em uma proposta de pintura coletiva, exploramos a liberdade de criar juntos, usando elementos da natureza e, principalmente, nossas mãos e pés.</p>
<h2 class="text-3xl font-headline mb-4 mt-10">Uma Tela em Branco se Transforma em Alegria</h2>
<p>Sobre um grande papel pardo estendido no chão, a magia aconteceu. As crianças foram convidadas a sentir a tinta, misturar as cores e deixar suas marcas, criando uma obra de arte única e colaborativa. A atividade foi uma explosão de sensações: o frio da tinta na pele, a descoberta de novas cores surgindo da mistura e a alegria de compartilhar um espaço criativo com os colegas.</p>
<h3 class="text-3xl font-headline mb-4 mt-10">O Que Aprendemos Juntos?</h3>
<p>Mais do que um painel colorido, construímos aprendizados valiosos. A pintura coletiva incentivou a socialização, o respeito pelo espaço do outro e a noção de pertencimento a um grupo. Além disso, foi uma poderosa atividade de consciência corporal e sensorial, permitindo que as crianças explorassem o mundo através do toque de uma forma lúdica e expressiva. O resultado final foi uma bela representação da energia e da união da nossa turma.</p>
`,
        authorId: '1',
        category: 'Artes',
        skill: 'Criatividade',
        ageGroup: '3-6 anos',
        subject: 'Expressão Corporal',
        publishDate: '2024-08-25',
        image: getImage('post-collective-painting-cover'),
    },
];

export const comments: Comment[] = [
    
];
