// Conteúdo editável do site num só lugar.
export const site = {
  name: 'Lucas Shtorache',
  shortName: 'Shtorache',
  tagline: 'Fotografia e vídeo — punk / hardcore',
  bio: 'Fotografia e vídeo da cena punk e hardcore mundial. Palco, estrada, suor e barulho.',
  instagram: {
    handle: 'lucasshtorache',
    url: 'https://www.instagram.com/lucasshtorache/',
  },
  // Preencha para exibir o e-mail na página de contato.
  email: '',
  // Vídeo em loop da página inicial. Troque pelos arquivos em /public/media.
  heroVideo: {
    sources: [{ src: '/media/hero.mp4', type: 'video/mp4' }],
    poster: '/media/hero-poster.jpg',
  },
  // Endpoint que entrega o feed do Instagram (ver server/instagram.js).
  feedEndpoint: import.meta.env.VITE_INSTAGRAM_FEED_URL || '/api/instagram',
};
