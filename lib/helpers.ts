import { UserData } from './types';

function saveUserLS(obj: {}) {
  const json = JSON.stringify(obj);

  window.localStorage.setItem('user-data', json);
}

function getUserLS(): UserData | null {
  if (typeof window === 'undefined') return null;
  const json = window.localStorage.getItem('user-data');

  if (!json) {
    return null;
  }

  const obj = JSON.parse(json) as UserData;

  return obj;
}

export { saveUserLS, getUserLS };
