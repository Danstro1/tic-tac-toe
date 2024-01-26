const gameBoard = (function() {
    let board = new Array(9);
    let winCombinations = ['012','345','678','036','147','258','048','246'];

    const X = createPlayer();
    const O = createPlayer();

    const gameResult = () => {
        for(let combination of winCombinations) {
            let Xcount = 0;
            let Ocount = 0;
            for(let cell of combination.split('')){
                if(board[cell] === 'X') Xcount++;
                if(board[cell] === 'O') Ocount++;
            }
            if(Xcount === 3){
                X.increaseScore();
                Xcount = 0;
                board = board.fill();
                return "X Wins";
            }
            if(Ocount === 3){
                O.increaseScore();
                board = board.fill();
                Ocount = 0;
                return "O Wins";
            }
        }
        if(!board.includes(null || undefined)){
            Xcount = 0;
            Ocount = 0;
            board = board.fill();
            return "Draw";
        }
        return null;
    }

    const playerMove = (player, cell) => {
        if(board[cell] == null){
            if(player == 'X') {
                board[cell] = 'X';
            }
            if(player == 'O') {
                board[cell] = 'O';
            }
        }
    }

    const getBoard = () => board;

    const getXscore = () => X.getScore();
    const getOscore = () => O.getScore();

    return {
        getXscore,
        getOscore,
        gameResult,
        getBoard,
        playerMove,
    };
})();

const displayController = (function(){
    let counter = 0;
    const cells = document.querySelectorAll('.cell');
    const dialog = document.querySelector('dialog');

    const clearBoard = () => cells.forEach(cell => cell.textContent = '');

    cells.forEach(cell => cell.addEventListener('click',() => {
        let result;
        if(gameBoard.getBoard()[cell.attributes.value.value] == null) {
            if(counter % 2 == 0) {
                gameBoard.playerMove('X', cell.attributes.value.value);
                cell.textContent = 'X';
                counter++;
                result = gameBoard.gameResult();
            }else{
                gameBoard.playerMove('O', cell.attributes.value.value);
                cell.textContent = 'O';
                counter++;
                result = gameBoard.gameResult();
            }
            if(result != null) {
                document.querySelector('.winner').textContent = result;
                dialog.showModal();
                document.querySelector('.Xscore').textContent = gameBoard.getXscore();
                document.querySelector('.Oscore').textContent = gameBoard.getOscore();
            }
        }
    }))

    document.querySelector('.retry').addEventListener('click',() => {
        clearBoard();
        counter = 0;
        dialog.close();
    })
})();

function createPlayer() {
    let score = 0;

    const getScore = () => score;
    const increaseScore = () => score++;

    return {
        getScore,
        increaseScore
    }
}