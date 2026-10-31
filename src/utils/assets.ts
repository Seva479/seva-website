/**
 * SEVA Production-Optimized Visual Asset Helpers
 *
 * All image assets are stored in /public/assets/images/ with dual WebP (primary)
 * and JPEG (compressed fallback) representations.
 *
 * In Vite:
 * Anything in /public is copied verbatim into /dist/ upon `npm run build`,
 * guaranteeing that absolute paths like `/assets/images/...` will resolve
 * reliably on production deployments, staging, and preview environments.
 */

export const ASSET_IMAGES = {
  hero: {
    webp: '/assets/images/hero_grassroots_technology.webp',
    jpg: '/assets/images/hero_grassroots_technology.jpg',
    alt: 'SEVA coordinator reviewing participatory community data with rural village women leaders in Maharashtra',
  },
  digitalTraining: {
    webp: '/assets/images/digital_training_rural.webp',
    jpg: '/assets/images/digital_training_rural.jpg',
    alt: 'Digital capacity building and MIS training workshop for grassroots rural women coordinators',
  },
  fieldData: {
    webp: '/assets/images/field_data_collection.webp',
    jpg: '/assets/images/field_data_collection.jpg',
    alt: 'Participatory field data collection on mobile tablet in an agricultural village',
  },
  officeSystems: {
    webp: '/assets/images/ngo_office_systems.webp',
    jpg: '/assets/images/ngo_office_systems.jpg',
    alt: 'Grassroots development team collaborating over project monitoring dashboards',
  },
};
