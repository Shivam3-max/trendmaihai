/* Curated Unsplash photo IDs by theme. Rendered via <ProductMedia>, which
 * falls back to a tasteful gradient if any image fails to load — so the UI
 * is never broken, online or off. Swap for Cloudinary/Shopify media later. */

const U = (id: string, w = 900) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const IMG = {
  desk: [
    U("1587829741301-dc798b83add3"),
    U("1518455027359-f3f8164ba6bd"),
    U("1593062096033-9a26b09da705"),
    U("1527443224154-c4a3942d3acf"),
  ],
  tech: [
    U("1517336714731-489689fd1ca8"),
    U("1526738549149-8e07eca6c147"),
    U("1541807084-5c52b6b3adef"),
    U("1550009158-9ebf69173e03"),
  ],
  coffee: [
    U("1495474472287-4d71bcdd2085"),
    U("1509042239860-f550ce710b93"),
    U("1461023058943-07fcbe16d735"),
    U("1497935586351-b67a49e012bf"),
  ],
  gaming: [
    U("1542751371-adc38448a05e"),
    U("1550745165-9bc0b252726f"),
    U("1593305841991-05c297ba4575"),
    U("1511512578047-dfb367046420"),
  ],
  cozy: [
    U("1522708323590-d24dbb6b0267"),
    U("1567016432779-094069958ea5"),
    U("1540518614846-7eded433c457"),
    U("1493663284031-b7e3aefcae8e"),
  ],
  kitchen: [
    U("1556909212-d5b604d0c90d"),
    U("1522336572468-97b06e8ef143"),
    U("1550583724-b2692b85b150"),
    U("1584990347449-a2d4c2c9b7b6"),
  ],
  wellness: [
    U("1544367567-0f2fcb009e0b"),
    U("1518611012118-696072aa579a"),
    U("1540206395-68808572332f"),
    U("1571019613454-1cb2f99b2d8b"),
  ],
  style: [
    U("1483985988355-763728e1935b"),
    U("1441986300917-64674bd600d8"),
    U("1523381210434-271e8be1f52b"),
    U("1489987707025-afc232f7ea0f"),
  ],
  car: [
    U("1503376780353-7e6692767b70"),
    U("1493238792000-8113da705763"),
    U("1552519507-da3b142c6e3d"),
    U("1568605117036-5fe5e7bab0b7"),
  ],
  outdoor: [
    U("1504280390367-361c6d9f38f4"),
    U("1533873984035-25970ab07461"),
    U("1508739773434-c26b3d09e071"),
    U("1470246973918-29a93221c455"),
  ],
};

export type ImgTheme = keyof typeof IMG;

export function pickImages(theme: ImgTheme, seed: number): string[] {
  const pool = IMG[theme];
  const start = seed % pool.length;
  return [
    pool[start],
    pool[(start + 1) % pool.length],
    pool[(start + 2) % pool.length],
  ];
}
