
const AssignNewFlag = require('flag.assignNew');

let flagTowerTest = {
    run: function(creep){
        
        let flag = Game.flags[creep.memory.targetFlag];
        if(flag && flag.color == COLOR_YELLOW && flag.secondaryColor == COLOR_GREEN){
            
            if(creep.room == flag.room){
                if(!creep.memory.nearestTower){
                    let nearestTower = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES,{
                        filter: function(s){
                            return (s.structureType == STRUCTURE_TOWER);
                        }
                    });
                    creep.memory.nearestTower = nearestTower.id;
                    
                }else{
                    let tower = Game.getObjectById(creep.memory.nearestTower);
                    if(creep.hits < creep.hitsMax && !creep.memory.towerDist){
                        let dist = creep.pos.getRangeTo(tower);
                        creep.memory.towerDist = dist;
                        console.log('Tower ('+tower.id+') is at '+dist);
                        creep.travelTo(Game.spawns[creep.memory.mySpawn]);
                    }else{
                        creep.travelTo(Game.getObjectById(creep.memory.nearestTower));
                    }
                }        
            }else if(creep.hits == creep.hitsMax){
                creep.travelTo(flag);
            }
            
            
        }else{
            
            AssignNewFlag.run(creep, COLOR_YELLOW, COLOR_GREEN);
            
        }
    }
}
module.exports = flagTowerTest;