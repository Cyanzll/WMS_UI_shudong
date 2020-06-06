import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'antd/dist/antd.css';
import { GlobalStyle } from './style';
import { ConfigProvider } from 'antd';
import cn from 'antd/es/locale/zh_CN.js';

/* 入口 */
ReactDOM.render(
  <>
    <ConfigProvider locale={cn}>
      <GlobalStyle />
      <App />
    </ConfigProvider>
  </> ,
  document.getElementById('root')
);
