import { renderRoutes, RouteComponent } from '@/routes/RootRouter';
import { Button, Space } from 'antd';
import React from 'react';
import { useHistory } from 'react-router-dom';

const Home: React.FC<RouteComponent> = ({ routes }) => {
  const history = useHistory();

  return (
    <div>
      <div>Home Page Header</div>
      <div>
        <Space>
          <Button onClick={() => { history.push('/foo'); }}>foo</Button>
          <Button onClick={() => { history.push('/bar'); }}>bar</Button>
          <Button onClick={() => { history.push('/login'); }}>login</Button>
        </Space>
      </div>
      <div>
        <div>Route</div>
        {
          renderRoutes(routes)
        }
      </div>
    </div>
  )
};

export default Home;