class Game {
    constructor(theme, difficulty) {        
        this.theme = theme;
        this.difficulty = difficulty;

        this.isClickCardEnabled = true;
        this.openCardsList = [];
        this.gameTime = 0;
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
        this.infoContainer = document.querySelector('.game-info-container');
        this.gameContainer = document.querySelector('.game-container');
        this.gameCardContainer = document.querySelector('.game-card-container');
        this.gameOverContainer = document.querySelector('.game-over-container');
        this.quitButtons = document.getElementsByClassName('quit-game-button');
        this.resetButton = document.querySelector('.reset-game-button');
        this.timeContainer = document.querySelector('.time-text');

        this.onCardClickedBinded = this.onCardClicked.bind(this);
        this.quitGameClickedBinded = this.quitGameClicked.bind(this);
        this.resetGameClickedBinded = this.resetGameClicked.bind(this);

        this.buildCardsList();
        this.renderCards();
        this.startGameTimer();
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
        this.infoContainer.style.display = 'none';

        this.gameCardContainer.innerHTML = '';
        this.gameContainer.style.display = 'block';
        this.gameContainer.classList.add('cards-set' + this.difficulty);

        this.gameCardList.forEach((el) => this.gameCardContainer.appendChild(el));
    }
    addListeners() {
        let cards = document.getElementsByClassName('card');

        Array.from(cards).forEach(el => el.addEventListener('click', this.onCardClickedBinded));
        Array.from(this.quitButtons).forEach(el => el.addEventListener('click', this.quitGameClickedBinded));
        this.resetButton.addEventListener('click', this.resetGameClickedBinded);
    }
    removeListeners() {
        let cards = document.getElementsByClassName('card');

        Array.from(cards).forEach(el => el.removeEventListener('click', this.onCardClickedBinded));
        Array.from(this.quitButtons).forEach(el => el.removeEventListener('click', this.quitGameClickedBinded));
        this.resetButton.removeEventListener('click', this.resetGameClickedBinded);
    }
    onCardClicked(e) {
        let currentCard = e.currentTarget;

        if (!this.isClickCardEnabled || currentCard.classList.contains('card-open')) return;

        currentCard.classList.add('card-open');
        this.openCardsList.push(currentCard);

        if (this.openCardsList.length === 2) {
            this.isClickCardEnabled = false;
            this.cardOpenTimeOut = setTimeout(() => {
                if (this.openCardsList[0].dataset.number === this.openCardsList[1].dataset.number) {

                    this.openCardsList.forEach(el => el.classList.add('card-hidden'));

                    this.removedCardCounter += 2;
                    this.openCardsList.length = 0;

                    this.isClickCardEnabled = true;

                    if (this.removedCardCounter === this.gameCardList.length) {
                        clearInterval(this.gameInterval);
                        this.gameCardContainer.innerHTML = '';
                        this.gameContainer.style.display = 'none';
                        this.gameOverContainer.style.display = 'block';
                        this.gameOverContainer.querySelector('.time').innerHTML = '' + this.gameTime;
                    }
                } else {
                    this.openCardsList.forEach(el => el.classList.remove('card-open'));
                    this.openCardsList.length = 0;
                    this.isClickCardEnabled = true;
                }
            }, 1000);
        }
    }
    startGameTimer() {
        this.timeContainer.innerHTML = '' + this.gameTime;
        this.gameInterval = setInterval(() => {
            this.timeContainer.innerHTML = '' + ++this.gameTime;
        }, 1000);
    }
    resetGameClicked() {
        clearInterval(this.gameInterval);
        clearTimeout(this.cardOpenTimeOut);
        this.gameTime = 0;
        if (this.openCardsList.length) {
            this.openCardsList.forEach(el => el.classList.remove('card-open'));
        }
        this.openCardsList.length = 0;
        this.isClickCardEnabled = true;
        this.gameCardList = this.gameCardList.shuffle();
        this.renderCards();
        this.startGameTimer();
    }
    quitGameClicked() {
        this.gameCardContainer.innerHTML = '';
        this.gameContainer.style.display = 'none';
        this.gameOverContainer.style.display = 'none';
        this.infoContainer.style.display = 'block';
        this.gameContainer.classList.remove('cards-set5', 'cards-set6', 'cards-set9');

        this.removeListeners();
        clearTimeout(this.cardOpenTimeOut);
        clearInterval(this.gameInterval);
        for (let prop in this) {
            delete this[prop];
        }        
    }
}