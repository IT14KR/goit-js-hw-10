import { fetchBreed, fetchCatByBreed } from './cat-api';
import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';
import 'slim-select/dist/slimselect.css';

const refs = {
  select: document.querySelector('.breed-select'),
  loadingInProcess: document.querySelector('.loader'),
  loadingError: document.querySelector('.error'),
  catInfo: document.querySelector('.cat-info'),
};

fetchBreed()
  .then(data => {
    refs.select.insertAdjacentHTML(
      'beforeend',
      `<option value="null" selected>Please select the breed</option>`
    );

    data.forEach(elem => {
      refs.select.insertAdjacentHTML(
        'beforeend',
        `<option value="${elem.value}">${elem.label}</option>`
      );
    });

    refs.select.classList.remove('is-hidden');

    new SlimSelect({
      select: '.breed-select',
    });
  })
  .catch(error => {
    console.log(error);
    refs.loadingError.classList.remove('is-hidden');
  })
  .finally(() => {
    refs.loadingInProcess.classList.add('is-hidden');
  });

refs.select.addEventListener('change', function (event) {
  const breedId = event.target.value;

  if (breedId === 'null') return;

  refs.catInfo.innerHTML = '';
  refs.select.classList.add('is-hidden');
  refs.loadingInProcess.classList.remove('is-hidden');

  fetchCatByBreed(breedId)
    .then(data => {
      if (data.length === 0) {
        Notiflix.Notify.failure('No cats were found for this breed.');
        return;
      }

      const { name, description, temperament } = data[0].breeds[0];
      const url = data[0].url;

      const card = makeCatCard({ url, name, description, temperament });
      refs.catInfo.innerHTML = card;
    })
    .catch(error => {
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
    })
    .finally(() => {
      refs.loadingInProcess.classList.add('is-hidden');
    });
});

function makeCatCard({ url, name, description, temperament }) {
  return `
    <img class="cat-image" alt="Cat pictures" src="${url}" width="500px">
    <div class="cat-card">
      <h2 class="breed">${name}</h2>
      <p class="cat-info">${description}</p>
      <p class="cat-character">${temperament}</p>
    </div>`;
}

// const { url, name, description, temperament } = data[0].breeds[0];

//       const card = makeCatCard({ url, name, description, temperament });
//       refs.catInfo.innerHTML = card;
//     })
