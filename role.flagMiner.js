const AssignNewFlag = require('flag.assignNew');

let roleFlagMiner = {
    
  run: function(creep) {
        let flag = Game.flags[creep.memory.targetFlag];
        let ctrl = creep.room.controller;
        
        
        if(flag && flag.color == COLOR_ORANGE && flag.secondaryColor == COLOR_WHITE){
           
            this.SetTask(creep, flag);
            
            
            if(creep.memory.task == 'moving'){
                if(creep.room == flag.room){
                    
                    if(creep.memory.mySource){
                        let mySource = Game.getObjectById(creep.memory.mySource);
                        if(creep.memory.inPosition && creep.memory.inPosition == true){
                            creep.harvest(mySource);
                        }else{
                            if(creep.pos.isNearTo(mySource)){
                                creep.memory.inPosition = true;
                            }else{
                                creep.travelTo(mySource);
                            }
                        }
                    }else{
                        if(creep.pos.isNearTo(flag)){
                            let mySource = creep.pos.findClosestByRange(FIND_SOURCES);
                            creep.memory.mySource = mySource.id;
                        }else{
                            creep.travelTo(flag);
                        }
                    }
                }else{
                    creep.memory.inPosition = false;
                    creep.travelTo(flag);
                }
            }else if(creep.memory.task == 'waiting'){
                if(!creep.memory.inFleePosition || creep.memory.inFleePosition == false){
                    let mySpawn = Game.spawns[creep.memory.mySpawn];
                    if(!creep.pos.inRangeTo(mySpawn, 10)){
                        creep.travelTo(mySpawn);
                    }else{
                        creep.memory.inFleePosition = true;
                    }
                }
            }
        }else{
            
            AssignNewFlag.run(creep, COLOR_ORANGE, COLOR_WHITE);
            
        }
    },

    SetTask: function(creep, flag){
        if(creep.memory.task != 'waiting'){
            if(creep.room.memory.enemies && creep.room.memory.enemies.length > 0){
                creep.memory.task = 'waiting';
                creep.memory.timeToGo = creep.room.memory.enemiesDie;
                flag.memory.timeToGo = creep.room.memory.enemiesDie;
            }
        }else{
            if(!creep.memory.timeToGo || Game.time > creep.memory.timeToGo){
                if(!creep.memory.inFleePosition || creep.memory.inFleePosition == true){
                    creep.memory.inFleePosition = false;
                }
                creep.memory.task = 'moving';
            }
        }
    }
    
    
    
    
};

module.exports = roleFlagMiner;