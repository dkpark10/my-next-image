import { Router } from "express";
import path from "path";

const router = Router();

const cache_dir = path.join(__dirname, 'cache/images');

const AVIF = 'image/avif'
const WEBP = 'image/webp'
const PNG = 'image/png'
const JPEG = 'image/jpeg'
const GIF = 'image/gif'
const SVG = 'image/svg+xml'
const ICO = 'image/x-icon'
const CACHE_VERSION = 3
const ANIMATABLE_TYPES = [WEBP, PNG, GIF]
const VECTOR_TYPES = [SVG]

function getHash(items) {
  const hash = createHash('sha256')
  for (let item of items) {
    if (typeof item === 'number') hash.update(String(item))
    else {
      hash.update(item)
    }
  }
  // See https://en.wikipedia.org/wiki/Base64#Filenames
  return hash.digest('base64').replace(/\//g, '-')
}

// 이미지 버퍼를 얻어 이미지 타입을 반환받는 함수
function detectContentType(buffer) {
  if ([0xff, 0xd8, 0xff].every((b, i) => buffer[i] === b)) {
    return JPEG
  }
  if (
    [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a].every(
      (b, i) => buffer[i] === b
    )
  ) {
    return PNG
  }
  if ([0x47, 0x49, 0x46, 0x38].every((b, i) => buffer[i] === b)) {
    return GIF
  }
  if (
    [0x52, 0x49, 0x46, 0x46, 0, 0, 0, 0, 0x57, 0x45, 0x42, 0x50].every(
      (b, i) => !b || buffer[i] === b
    )
  ) {
    return WEBP
  }
  if ([0x3c, 0x3f, 0x78, 0x6d, 0x6c].every((b, i) => buffer[i] === b)) {
    return SVG
  }
  if ([0x3c, 0x73, 0x76, 0x67].every((b, i) => buffer[i] === b)) {
    return SVG
  }
  if (
    [0, 0, 0, 0, 0x66, 0x74, 0x79, 0x70, 0x61, 0x76, 0x69, 0x66].every(
      (b, i) => !b || buffer[i] === b
    )
  ) {
    return AVIF
  }
  if ([0x00, 0x00, 0x01, 0x00].every((b, i) => buffer[i] === b)) {
    return ICO
  }
  return null
}

router.get('/image', (req, res) => {
  const { url, w, q } = req.query;

  // 아래 값으로 getHash를 이용 캐시키를 만듬
  // {
  //   href: "/mangom.jpg",
  //   sizes: [
  //     640,
  //     750,
  //     828,
  //     1080,
  //     1200,
  //     1920,
  //     2048,
  //     3840,
  //     16,
  //     32,
  //     48,
  //     64,
  //     96,
  //     128,
  //     256,
  //     384,
  //     8,
  //   ],
  //   isAbsolute: false,
  //   isStatic: false,
  //   width: 256,
  //   quality: 75,
  //   mimeType: "image/webp",
  //   minimumCacheTTL: 60,
  // }

  const quality = Number(q);
  if (isNaN(quality) || quality < 1 || quality > 100) {
    // todo
  }

  if (isNaN(w) || w <= 0) {
    // todo
  }

  const buffer = 123 //;
  const upstreamType = detectContentType(buffer);
  if (ANIMATABLE_TYPES.includes(upstreamType) && isAnimated(upstreamBuffer)) {
    // 이미지 버퍼 그대로 반환
  }
  if (VECTOR_TYPES.includes(upstreamType)) {
    // 이미지 버퍼 그대로 반환
  }
});

router.get('/version', (_, res) => {
  return res.status(200).send(containerTag ?? version);
});

export default router;
