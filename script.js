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
                return "X Wins";
            }
            if(Ocount === 3){
                O.increaseScore();
                return "O Wins";
            }
        }
        if(!board.includes(null || undefined)){
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
            gameResult();
        }
    }
    
    return {
        board,
        playerMove,
    };
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