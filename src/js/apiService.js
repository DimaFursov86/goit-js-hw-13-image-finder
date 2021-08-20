const Pixabay_KEY = "23001140-4461295a2c2bf2ca42afdabe3"

export default class CardsApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }
    
    fetchCards() {
        // console.log(this)
        return fetch(`https://pixabay.com/api/?key=${Pixabay_KEY}&image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12`)
            .then(response => response.json())
            .then(({ hits }) => {
        this.incrementPage();
        return hits;
            })
            .catch(error => {
                return
            });

    }
    incrementPage() {
    this.page += 1;
    }
    
    resetPage() {
    this.page = 1;
    }

    get query() {
    return this.searchQuery;
    }

    set query(newQuery) {
    this.searchQuery = newQuery;
    }
};