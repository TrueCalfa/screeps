const AssignNewFlag = require('flag.assignNew');

var FlagDefender = {
    run: function(creep) {
        

        //let mySpawn = Game.spawns[creep.memory.mySpawn];
        //let ctrl = creep.room.controller;
        let flag = Game.flags[creep.memory.targetFlag];
        let myBoss;
        if(flag && flag.color == COLOR_YELLOW && flag.secondaryColor == COLOR_WHITE){
            
            if(creep.memory.myBoss && creep.memory.myBoss != 0){
                myBoss = Game.getObjectById(creep.memory.myBoss);
                if(!myBoss){
                    creep.memory.myBoss = 0;
                }
            }

            if(myBoss){
                if(creep.pos.isNearTo(myBoss)){
                    if(myBoss.hits < myBoss.hitsMax){
                        creep.heal(myBoss);
                    }
                    creep.travelTo(flag);
                }else{
                    creep.travelTo(myBoss);
                }
            }else{
                if(creep.room === flag.room){
                    if(creep.room.memory.damagedCreeps && creep.room.memory.damagedCreeps.length > 0){
                        let someoneToHeal = Game.getObjectById(creep.room.memory.damagedCreeps[0]);
                        if(someoneToHeal && creep.pos.isNearTo(someoneToHeal)){
                            creep.heal(someoneToHeal);
                        }else{
                            creep.travelTo(someoneToHeal);
                        }
                        
    
                    }else{
                        creep.travelTo(flag);
                    }
                    
                
                }else if(!creep.fatige){
                    creep.travelTo(flag);
                    
                }
            }
        }else{
            AssignNewFlag.run(creep, COLOR_YELLOW, COLOR_WHITE);
            
        }
    }
};
module.exports = FlagDefender;

