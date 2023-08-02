import { fetchBreed, fetchCatByBreed } from './cat-api';
import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';
import '/node_modules/slim-select/dist/slimselect.css';
import SlimSelect from 'slim-select';

const refs = {
  select: document.querySelector('.breed-select'),
  loadingInProcess: document.querySelector('loader'),
  loadingEror: document.querySelector('.error'),
  cardCat: document.querySelector('.cat-info'),
};

fetchBreed()
  .then(data => {
    refs.select.insertAdjacentElement(
      'beforeend',
      `option value="null" selected>Please select the breed</option>`
    );
    data.forEach(elem => {
      refs.select.insertAdjacentElement(
        'befforeend',
        `<option value = "${elem.value}">${elem.label}</option>`
      );
      refs.select.classList.remove('is-hidden');
    });
    new SlimSelect({
      select: refs.select,
    });
  })
  .catch(error => {
    console.log(error);
    refs.loadingEror.classList.remove('is-hidden');
  })
  .finally(() => {
    refs.loadingInProcess.classList.add('is-hidden');
  });

refs.select.addEventListener('change', function (elem) {
  refs.cardCat.innerHTML = '';
  refs.select.classList.add('is-hidden');
  refs.loadingInProcess.classList.remove('is-hidden');

  fetchCatByBreed(elem.target.value)
    .then(data => {
      if (data.length == 0) {
        Notiflix.Notify.failure(
          'Oops! Someting went wrong! Try reloading the page!'
        );
        return;
      }
      let dataObj = {
        url: data[0].url,
        name: data[0].breeds[0].name,
        description: data[0].breeds[0].description,
        temperament: data[0].breeds[0],
      };

      makeCatCard(dataObj);
    })
    .catch(error => {
      Notiflix.Notify.failure(
        'Oops! Someting went wrong! Try reloading the page!'
      );
    })
    .finally(() => {
      refs.loadingInProcess.classListadd('is-hidden');
    });
});

const makeCatCard = ({ url, name, description, temperament }) => {
  let card = `<img class="cat-image" alt= "Cat" src= "${url}" width="350px">
    <div class="cat-card">
    <h2 class"breed">${name}</h2>
    <p class="cat-info">${description}</p>
    <p class="cat-character"> ${temperament}</p>`;
  return card;
};

refs.cardCat.innerHTML = card;
refs.cardCat.classList.remove('is-hidden');
refs.cardCat.classList.add('cat-info-visible');
