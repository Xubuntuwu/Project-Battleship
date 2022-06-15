function Ship(span){
    span= span;
    hitarray= new Array(span).fill(false);
    hits = [];
    toHit = function(loc){
        if(loc<span){
            this.hitarray.splice(loc, 1, true); //change index to true (hit)
            this.hits.push(loc);
        }
        else{
            throw 'Hit is outside of ship!';
        }
    }
    isSunk = function(){
        if(this.hitarray.every(e=>e===true)){
            return true;
        }
        else{
            return false;
        }
    }
    return{
        span: span,
        hitarray: hitarray,
        hits: hits,
        toHit,
        isSunk
    }
}

function Gameboard(){
    length= 10;
    width= 10;
    board= [];
    ships = []; //to check if all ships have sunk
    for(let i=0; i<length;i++){
        this.board.push(new Array(width).fill());
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
        return ships.every(ship=> ship.isSunk()===true);
    }
    return{
        board, placeShip, receiveAttack, missedShots, allSunk
    }
}