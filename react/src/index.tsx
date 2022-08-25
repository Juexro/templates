import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import './styles/index.less';
import RootRouter from './routes/RootRouter';
import stores from './stores';
import zhCN from 'antd/lib/locale/zh_CN';
import { ConfigProvider } from 'antd';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
dayjs.locale('zh-cn');

ReactDOM.render(
  <ConfigProvider locale={zhCN}>
    <Provider {...stores}>
      <RootRouter />
    </Provider>
  </ConfigProvider>,
  document.getElementById('root'),
);