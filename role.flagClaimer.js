const AssignNewFlag = require('flag.assignNew');
var roleFlagClaimer = {

    run: function(creep) {
        let flag = Game.flags[creep.memory.targetFlag];
        let ctrl = creep.room.controller;
        
        if(flag && flag.color == COLOR_PURPLE && flag.secondaryColor == COLOR_WHITE){
            
            if(creep.room == flag.room){
                if(creep.memory.inPosition && creep.memory.inPosition == true){
                    creep.claimController(ctrl);
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
            
        }else{
            
            AssignNewFlag.run(creep, COLOR_PURPLE, COLOR_WHITE);
            
        }
    }
};

module.exports = roleFlagClaimer;
