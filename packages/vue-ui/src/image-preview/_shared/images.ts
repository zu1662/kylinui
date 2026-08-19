import type { ImagePreviewItem } from '../image-preview';

function createImage(title: string, colors: [string, string], motif: string) {
  const [start, end] = colors;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 1200">
    <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="${start}"/><stop offset="1" stop-color="${end}"/></linearGradient></defs>
    <rect width="900" height="1200" fill="url(#g)"/>
    <circle cx="700" cy="210" r="110" fill="white" opacity=".2"/>
    <path d="${motif}" fill="white" opacity=".32"/>
    <text x="70" y="1040" fill="white" font-size="78" font-family="sans-serif" font-weight="700">${title}</text>
    <text x="74" y="1110" fill="white" opacity=".78" font-size="30" font-family="sans-serif">Kylin UI Gallery</text>
  </svg>`;
  return 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svg);
}

export const imagePreviewItems: ImagePreviewItem[] = [
  {
    src: createImage(
      '晨光',
      ['#684ccb', '#9f8af0'],
      'M0 820L210 540l150 160 170-260 370 430v330H0z',
    ),
    alt: '紫色晨光主题插画',
    caption: '晨光穿过山谷，层次在柔和渐变中展开。',
  },
  {
    src: createImage(
      '潮汐',
      ['#176d86', '#61c4c7'],
      'M0 760Q170 620 340 760T680 760T1020 760V1200H0z',
    ),
    alt: '青色潮汐主题插画',
    caption: '潮汐起伏形成连续节奏，适合验证横向切换。',
  },
  {
    src: createImage(
      '暖境',
      ['#c65a3a', '#f2a65a'],
      'M80 830L270 570l120 180 150-240 280 360v330H80z',
    ),
    alt: '橙色暖境主题插画',
    caption: '双击或滚轮可缩放，放大后支持拖动查看细节。',
  },
  {
    src: 'https://wepie.oss-cn-shanghai.aliyuncs.com/2022-07-04/Default.jpg',
    alt: '图片1',
    caption: '真实图片，支持双击缩放和拖动查看细节。',
  },
  {
    src: 'https://wepie-1254951306.cos.ap-shanghai.myqcloud.com/2022-07-30/22222.jpg',
    alt: '图片2',
    caption: '真实图片，支持双击缩放和拖动查看细节。',
  },
];
