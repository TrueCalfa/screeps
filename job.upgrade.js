var Upgrade = {
    run: function(creep){
        if(creep.room.controller.my){
            let ctrl = creep.room.controller;
            if(creep.memory.inPosition && creep.memory.inPosition == true){
                creep.upgradeController(creep.room.controller);
            }else{
                if(creep.pos.inRangeTo(ctrl, 3)){
                    creep.memory.inPosition = true;
                    if(CREEPS_SPEAK){
                        creep.say('⏫');
                    }
                }else{
                    creep.travelTo(creep.room.controller);
                }
            }
        }
        //No need to return upgradeResult
    }
}

module.exports = Upgrade;


