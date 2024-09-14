import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/App.tsx';
import { ConfigProvider } from 'antd';
import { App as AntApp } from 'antd';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { theme } from './constants/theme.constants';
import './index.css';
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="1089634070694-b4tv7lvak2513v6kl2t6i92juaivkkaj.apps.googleusercontent.com">
      <ConfigProvider theme={theme}>
        <AntApp className="h-full">
          <App />
        </AntApp>
      </ConfigProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
