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
        // if(hits.length===span){
        //     return true;
        // }
        // else{
        //     return false;
        // }
        // return hits.length===span ? true : false;
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
module.exports = Ship;