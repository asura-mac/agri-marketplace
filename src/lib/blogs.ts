export const BLOG_MAP = [
  { 
    slug: 'connections', 
    key: 'connections', 
    url: 'https://i.ibb.co/fdL06VL6/Farmers-Traders-and-Buyers-The-New-Age-Connection-in-Agriculture.jpg' 
  },
  { 
    slug: 'digital-mandis', 
    key: 'digitalMandi',
    url: 'https://i.ibb.co/XfmzMGgT/Digital-Mandis-How-Technology-is-Transforming-Indian-Agriculture.jpg'
  },
  { 
    slug: 'local-platforms', 
    key: 'localPlatforms',
    url: 'https://i.ibb.co/nsrN13xK/Why-Local-Agricultural-Platforms-Matter-for-Rural-Growth.jpg'
  },
  { 
    slug: 'trading-made-simple', 
    key: 'tradingSimple',
    url: 'https://i.ibb.co/zh1jB9cT/Future-of-Indian-Agriculture-Digital-Platforms-Leading-the-Way.jpg'
  },
  { 
    slug: 'rise-of-digital', 
    key: 'riseOfDigital',
    url: 'https://i.ibb.co/X9g67sD/How-Digital-Agriculture-Platforms-Empower-Small-Farmers.jpg'
  },
  { 
    slug: 'transparency', 
    key: 'transparency',
    url: 'https://i.ibb.co/ksNMnzL0/Direct-Farm-to-Buyer-Models-Cutting-Out-the-Middlemen.jpg'
  },
  { 
    slug: 'connecting-win-win', 
    key: 'connectingWinWin',
    url: 'https://i.ibb.co/whP9WjRq/Technology-s-Role-in-Building-a-Transparent-Agriculture-System.jpg'
  },
  { 
    slug: 'online-mandis', 
    key: 'onlineMandis',
    url: 'https://i.ibb.co/0ywPL62R/The-Rise-of-Online-Agriculture-Marketplaces-in-India.jpg'
  },
  { 
    slug: 'supply-chains-tech', 
    key: 'supplyChains',
    url: 'https://i.ibb.co/PsbhJtvr/Rural-India-and-the-Digital-Agriculture-Revolution.jpg'
  },
  { 
    slug: 'Kcc-Guide', 
    key: 'kccGuide',
    url: 'https://i.ibb.co/WNTLLCQM/Kisan-Credit-Card-KCC-Modified-Interest-Subvention-Scheme-MISS.png'
  },
  { 
    slug: 'Rkvy-Guide', 
    key: 'rkvyGuide',
    url: 'https://i.ibb.co/CpN9NgwV/Rashtriya-Krishi-Vikas-Yojana-RKVY.png'
  },
  { 
    slug: 'Midh-Guide', 
    key: 'midhGuide',
    url: 'https://i.ibb.co/Vc7nfPT6/Mission-for-Integrated-Development-of-Horticulture-MIDH.png'
  },
  { 
    slug: 'Aif-Guide', 
    key: 'aifGuide',
    url: 'https://i.ibb.co/krfsBZm/Agriculture-Infrastructure-Fund-AIF.png'
  },
  { 
    slug: 'Pmfby-Guide', 
    key: 'pmfbyGuide',
    url: 'https://i.ibb.co/d43Z5S1S/Pradhan-Mantri-Fasal-Bima-Yojana-PMFBY.png'
  },
  { 
    slug: 'PmKisan-Guide', 
    key: 'pmKisanGuide',
    url: 'https://i.ibb.co/GQ5RbzX9/PM-Kisan-Samman-Nidhi-PM-KISAN.png'
  },
  { 
    slug: 'PmKusum-Guide', 
    key: 'pmKusumGuide',
    url: 'https://i.ibb.co/27JQqRZF/Pradhan-Mantri-Kisan-Urja-Suraksha-Evam-Utthaan-Mahabhiyan-PM-KUSUM.png'
  },
  { 
    slug: 'empowering-farmers-fair-prices', 
    key: 'empoweringFarmers', 
    url: 'https://i.ibb.co/nqWbQBx6/1.png'
  },
  { 
    slug: 'how-to-use-kisan-near-me', 
    key: 'howToUseGuide', 
    url: 'https://i.ibb.co/S4rjgxyT/2.png'
  },
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
