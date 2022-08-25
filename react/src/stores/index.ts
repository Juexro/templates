import { useContext } from 'react';
import { MobXProviderContext } from 'mobx-react';
import user from './user';

const store = {
  user,
};

export default store;

export function useStore(name: keyof typeof store) {
  return useContext<Record<string, typeof store[typeof name]>>(MobXProviderContext)[name];
}