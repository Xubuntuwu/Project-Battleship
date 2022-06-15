function Gameboard(){
    length= 10;
    width= 10;
    board= [];
    for(let i=0; i<length;i++){
        this.board.push(new Array(width).fill());
    }
    placeShip = function (ship, orientation, [x, y]){ //y and x are actually opposite in visual array
        if(orientation==='vertical'){
            for(i=0;i<ship.span;i++){
                this.board[x][y+i]=[ship, 0+i];
            }
        }
        else if(orientation==='horizontal'){
            for(i=0;i<ship.span;i++){
                this.board[x+i][y]=[ship, 0+i];
            }
        }
        else{
            throw 'invalid orientation, placeShip';
        }
    }
    receiveAttack = function([x,y]){
        if(this.board[x][y]!==undefined){
            let ship = this.board[x][y][0];
            let hitloc = this.board[x][y][1];
            ship.toHit(hitloc);
        }
        else{
            this.missedShots.push([x,y]);
        }
    }
    missedShots = [];
    allSunk = function(){
        return this.board.every(array=>array.every(e=>e===undefined||e[0].isSunk()===true)===true);
    }
    return{
        board, placeShip, receiveAttack, missedShots, allSunk
    }
}

module.exports = Gameboard;