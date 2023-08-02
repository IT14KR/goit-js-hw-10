import Notiflix from 'notiflix';
const BASE_URL = 'https://api.thecatapi.com';
const END_POINT = '/v1/breed';
const API_KEY =
  'live_kDC2Z3kSuo8sUbwPoAxUKSOmuaiBzC4iQtpfxde71TWhSU6Il9rdOVbwv02SNec0';

export function fetchBreeds() {
  return fetch(`${BASE_URL}${END_POINT}`, {
    headers: { 'x-api-key': API_KEY },
  })
    .then(res => {
      if (!res.ok) {
        throw new Error(res.status);
      }
      return res.json();
    })
    .then(data => {
      return data.map(({ id, name }) => ({
        value: id,
        label: name,
      }));
    })
    .catch(() => {
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
    });
}

export function fetchCatByBreed(breedId) {
  return fetch(`${BASE_URL}/images/search?breed_ids=${breedId}`, {
    headers: { 'x-api-key': API_KEY },
  })
    .then(res => {
      if (!res.ok) {
        throw new Error(res.status);
      }
      return res.json();
    })
    .catch(() => {
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
    });
}
