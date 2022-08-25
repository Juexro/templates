import { action, makeObservable, observable } from 'mobx';

const USER_INFO_NAME = 'USER_INFO';

export interface UserInfo {
  name: string;
  token: string;
  refreshToken: string;
}

class UserStore {
  constructor() {
    makeObservable(this);
    this.init();
  }

  @observable info: UserInfo | null = null;

  @action setInfo(info: Partial<UserInfo> | null) {
    if (!info) {
      window.localStorage.removeItem(USER_INFO_NAME);
      this.info = null;
    } else {
      const data = { ...this.info, ...info };
      window.localStorage.setItem(USER_INFO_NAME, JSON.stringify(data));
      this.info = data as UserInfo;
    }
  }

  init = () => {
    const getUserInfo = () => {
      try {
        if (window.localStorage.getItem(USER_INFO_NAME)) {
          return JSON.parse(window.localStorage.getItem(USER_INFO_NAME) as string);
        }
        return null;
      } catch {
        return null;
      }
    };
    this.info = getUserInfo();
  };
}

export default new UserStore();