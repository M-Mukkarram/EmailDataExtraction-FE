export const QUERY_STRING = {
  PAGINATION: {
    LIMIT: '_limit',
    PAGE: '_page',
  },
  OTHER_PARAMS: {
    SEARCH: '_search',
    FILTERS: {
      DATE_FROM: '_dateFrom',
      DATE_TO: '_dateTo',
      SUPPLIER_NAMES: '_supplierNames',
      LOCATIONS: '_locations',
      START_DATE: '_startDate',
      END_DATE: '_endDate',
    },
  },
};

Object.seal(QUERY_STRING);
