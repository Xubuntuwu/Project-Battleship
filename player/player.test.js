const Player = require('./player');
const Gameboard = require('../gameboard/gameboard');
const Ship = require('../ship/ship');

test('player attackfunction comes through to receiveAttack', ()=>{
    const board1 = Gameboard();
    const player2 = Player();
    player2.attackEnemy(board1, [0,0]);
    expect(board1.missedShots).toEqual([[0,0]]);
});
test('hit ship does not add onto missedshots', ()=>{
    const board1 = Gameboard();
    const ship1 = Ship(1);
    const player2 = Player();
    board1.placeShip(ship1, 'vertical', [0,0]);
    player2.attackEnemy(board1, [0,0]);
    expect(board1.missedShots).not.toEqual([[0,0]]);
});
test('board includes 10 arrays', ()=>{
    const board1 = Gameboard();
    const ship1 = Ship(1);
    const player2 = Player();
    expect(board1.board.length).toEqual(10);
});
test('legalmoves includes all moves at start', ()=>{
    const board1 = Gameboard();
    const ship1 = Ship(1);
    const player2 = Player();
    expect(board1.legalMoves.length).toEqual(100);
});
test('legalmoves includes 99 moves after a first move', ()=>{
    const board1 = Gameboard();
    const ship1 = Ship(1);
    const player2 = Player();
    player2.attackEnemy(board1, [0,0]);
    expect(board1.legalMoves.length).toEqual(99);
});
test('legalmoves is empty after 100 tries', ()=>{
    const board1 = Gameboard();
    const ship1 = Ship(1);
    const player2 = Player();
    board1.placeShip(ship1, 'vertical', [0,0]);
    for(let i=0; i<100;i++){
        player2.randomMove(board1);
    }
    expect(board1.legalMoves.length).toEqual(0);
});
test('check if doubleshots is empty after all known legal moves', ()=>{
    const board1 = Gameboard();
    const ship1 = Ship(1);
    const player2 = Player();
    board1.placeShip(ship1, 'vertical', [0,0]);
    for(let i=0; i<10;i++){
        for(let j=0; j<10;j++){
            player2.attackEnemy(board1, [i,j]);
        }
    }
    expect(board1.doubleShots.length).toEqual(0);
});
// test('check if doubleshots is one after a known illegal move', ()=>{
//     const board1 = Gameboard();
//     const ship1 = Ship(1);
//     const player2 = Player();
//     board1.placeShip(ship1, 'vertical', [0,0]);
//     for(let i=0; i<10;i++){
//         for(let j=0; j<10;j++){
//             player2.attackEnemy(board1, [i,j]);
//         }
//     }
//     player2.attackEnemy(board1, [0,0]);
//     expect(board1.doubleShots.length).toEqual(0);
// });
test('check if doubleshots throws error now', ()=>{
    const board1 = Gameboard();
    const ship1 = Ship(1);
    const player2 = Player();
    board1.placeShip(ship1, 'vertical', [0,0]);
    for(let i=0; i<10;i++){
        for(let j=0; j<10;j++){
            player2.attackEnemy(board1, [i,j]);
        }
    }
    expect(()=>{player2.attackEnemy(board1, [0,0])}).toThrow('You can\'t shoot the same shot twice');
}); //extra arrow function for expect error!
test('check if legalmoves removes the correct coordinations', ()=>{
    const board1 = Gameboard();
    const ship1 = Ship(1);
    const player2 = Player();
    board1.placeShip(ship1, 'vertical', [0,0]);
    player2.attackEnemy(board1, [0,1]);
    expect(board1.doubleShots.length).toEqual(0);
});
test('check if legalmoves removes the correct single manual coordinations', ()=>{
    const board1 = Gameboard();
    const ship1 = Ship(1);
    const player2 = Player();
    board1.placeShip(ship1, 'vertical', [0,0]);
    player2.attackEnemy(board1, [0,1]);
    expect(board1.doubleShots.length).toEqual(0);
});
test('doubleshots is 0 after 100 tries AI (no illegal moves)', ()=>{
    const board1 = Gameboard();
    const ship1 = Ship(1);
    const player2 = Player();
    board1.placeShip(ship1, 'vertical', [0,0]);
    for(let i=0; i<100;i++){
        player2.randomMove(board1);
    }
    expect(board1.doubleShots.length).toEqual(0);
});