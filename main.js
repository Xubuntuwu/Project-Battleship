function Ship(span){
    span= span;
    hitarray= new Array(span).fill(false);
    hits = [];
    toHit = function(loc){
        if(loc<span){
            this.hitarray.splice(loc, 1, true);
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
                this.ships.push(ship);
            }
        }
        else if(orientation==='horizontal'){
            for(i=0;i<ship.span;i++){
                this.board[x+i][y]=[ship, 0+i];
                this.ships.push(ship);
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
            this.board[x][y]= true;
        }
        else if(this.board[x][y]===false ||this.board[x][y]===true){ 
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
        if(x<this.width && y<this.length && this.board[x][y]!==true && this.board[x][y]!==false){
            return true;
        }
        else{
            return false;
        }
    }
    checkLegalPlacement = function([x,y]){
        if(x<this.width && y<this.length && this.board[x][y]===undefined && this!==window){ //i dont know why this sometimes equals window and sometimes doesnt!!
            return true;
        }
        else{
            return false;
        }
    }

    return{
        board, placeShip, receiveAttack, missedShots, allSunk, legalMoves, checkLegalMove, doubleShots, ships, width, length, checkLegalPlacement
    }
}
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
function turnintoarray(coordinates){
    coordinates = coordinates.split(',');
    coordinates = coordinates.map(e=> Number(e));
    return coordinates;
}
function mainLoop(){
    let player1 = Player();
    let computer = Player();
    // const allplayers = [player1, computer];
    let board1 = Gameboard();
    let computerboard = Gameboard();
    let allboards = [board1, computerboard];
    let ship1;
    let ship2;
    let ship3;
    let ship4;
    let ship5;

    let ship6;
    let ship7;
    let ship8;
    let ship9;
    let ship0;

    let allShipsSunk = false;
    function checkAllShipsSunk(){
        allShipsSunk= allboards.some(e=>e.allSunk());
    }
    resetgame=()=>{
        player1 = Player();
        computer = Player();
        board1 = Gameboard();
        computerboard = Gameboard();
        allboards = [board1, computerboard];
        ship1 = Ship(5);
        ship2 = Ship(4);
        ship3 = Ship(3);
        ship4 = Ship(3);
        ship5 = Ship(2);

        ship6 = Ship(5);
        ship7 = Ship(4);
        ship8 = Ship(3);
        ship9 = Ship(3);
        ship0 = Ship(2)

        placeRandomShips(board1, ship1);
        placeRandomShips(board1, ship2);
        placeRandomShips(board1, ship3);
        placeRandomShips(board1, ship4);
        placeRandomShips(board1, ship5);
        
        placeRandomShips(computerboard, ship6);
        placeRandomShips(computerboard, ship7);
        placeRandomShips(computerboard, ship8);
        placeRandomShips(computerboard, ship9);
        placeRandomShips(computerboard, ship0);
        allShipsSunk=false;
    }
    resetgame();
    
    const board1div = document.getElementById('board1');
    const board2div = document.getElementById('board2');

    // console.table(board1.board);
    // console.table(computerboard.board);

    displayBoard(board1, board1div,true);
    displayBoard(computerboard, board2div, false);

    gameloopstart = ()=>{
        board2div.addEventListener('click', gameloop);
    }
    gameloop = (e)=>{
            displayBoard(board1, board1div, true);
            displayBoard(computerboard, board2div, false);
            let coordinates = turnintoarray(e.target.id);
            if(computerboard.checkLegalMove(coordinates)){
                player1.attackEnemy(computerboard, coordinates);
                displayBoard(computerboard, board2div, false);
                console.table(computerboard.board);   
                checkAllShipsSunk();          
                if(allShipsSunk){
                    alert('GAME HAS ENDED');
                    board2div.removeEventListener('click', gameloop);
                }
                else{
                    console.log('computer move');
                    setTimeout(computer.randomMove(board1),'1000');
                    displayBoard(board1, board1div,true);
                }
            }
            else throw 'illegal double move shouldnt be possible';
    }
    const startbutton = document.getElementById('start');
    const restartbutton = document.getElementById('restart');
    startbutton.addEventListener('click', gameloopstart);
    restartbutton.addEventListener('click',()=>{
        board2div.removeEventListener('click', gameloop);
        resetgame();
        displayBoard(board1, board1div,true);
        displayBoard(computerboard, board2div, false);
        let dragships = document.querySelectorAll('.dragship');
        console.log(dragships);
        dragships.forEach(e=> e.addEventListener('dragstart', moveShips))
        // board1div.addEventListener('click', (e)=>moveShips(e,board1));
    });
}
mainLoop();

function moveShips(e){
    console.log(e.target.id);
    // e.dataTransfer.setData('text/plain', e.target.id);
    // console.log(board.board[turnintoarray(e.target.id)[1]][turnintoarray(e.target.id)[0]]);
}

function placeRandomShips(board, ship){
    const orientations = ['horizontal', 'vertical'];
    let randomloc = board.legalMoves[Math.floor(Math.random() * board.legalMoves.length)];
    let randomorient = orientations[Math.floor(Math.random() *2)];
    calcrandom = ()=>{
        randomloc = board.legalMoves[Math.floor(Math.random() * board.legalMoves.length)];
        randomorient = orientations[Math.floor(Math.random() *2)];};
    checkrandom = ()=>{
        if(randomorient==='horizontal'){
            let [x,y] =randomloc;
            let allLegal = [];
            for(let i=0; i<ship.span;i++){
                allLegal.push(board.checkLegalPlacement([x+i,y]));
            }
            if(allLegal.every(e=>e===true)){
                board.placeShip(ship, randomorient, randomloc);
                console.table(board.board);
            }
            else{
                calcrandom();
                checkrandom();
            }
        }
        else if(randomorient==='vertical'){
            let [x,y] =randomloc;
            let allLegal = [];
            for(let i=0; i<ship.span;i++){
                allLegal.push(checkLegalPlacement([x,y+i]));
            }
            if(allLegal.every(e=>e===true)){
                board.placeShip(ship, randomorient, randomloc);
                console.table(board.board);
            }
            else{
                calcrandom();
                checkrandom();
            }
        }
    }
    checkrandom();
}


function displayBoard(board, boarddiv,showships){
    boarddiv.innerHTML='';
    for(let i=0; i<board.board.length; i++){
        for(let j=0; j<board.board[i].length;j++){
            const boardpoint = document.createElement('div');
            boardpoint.setAttribute('id', `${[i,j]}`);
            boardpoint.setAttribute('class', 'innerbox');
            if(board.board[i][j]!==undefined){
                if(showships===true){
                    if(board.board[i][j]===false){
                        boardpoint.textContent= "X";
                    }
                    else if(board.board[i][j]===true){
                        boardpoint.textContent = 'S';
                        boardpoint.setAttribute('class', 'ship');
                        boardpoint.style.backgroundColor = 'lightblue';
                    }
                    else if(typeof(board.board[i][j])==='object'){
                        boardpoint.style.backgroundColor = 'lightblue';
                        if(board.board[i][j][1]===0){
                            boardpoint.setAttribute('class', 'dragship');
                            boardpoint.setAttribute('draggable', 'true');
                        }
                    }
                }
                else{
                    if(board.board[i][j]===false){
                        boardpoint.textContent= "X";
                    }
                    else if(board.board[i][j]===true){
                        boardpoint.textContent = 'S';
                    }
                }
            }
            boarddiv.appendChild(boardpoint);
        }
    }
}

//MOVE AROUND YOUR OWN SHIPS BEFORE THE GAME STARTS