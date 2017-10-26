(function () {
    let startButton = document.getElementById('start-game');
    startButton.addEventListener('click', startGameClicked);

    function startGameClicked() {
        let difficulty = document.querySelector('[name="game-difficulty"]:checked').value;
        let theme = document.querySelector('[name="card-back"]:checked').value;

        let game = new Game(theme, difficulty);
        game.start();
    }
})()