//const GoClaim = require('Routines.goClaim');
//const Utils = require('A.Utils');
const AssignNewFlag = require('flag.assignNew');
var roleFlagReserver = {




    run: function(creep) {
        let flag = Game.flags[creep.memory.targetFlag];
        let ctrl = creep.room.controller;
        
        
        if(flag && flag.color == COLOR_PURPLE && flag.secondaryColor == COLOR_PURPLE ){
            
            this.SetTask(creep, flag);
            
            if(creep.memory.task == 'moving'){
                if(creep.room == flag.room){
                    
                    let reserveResult;
                    if(creep.memory.inPosition && creep.memory.inPosition == true){
                        if(ctrl.owner == undefined){
                            //console.log(creep.room.name, " - ", ctrl.reservation.ticksToEnd);
                            if(ctrl.reservation){
                                if(ctrl.reservation.ticksToEnd < 4900){
                                    creep.memory.upgrading = true;
                                }else if(ctrl.reservation.ticksToEnd > 4998){
                                    creep.memory.upgrading = false;
                                }
                            }else{
                                creep.memory.upgrading = true;
                            }
                            if(creep.memory.upgrading == true){
                                reserveResult = creep.reserveController(ctrl);
                            }
                        }else{
                            creep.attackController(ctrl);
                        }
                    }else{
                        if(creep.pos.isNearTo(ctrl)){
                            creep.memory.inPosition = true;
                        }else{
                            creep.travelTo(ctrl);
                        }
                    }
                
                }else{
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
            
            AssignNewFlag.run(creep, COLOR_PURPLE, COLOR_PURPLE);
            
        }
    },

    SetTask: function(creep, flag){
        if(creep.room.memory.enemies && creep.room.memory.enemies.length > 0){
            creep.memory.task = 'waiting';
            creep.memory.timeToGo = creep.room.memory.enemiesDie;
            flag.memory.timeToGo = creep.room.memory.enemiesDie;
        }
        if(creep.memory.task == 'waiting' && (Game.time > creep.memory.timeToGo || !creep.memory.timeToGo)){
            if(!creep.memory.inFleePosition || creep.memory.inFleePosition == true){
                creep.memory.inFleePosition = false;
            }
            creep.memory.task = 'moving';
            
        }
    }
};

module.exports = roleFlagReserver;


