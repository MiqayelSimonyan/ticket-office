import {Auth} from '../AC';

export function isAuth(url) {
  return fetch(url, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    credentials: 'include',
  })
  .then(response => response.json())
  .then(auth => auth)
  .catch((err) => console.error('err', err));
}