function Gameboard(){
    length= 10;
    width= 10;
    board= [];
    legalMoves = []; //for the AI
    ships = []; //to check if all ships have sunk
    for(let i=0; i<length;i++){
        this.board.push(new Array(width).fill());
        for(let j=0; j<width;j++){
            this.legalMoves.push([i,j]);
        }
    }
    placeShip = function (ship, orientation, [x, y]){ //y and x are actually opposite in visual array
        if(orientation==='vertical'){
            for(i=0;i<ship.span;i++){
                this.board[x][y+i]=[ship, 0+i];
                ships.push(ship);
            }
        }
        else if(orientation==='horizontal'){
            for(i=0;i<ship.span;i++){
                this.board[x+i][y]=[ship, 0+i];
                ships.push(ship);
            }
        }
        else{
            throw 'invalid orientation, placeShip';
        }
    }
    returnIndexOf = function(array,arrayparent){ //apparantly indexOf() doesnt work on arrays, === and == output false regardless
        function arraysEqual(a, b) {
            if (a === b) return true;
            if (a == null || b == null) return false;
            if (a.length !== b.length) return false;
            for (var i = 0; i < a.length; ++i) {
              if (a[i] !== b[i]) return false;
            }
            return true;
          }
        for(let i=0;i<arrayparent.length;i++){
            if(arraysEqual(arrayparent[i], array)){
                return i
            }
        }
    }
    receiveAttack = function([x,y]){
        this.legalMoves.splice(returnIndexOf([x,y], this.legalMoves), 1);
        if(this.board[x][y]!==undefined && this.board[x][y]!==false){
            let ship = this.board[x][y][0];
            let hitloc = this.board[x][y][1];
            ship.toHit(hitloc);
            this.board[x][y]= false;
        }
        else if(this.board[x][y]===false){ 
            // this.doubleShots.push([x,y]);//for testing illegal moves (twice the same shot)
            throw 'You can\'t shoot the same shot twice';
        }
        else{
            this.board[x][y]=false;
            this.missedShots.push([x,y]);
        }
    }
    missedShots = [];
    doubleShots = []; //doubleshots exists for testing purposes
    allSunk = function(){
        return ships.every(ship=> ship.isSunk()===true);
    }
    checkLegalMove = function([x,y]){
        if(this.board[x][y]!==false){
            return true;
        }
        else{
            return false;
        }
    }

    return{
        board, placeShip, receiveAttack, missedShots, allSunk, legalMoves, checkLegalMove, doubleShots
    }
}

module.exports = Gameboard;