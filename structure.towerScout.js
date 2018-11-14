//var Utils = require('tools');


function distanceSq(tower,target) {
    
    var xDif = tower.pos.x - target.pos.x;
    var yDif = tower.pos.y - target.pos.y;
    var dist = Math.sqrt(xDif*xDif + yDif*yDif);   
    return dist;
    
}

var towerScout = {
    run: function(tower){
        
        //if(tower.room.memory.enemies && tower.room.memory.enemies.length > 0){
            let closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {
                filter: (c) => {
    //Lista de aliados!!!                    
                    return (c.owner.username != 'Staps' && c.owner.username != 'Robalian');
                }
            });
                
            if(closestHostile) {
                //let showRange = new RoomVisual(tower.room.name).circle(tower.pos, {radius: TOWER_MAX_SCOUT_DIST, fill: 'transparent', stroke: 'red', lineStyle: 'dotted'});

                let dist = distanceSq(tower, closestHostile);
                if(dist < TOWER_MAX_SCOUT_DIST){
                    tower.attack(closestHostile);
                    return 'attacking';
                }else{
                    let showTarget = new RoomVisual(tower.room.name).line(tower.pos, closestHostile.pos, {color: 'red', lineStyle: 'dashed', width: 0.04, opacity: 0.3});
                    return 'too_far';
                }
            }else{
                return 'clear';
            }
            if(SHOW_TOWER_SCOUT_RANGE){
                if(closestHostile){
                    let showRange = new RoomVisual(tower.room.name).circle(tower.pos, {radius: TOWER_MAX_SCOUT_DIST, fill: 'transparent', stroke: 'red', lineStyle: 'dotted'});
                }else{
                    let showRange = new RoomVisual(tower.room.name).circle(tower.pos, {radius: TOWER_MAX_SCOUT_DIST, fill: 'transparent', stroke: 'white', lineStyle: 'dotted'});
                }
            }
        //}else{
            //return 'clear';
        //}
    }
};
module.exports = towerScout;