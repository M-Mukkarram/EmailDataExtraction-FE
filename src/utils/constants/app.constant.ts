const versionNumber = '1';
export const APP_CONFIG = {
  app: {
    name: import.meta.env.VITE_APP_NAME || 'EMAIl_DATA_EXTRACTION',
  },
  api: {
    baseUrl: `https://backend.erp-nnc.com/v${versionNumber}/api`,
    // `http://localhost:8080/v${versionNumber}/api`
    assetsUrl: import.meta.env.VITE_ASSETS_BASE_URL || '',
  },
  week: [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
  ],
};

Object.seal(APP_CONFIG);
