# Shtorache

Galeria de fotos e vídeos de **Lucas Shtorache** — fotografia e vídeo da cena punk / hardcore.
React + Vite + MUI. O conteúdo da galeria vem direto do Instagram
([@lucasshtorache](https://www.instagram.com/lucasshtorache/)).

## Páginas

| Rota        | Conteúdo                                                        |
| ----------- | --------------------------------------------------------------- |
| `/`         | Vídeo em loop, tela cheia, P&B com barras de cinema e granulação |
| `/trabalho` | Todos os posts do Instagram (masonry + lightbox)                 |
| `/fotos`    | Posts de imagem e carrosséis                                     |
| `/videos`   | Reels / vídeos (tocam no lightbox)                               |
| `/contato`  | Bio e contato                                                    |

Textos, @ do Instagram, e-mail e o vídeo da capa ficam em `src/config.js`.

## Rodando localmente

```bash
npm install
cp .env.example .env.local   # cole o token do Instagram
npm run dev
```

Sem token o site funciona normalmente e a galeria mostra um link para o perfil.

## Vídeo da página inicial

Substitua `public/media/hero.mp4` (e o pôster `public/media/hero-poster.jpg`) por um
trecho real de 8–15 s. O arquivo atual é um placeholder gerado por
`scripts/generate-placeholder-loop.py`. Dicas para o loop ficar leve e fluido:

```bash
ffmpeg -i bruto.mov -t 12 -vf "scale=1920:-2,format=yuv420p" -an \
  -c:v libx264 -crf 24 -preset slow -movflags +faststart public/media/hero.mp4
ffmpeg -ss 2 -i public/media/hero.mp4 -frames:v 1 -q:v 3 public/media/hero-poster.jpg
```

O vídeo é exibido em preto e branco via CSS; sem áudio (autoplay exige mudo).

## Integração com o Instagram

A galeria lê `GET /api/instagram`, uma função serverless (`api/instagram.js` →
`server/instagram.js`) que consulta a **Instagram API com Instagram Login**
(`graph.instagram.com/me/media`). O token fica só no servidor.

1. A conta @lucasshtorache precisa ser **Profissional** (Criador ou Comercial).
2. Em [developers.facebook.com](https://developers.facebook.com/apps) crie um app,
   adicione o produto **Instagram → API setup with Instagram login**.
3. Em *Generate access tokens*, adicione a conta e gere o token
   (permissão `instagram_business_basic`). Esse token é de longa duração (60 dias).
4. Configure `INSTAGRAM_ACCESS_TOKEN` (`.env.local` em dev; variáveis de ambiente no deploy).

Renove o token antes de expirar (ex.: um cron mensal):

```bash
curl "https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=$INSTAGRAM_ACCESS_TOKEN"
```

A resposta da API fica em cache na CDN por 1 h (`s-maxage=3600`), então posts novos
aparecem sozinhos.

## Deploy (Vercel)

Importe o repositório, defina **Root Directory = `shtorache`**, e adicione
`INSTAGRAM_ACCESS_TOKEN` em *Environment Variables*. O `vercel.json` já cuida das
rotas do SPA e a pasta `api/` vira a função serverless.

Em outro host, basta expor `server/instagram.js` em qualquer endpoint e apontar
`VITE_INSTAGRAM_FEED_URL` para ele no build.
