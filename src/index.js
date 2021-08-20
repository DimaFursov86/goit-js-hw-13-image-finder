
import onecardTpl from './templates/onecard.hbs';
import allcardsTpl from './templates/allcards.hbs';
import './sass/main.scss';
import CardsApiService from './js/apiService';




const refs = {
    input: document.querySelector('.js-input'),
    cardsContainer: document.querySelector('.gallery'),
    loadMoreBtn: document.querySelector('[data-action="load-more"]')
}

const debounce = require('lodash.debounce');
refs.input.addEventListener('input', debounce(handleInput, 1000));
refs.loadMoreBtn.addEventListener('click', onLoadMore)
// const element = document.getElementById('.my-element-selector');
// element.scrollIntoView({
//   behavior: 'smooth',
//   block: 'end',
// });

const cardsApiService = new CardsApiService();

function onLoadMore(e) {
cardsApiService.fetchCards().then(allCards => {appendCardsMarkup(allCards)})
}

function handleInput(e) {
    
    cardsApiService.query = e.target.value.trim();
    cardsApiService.resetPage();
    clearCardsContainer();
    console.log( cardsApiService.query)

   cardsApiService.fetchCards() 
        .then(allCards => {appendCardsMarkup(allCards)})
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

function appendCardsMarkup(hits) {
  refs.cardsContainer.insertAdjacentHTML('beforeend', allcardsTpl(hits));
}

function clearCardsContainer() {
  refs.cardsContainer.innerHTML = '';
}