class Game {
    constructor(theme, difficulty) {        
        this.theme = theme;
        this.difficulty = difficulty;

        this.isClickCardEnabled = true;
        this.openCardsList = [];
        this.removedCardCounter = 0;
        this.backSideURLs = {
            spaceURLs: 'images/card-back/space-back-side.png',
            radiationURLs: 'images/card-back/radiation-back-side.png',
            animalsURLs: 'images/card-back/animal-back-side.png'
        };
        this.spaceURLs = [
            'images/space-theme/asteroid.png',
            'images/space-theme/comet.png',
            'images/space-theme/earth.png',
            'images/space-theme/moon.png',
            'images/space-theme/planet.png',
            'images/space-theme/rocket.png',
            'images/space-theme/saturn.png',
            'images/space-theme/stantion.png',
            'images/space-theme/stars.png',
            'images/space-theme/stranger.png',
            'images/space-theme/telescope.png',
            'images/space-theme/way.png'
        ];
        this.radiationURLs = [
            'images/radiation-theme/actinium.png',
            'images/radiation-theme/astatine.png',
            'images/radiation-theme/cesium.png',
            'images/radiation-theme/erbium.png',
            'images/radiation-theme/krypton.png',
            'images/radiation-theme/lithium.png',
            'images/radiation-theme/nobelium.png',
            'images/radiation-theme/radium.png',
            'images/radiation-theme/tellurium.png',
            'images/radiation-theme/uranium.png',
            'images/radiation-theme/vanadium.png',
            'images/radiation-theme/xenon.png'
        ];
        this.animalsURLs = [
            'images/animal-theme/bird-tree.png',
            'images/animal-theme/bird.png',
            'images/animal-theme/cat.png',
            'images/animal-theme/cobra.png',
            'images/animal-theme/haski.png',
            'images/animal-theme/heron.png',
            'images/animal-theme/monkey.png',
            'images/animal-theme/mouse.png',
            'images/animal-theme/rhinoceros.png',
            'images/animal-theme/smoke-cat.png',
            'images/animal-theme/squirrel.png',
            'images/animal-theme/tiger.png'
        ];
    }
    start() {
        this.buildCardsList();
        this.renderCards();
        this.addListeners();
    }
    buildCardsList() {
        let listUnicCardsURLs = this[this.theme].getRandItemsRange(this.difficulty);
        let listCardsURLs = listUnicCardsURLs.concat(listUnicCardsURLs);
        let cardNum = 0;
        let lengthURLs = listCardsURLs.length;        
        let backSideImgSrc = this.backSideURLs[this.theme];

        this.gameCardList = listCardsURLs.map( (el, i) => {
            if ( i === lengthURLs / 2 ) { cardNum = 0; }
            let cardsWrapper = document.createElement('div');
            let cardBack = document.createElement('div');
            let cardFront = document.createElement('div');
            let backSideImg = new Image();
            let imageFront = new Image();
            imageFront.src = el;
            backSideImg.src = backSideImgSrc;

            cardsWrapper.className = 'card';
            cardsWrapper.dataset.number = 'card' + cardNum++;
            cardBack.className = 'card-back';
            cardFront.className = 'card-front';

            cardBack.appendChild(backSideImg);
            cardFront.appendChild(imageFront);
            cardsWrapper.appendChild(cardBack);
            cardsWrapper.appendChild(cardFront);

            return cardsWrapper;
        }).shuffle();
    }
    renderCards() {
        document.querySelector('.game-info-container').style.display = 'none';
        let gameContainer = document.querySelector('.game-container');

        gameContainer.classList.add('cards-set' + this.difficulty);

        this.gameCardList.forEach((el) => gameContainer.appendChild(el));
    }
    addListeners() {
        let cards = document.getElementsByClassName('card');

        Array.from(cards).forEach((el) => el.addEventListener('click', this.onCardClicked.bind(this)));
    }
    onCardClicked(e) {
        let currentCard = e.currentTarget;

        if (!this.isClickCardEnabled || currentCard.classList.contains('card-open')) return;

        currentCard.classList.add('card-open');
        this.openCardsList.push(currentCard);

        if (this.openCardsList.length === 2) {
            this.isClickCardEnabled = false;
            setTimeout(() => {
                if (this.openCardsList[0].dataset.number === this.openCardsList[1].dataset.number) {

                    this.openCardsList[0].classList.add('card-hidden');
                    this.openCardsList[1].classList.add('card-hidden');

                    this.removedCardCounter += 2;
                    this.openCardsList.length = 0;

                    this.isClickCardEnabled = true;

                    if (this.removedCardCounter === this.gameCardList.length) {
                        let gameContainer = document.querySelector('.game-container');
                        gameContainer.innerHTML = '';
                        gameContainer.style.display = 'none';
                    }
                } else {
                    this.openCardsList[0].classList.remove('card-open');
                    this.openCardsList[1].classList.remove('card-open');
                    this.openCardsList.length = 0;
                    this.isClickCardEnabled = true;
                }
            }, 1000);
        }
    }
}