export const BLOG_MAP = [
  { slug: 'connections', key: 'connections' },
  { slug: 'digital-mandis', key: 'digitalMandi' },
  { slug: 'local-platforms', key: 'localPlatforms' },
  { slug: 'trading-made-simple', key: 'tradingSimple' },
  { slug: 'rise-of-digital', key: 'riseOfDigital' },
  { slug: 'transparency', key: 'transparency' },
  { slug: 'connecting-win-win', key: 'connectingWinWin' },
  { slug: 'online-mandis', key: 'onlineMandis' },
  { slug: 'supply-chains-tech', key: 'supplyChains' },
  { slug: 'Kcc-Guide', key: 'kccGuide' },
  { slug: 'Rkvy-Guide', key: 'rkvyGuide' },
  { slug: 'Midh-Guide', key: 'midhGuide' },
  { slug: 'Aif-Guide', key: 'aifGuide' },
  { slug: 'Pmfby-Guide', key: 'pmfbyGuide' },
  { slug: 'PmKisan-Guide', key: 'pmKisanGuide' },
  { slug: 'PmKusum-Guide', key: 'pmKusumGuide' },
];

export function getKeyFromSlug(slug: string) {
  const match = BLOG_MAP.find(b => b.slug === slug);
  return match ? match.key : null;
}

export function getSlugFromKey(key: string) {
  const match = BLOG_MAP.find(b => b.key === key);
  return match ? match.slug : null;
}

export function getAllSlugs() {
  return BLOG_MAP.map(b => b.slug);
}

export function getAllLangs() {
  return ['en', 'hi'];
}
