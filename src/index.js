
import './sass/main.scss';


import allcardsTpl from './templates/allcards.hbs';
import LoadMoreBtn from './js/load-more-btn';
import CardsApiService from './js/apiService';




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
  loadMoreBtn.refs.button.scrollIntoView({
  behavior: 'smooth',
  block: 'end',
  });
  fetchCards();
}

function handleInput(e) {
    e.preventDefault();
  cardsApiService.query = e.target.value.trim();
  loadMoreBtn.show();
    cardsApiService.resetPage();
    clearCardsContainer();
    fetchCards();
console.log(e)
  //  cardsApiService.fetchCards() 
  //       .then(allCards => {appendCardsMarkup(allCards)})
    
  
  // console.log( this.query)
                // if  (Cards !== undefined && Cards.status !== 404) {
                //     const cardsHtml = Cards.map((card) => `<li class="cardList">${card.webformatURL}</li>`)
                // console.log(cardsHtml)
                    // if (countriesHtml.length > 10) {
                    //     error({ delay: 1300, width: '310px', text: 'Too many matches found. Please enter more specific query!' });
                    //     refs.countriesList.innerHTML = ``;                 
                    // }             
                    // else if (countriesHtml.length === 1) {
                    //     const markup = countryCardTpl(countries[0])
                    //     refs.countriesList.innerHTML = `<li class="noMarker">${markup}</li>`;
                    // }
                    // else if (countriesHtml.length > 1 && countriesHtml.length < 11) {
                    //     refs.countriesList.innerHTML = countriesHtml;
                    
                    // };
            //     }              
}

function fetchCards() {
  loadMoreBtn.disable();
        cardsApiService.fetchCards() 
    .then(allCards => { appendCardsMarkup(allCards); loadMoreBtn.enable(); onBadValue(allCards)})
  
}
function onBadValue(allCards) {
  
  if (allCards.length === 0) {
    loadMoreBtn.hide();
  }
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