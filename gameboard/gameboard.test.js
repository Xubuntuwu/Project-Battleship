const Gameboard = require('./gameboard');
const Ship = require('../ship/ship');
test('call ship function isSunk', ()=>{
    const ship1 = Ship(3);
    ship1.toHit(1);
    ship1.toHit(0);
    ship1.toHit(2);
    expect(ship1.isSunk()).toBe(true);
});
test('see gameboard array', ()=>{
    const ship1 = Ship(3);
    ship1.toHit(1);
    ship1.toHit(0);
    ship1.toHit(2);
    gameb1 = Gameboard();
    expect(gameb1.board).toEqual([
        [
          undefined, undefined,
          undefined, undefined,
          undefined, undefined,
          undefined, undefined,
          undefined, undefined
        ],
        [
          undefined, undefined,
          undefined, undefined,
          undefined, undefined,
          undefined, undefined,
          undefined, undefined
        ],
        [
          undefined, undefined,
          undefined, undefined,
          undefined, undefined,
          undefined, undefined,
          undefined, undefined
        ],
        [
          undefined, undefined,
          undefined, undefined,
          undefined, undefined,
          undefined, undefined,
          undefined, undefined
        ],
        [
          undefined, undefined,
          undefined, undefined,
          undefined, undefined,
          undefined, undefined,
          undefined, undefined
        ],
        [
          undefined, undefined,
          undefined, undefined,
          undefined, undefined,
          undefined, undefined,
          undefined, undefined
        ],
        [
          undefined, undefined,
          undefined, undefined,
          undefined, undefined,
          undefined, undefined,
          undefined, undefined
        ],
        [
          undefined, undefined,
          undefined, undefined,
          undefined, undefined,
          undefined, undefined,
          undefined, undefined
        ],
        [
          undefined, undefined,
          undefined, undefined,
          undefined, undefined,
          undefined, undefined,
          undefined, undefined
        ],
        [
          undefined, undefined,
          undefined, undefined,
          undefined, undefined,
          undefined, undefined,
          undefined, undefined
        ]
      ]);
})
test('place ship on board and find it in board', ()=>{
    const ship1 = Ship(3);
    const board1 = Gameboard();
    board1.placeShip(ship1, 'vertical', [0,0]);
    expect(board1.board[0][0]).toEqual([ship1,0]);
});
test('locate second ship', ()=>{
    const ship1 = Ship(3);
    const ship2 = Ship(3);
    const board1 = Gameboard();
    board1.placeShip(ship1, 'vertical', [0,0]);
    board1.placeShip(ship2, 'vertical', [5,0]);
    expect(board1.board[5][0]).toEqual([ship2, 0]);
});
test('differentiate between 2 similar ships', ()=>{
    const ship1 = Ship(3);
    const ship2 = Ship(3);
    const board1 = Gameboard();
    board1.placeShip(ship1, 'vertical', [0,0]);
    board1.placeShip(ship2, 'vertical', [5,0]);
    expect(board1.board[5][0]).not.toEqual([ship1, 0]);
});
test('empty location on board is empty', ()=>{
    const ship1 = Ship(3);
    const ship2 = Ship(3);
    const board1 = Gameboard();
    board1.placeShip(ship1, 'vertical', [0,0]);
    placeShip(ship2, 'vertical', [5,0]);
    expect(board1.board[6][0]).toBe(undefined);
});
test('end of ship1 can be found', ()=>{
    const ship1 = Ship(3);
    const ship2 = Ship(3);
    const board1 = Gameboard();
    board1.placeShip(ship1, 'vertical', [0,0]);
    board1.placeShip(ship2, 'vertical', [5,0]);
    expect(board1.board[0][2]).toEqual([ship1, hitarray.length-1]);
});
test('record hit correctly, middle value', ()=>{
    const ship1 = Ship(3);
    const board1 = Gameboard();
    board1.placeShip(ship1, 'vertical', [0,0]);
    board1.receiveAttack([0,1]);
    expect(ship1.hits).toEqual([1]);
});
test('record hit correctly, first value', ()=>{
    const ship1 = Ship(3);
    const board1 = Gameboard();
    board1.placeShip(ship1, 'vertical', [0,0]);
    board1.receiveAttack([0,0]);
    expect(ship1.hits).toEqual([0]);
});
test('record missed hit correctly', ()=>{
    const ship1 = Ship(3);
    const board1 = Gameboard();
    board1.placeShip(ship1, 'vertical', [7,0]);
    board1.receiveAttack([0,0]);
    expect(board1.missedShots).toEqual([[0,0]]);
});
test('all one ship has been sunk', ()=>{
    const ship1 = Ship(3);
    const board1 = Gameboard();
    board1.placeShip(ship1, 'vertical', [0,0]);
    board1.receiveAttack([0,0]);
    board1.receiveAttack([0,1]);
    board1.receiveAttack([0,2]);
    expect(board1.allSunk()).toEqual(true);
});
test('all one ship hasnt been sunk', ()=>{
    const ship1 = Ship(3);
    const board1 = Gameboard();
    board1.placeShip(ship1, 'vertical', [0,0]);
    board1.receiveAttack([0,0]);
    board1.receiveAttack([0,1]);
    expect(board1.allSunk()).toEqual(false);
});
test('all two ships have been sunk', ()=>{
    const ship1 = Ship(3);
    const ship2 = Ship(2);
    const board1 = Gameboard();
    board1.placeShip(ship1, 'vertical', [0,0]);
    board1.placeShip(ship2, 'vertical', [1,0]);
    board1.receiveAttack([0,0]);
    board1.receiveAttack([0,1]);
    board1.receiveAttack([0,2]);
    board1.receiveAttack([1,0]);
    board1.receiveAttack([1,1]);
    expect(board1.allSunk()).toEqual(true);
});

//add later test: test if same coordinate cant be hit twice