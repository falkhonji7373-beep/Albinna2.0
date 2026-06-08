export const IMGS = {
  hero: 'https://demo-al-binaa-v3-production.up.railway.app/images/commercial-2.jpg',
  commercial1: 'https://demo-al-binaa-v3-production.up.railway.app/images/commercial-1.jpg',
  commercial2: 'https://demo-al-binaa-v3-production.up.railway.app/images/commercial-2.jpg',
  residential1: 'https://demo-al-binaa-v3-production.up.railway.app/images/residential-1.jpg',
  residential2: 'https://demo-al-binaa-v3-production.up.railway.app/images/residential-2.jpg',
  industrial1: 'https://demo-al-binaa-v3-production.up.railway.app/images/industrial-1.jpg',
  building1: 'https://demo-al-binaa-v3-production.up.railway.app/images/building-1.jpg',
};

export const MEGA_MENUS = {
  services: {
    img: IMGS.commercial1,
    items: [
      { title: 'Commercial Construction', desc: 'Office towers, retail & mixed-use developments', href: '/services', section: 0 },
      { title: 'Residential Development', desc: 'Integrated communities & villa compounds', href: '/services', section: 1 },
      { title: 'Industrial & Infrastructure', desc: 'Warehouses, factories & civil works', href: '/services', section: 2 },
      { title: 'Engineering & Design', desc: 'In-house structural & MEP engineering', href: '/services', section: 3 },
      { title: 'Project Management', desc: 'End-to-end delivery, on time & on budget', href: '/services', section: 4 },
    ],
  },
  projects: {
    img: IMGS.residential2,
    items: [
      { title: 'Duqm City Hotel, Phase 1', desc: 'Hospitality · Duqm, Oman', href: '/projects', filter: 'Hospitality' },
      { title: 'Rimal I & II Communities', desc: 'Residential · 40,000 sqm, Muscat', href: '/projects', filter: 'Residential' },
      { title: 'Al Khonji Commercial Building', desc: 'Commercial · Muscat', href: '/projects', filter: 'Commercial' },
      { title: 'Rusayl Industrial Warehouse', desc: 'Industrial · Rusayl', href: '/projects', filter: 'Industrial' },
    ],
    cta: 'View All 200+ Projects',
  },
};
