import { ThemeConfig } from 'antd';

export const theme: ThemeConfig = {
  components: {
    Form: {
      itemMarginBottom: 0,
    },
  },

  token: {
    colorPrimary: '#001E80',
  },
};

Object.seal(theme);
