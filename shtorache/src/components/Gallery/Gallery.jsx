import { useMemo, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { MasonryPhotoAlbum } from 'react-photo-album';
import 'react-photo-album/masonry.css';
import Lightbox from 'yet-another-react-lightbox';
import Video from 'yet-another-react-lightbox/plugins/video';
import Counter from 'yet-another-react-lightbox/plugins/counter';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/counter.css';

const dateFmt = new Intl.DateTimeFormat('pt-BR', { month: 'short', year: 'numeric' });

function Badge({ children }) {
  return (
    <Typography
      variant="caption"
      sx={{
        position: 'absolute',
        top: 10,
        right: 12,
        fontSize: '0.6rem',
        color: '#fff',
        textShadow: '0 1px 6px rgba(0,0,0,.8)',
        pointerEvents: 'none',
      }}
    >
      {children}
    </Typography>
  );
}

function Gallery({ items }) {
  const [index, setIndex] = useState(-1);
  const [current, setCurrent] = useState(0);

  // Cada post vira um tile; carrosséis viram vários slides no lightbox.
  const { photos, slides, firstSlide, slideToPost } = useMemo(() => {
    const photos = [];
    const slides = [];
    const firstSlide = [];
    const slideToPost = [];
    items.forEach((post, i) => {
      photos.push({
        key: post.id,
        src: post.thumb,
        width: post.width,
        height: post.height,
        alt: post.caption?.slice(0, 120) || 'Foto de Lucas Shtorache',
        post,
      });
      firstSlide.push(slides.length);
      post.slides.forEach((s) => {
        slideToPost.push(i);
        slides.push(
          s.type === 'video'
            ? {
                type: 'video',
                poster: s.poster ?? post.thumb,
                width: post.width,
                height: post.height,
                sources: [{ src: s.src, type: 'video/mp4' }],
                autoPlay: true,
                loop: true,
                playsInline: true,
              }
            : { src: s.src, alt: photos[i].alt },
        );
      });
    });
    return { photos, slides, firstSlide, slideToPost };
  }, [items]);

  const activePost = items[slideToPost[current]];

  return (
    <>
      <MasonryPhotoAlbum
        photos={photos}
        spacing={(w) => (w < 600 ? 4 : 10)}
        columns={(w) => (w < 600 ? 2 : w < 1100 ? 3 : 4)}
        onClick={({ index: i }) => setIndex(firstSlide[i])}
        componentsProps={{
          image: { loading: 'lazy', decoding: 'async' },
        }}
        render={{
          wrapper: ({ style, ...rest }) => (
            <Box
              {...rest}
              style={style}
              sx={{
                position: 'relative',
                overflow: 'hidden',
                bgcolor: '#141414',
                '& img': {
                  display: 'block',
                  filter: 'grayscale(0.15)',
                  transition: 'transform 1.2s cubic-bezier(.2,.7,.2,1), filter .6s ease, opacity .6s ease',
                },
                '&:hover img': { transform: 'scale(1.03)', filter: 'grayscale(0)' },
              }}
            />
          ),
          extras: (_, { photo }) => {
            const { post } = photo;
            if (post.kind === 'video') return <Badge>▶ VÍDEO</Badge>;
            if (post.slides.length > 1) return <Badge>1/{post.slides.length}</Badge>;
            return null;
          },
        }}
      />

      <Lightbox
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        slides={slides}
        plugins={[Video, Counter]}
        on={{ view: ({ index: i }) => setCurrent(i) }}
        controller={{ closeOnBackdropClick: true }}
        animation={{ fade: 300, swipe: 400 }}
        counter={{ container: { style: { top: 0, fontFamily: '"IBM Plex Mono", monospace', fontSize: 12 } } }}
        styles={{ container: { backgroundColor: '#050505' } }}
        toolbar={{
          buttons: [
            activePost && (
              <Box
                key="ig"
                component="a"
                href={activePost.permalink}
                target="_blank"
                rel="noreferrer"
                sx={{
                  alignSelf: 'center',
                  mr: 2,
                  fontFamily: '"IBM Plex Mono", monospace',
                  fontSize: 12,
                  letterSpacing: '0.08em',
                  color: 'rgba(255,255,255,.7)',
                  textDecoration: 'none',
                  '&:hover': { color: '#fff' },
                }}
              >
                {activePost.timestamp ? `${dateFmt.format(new Date(activePost.timestamp))} · ` : ''}
                Instagram ↗
              </Box>
            ),
            'close',
          ],
        }}
      />
    </>
  );
}

export default Gallery;
