import { Button } from 'antd';
import React from 'react';
import { useHistory } from 'react-router-dom';

const Login: React.FC = () => {
  const history = useHistory();
  return (
    <div>
      <div>Login Page</div>
      <div>
        <Button onClick={() => { history.push('/foo'); }}>Login</Button>
      </div>
    </div>
  );
};

export default Login;