function Player(){
    attackEnemy = function(board, [x,y]){
        board.receiveAttack([x,y]);
    }
    randomMove = function(board){
        const nextmove = board.legalMoves[Math.floor(Math.random() * board.legalMoves.length)];
        attackEnemy(board, nextmove);
    }
    return{
        attackEnemy, randomMove
    }
}
module.exports = Player;