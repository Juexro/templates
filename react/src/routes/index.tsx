import { Redirect, RouteProps } from 'react-router-dom';
import Home from '@/pages/home';
import Login from '@/pages/login';
import Foo from '@/pages/home/foo';
import Bar from '@/pages/home/bar';

export interface RouteOptions extends RouteProps {
  routes?: RouteOptions[];
  auth?: boolean;
}

export const routes: RouteOptions[] = [
  {
    path: '/login',
    component: Login,
    exact: true,
    auth: false
  },
  {
    path: '/',
    component: Home,
    routes: [
      {
        path: '/foo',
        component: Foo,
        exact: true,
        auth: true
      },
      {
        path: '/bar',
        component: Bar,
        exact: true,
        auth: true,
      },
      {
        component: () => <Redirect to="/" />
      },
    ]
  },
];