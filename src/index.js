
import './sass/main.scss';

import allcardsTpl from './templates/allcards.hbs';
import LoadMoreBtn from './js/load-more-btn';
import CardsApiService from './js/apiService';

// import { error, alert} from '@pnotify/core';
// import '@pnotify/core/dist/PNotify.css';
// import '@pnotify/core/dist/BrightTheme.css';



const refs = {
    input: document.querySelector('.js-input'),
    cardsContainer: document.querySelector('.gallery'),
    
}

const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});

const debounce = require('lodash.debounce');
refs.input.addEventListener('input', debounce(handleInput, 1000));
loadMoreBtn.refs.button.addEventListener('click', onLoadMore);

const cardsApiService = new CardsApiService();

function onLoadMore(e) {
  console.log(loadMoreBtn.refs.button)
  
  loadMoreBtn.disable();
        cardsApiService.fetchCards() 
          .then(allCards => { appendCardsMarkup(allCards); loadMoreBtn.enable(); scroll(); })
 
}

function scroll() {
 loadMoreBtn.refs.button.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    }); 
}

function handleInput(e) {
    e.preventDefault();
  cardsApiService.query = e.target.value.trim();
  loadMoreBtn.show();
    cardsApiService.resetPage();
    clearCardsContainer();
    fetchCards();
    onBadValue();
 
}

function fetchCards() {
  loadMoreBtn.disable();
        cardsApiService.fetchCards() 
          .then(allCards => { appendCardsMarkup(allCards); loadMoreBtn.enable(); })
  
}
function onBadValue() {
 
  cardsApiService.fetchCards()
    .then(allCards => {
      if (allCards.length === 0) {
        loadMoreBtn.hide();
        //   error({ delay: 3000, width: '310px', text: 'Please, enter some valid value!' });
        // }
        //     else { alert({ delay: 3000, width: '310px', text: 'We found some photos!' }); }
        // })
  
      }
    })
}
function appendCardsMarkup(allCards) {
  refs.cardsContainer.insertAdjacentHTML('beforeend', allcardsTpl(allCards));
}

function clearCardsContainer() {
  refs.cardsContainer.innerHTML = '';
}

const modalCloseButton = document.querySelector("[data-action=close-lightbox]")
const lightBox = document.querySelector(".js-lightbox");
const fotoImg = document.querySelector(".lightbox__image");

refs.cardsContainer.addEventListener("click", onOpenFotoClik);
modalCloseButton.addEventListener("click", onCloseFotoClik);

function onOpenFotoClik(e) {
  if (!e.target.classList.contains("card-image")) {
    return;
  }
  console.dir(e.target)
  e.preventDefault();
  lightBox.classList.add("is-open");
  fotoImg.src = e.target.dataset.source;
  fotoImg.alt = e.target.alt;
  window.addEventListener("keydown", escapePress)
};

function onCloseFotoClik() {
  lightBox.classList.remove("is-open");
  fotoImg.src = "";
  fotoImg.alt = "";
  window.addEventListener("keydown", escapePress)
}

function escapePress(e) {
  if (e.code === "Escape") {
onCloseFotoClik()
  }
}