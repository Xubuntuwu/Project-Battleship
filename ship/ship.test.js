const Ship = require('./ship');

test('show ship length', ()=>{
    let ship1= Ship(3);
    expect(ship1.span).toBe(3);
});
test('show ship hits, 1 hit', ()=>{
    let ship1= Ship(3);
    ship1.toHit(0);
    expect(ship1.hits).toEqual([0]);
});
test('show ship hits, multiple hits', ()=>{
    let ship1= Ship(3);
    ship1.toHit(0);
    ship1.toHit(2)
    expect(ship1.hits).toEqual([0,2]);
});
test('show if ship is sunk when sunk', ()=>{
    let ship1= Ship(3);
    ship1.toHit(1);
    ship1.toHit(0);
    ship1.toHit(2);
    expect(ship1.isSunk()).toEqual(true);
});
test('show if ship is sunk when not sunk', ()=>{
    let ship1= Ship(3);
    ship1.toHit(1);
    ship1.to
    expect(ship1.isSunk()).toEqual(false);
});