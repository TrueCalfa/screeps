var roleExtractor = {
    run: function(creep) {

        //this.SetTask(creep);

//ME VOY A DORMIR:
//aqui hay que decidir si hacer drop mining o que el bicho este lo haga todo...

        //if (creep.memory.task == 'working') {

            if(creep.room.memory.desiredExtractors == 0){
                creep.suicide();
            }
            if(creep.memory.inPosition == true){
                let source = Game.getObjectById(creep.room.memory.mineralSource);
                if(source && source.mineralAmount > 0){
                    let myExtractor = Game.getObjectById(creep.room.memory.extractor);
                    if(myExtractor && myExtractor.cooldown == 0){
                        creep.harvest(source);
                    }
                }
            }else{
                let myContainer = Game.getObjectById(creep.room.memory.mineralContainer);
                if(myContainer){
                    if(creep.pos.isEqualTo(myContainer)){
                        creep.memory.inPosition = true;
                    }else{
                        creep.travelTo(myContainer);
                    }
                }
            }

        //}
        /*
        else if (creep.memory.task == 'unloading'){
            if(null == creep.memory.myResource){
                this.SetResource(creep);
            }
            let myResource = creep.memory.myResource;
            let target = Game.getObjectById(creep.room.memory.mineralContainer);
            //let target = creep.pos.findClosestByRange(FIND_STRUCTURES, {filter: function(b){ return b.structureType == STRUCTURE_CONTAINER;}});
            if(creep.carry.O > 0){
                let unloadResult = creep.transfer(target, RESOURCE_OXYGEN);
                if(unloadResult == ERR_NOT_IN_RANGE){
                    creep.travelTo(target);
                }
            }else if(creep.carry.energy > 0){
                let unloadResult = creep.transfer(target, RESOURCE_ENERGY);
                if(unloadResult == ERR_NOT_IN_RANGE){
                    creep.travelTo(target);
                }
            }
            //console.log(unloadResult, creep, target);

        }
        */

    },

    SetTask: function(creep){
        if (creep.memory.task == 'working' && creep.carryCapacity == _.sum(creep.carry)) {
            creep.memory.task = 'unloading';
        }
        if (creep.memory.task == 'unloading' && 0 == _.sum(creep.carry)) {
            creep.memory.task = 'working';
        }

    },
    SetResource: function(creep){
        if(creep.carry.H > 0){
            creep.memory.myResource = RESOURCE_HYDROGEN;
        }else if(creep.carry.O > 0){
            creep.memory.myResource = RESOURCE_OXYGEN;
        }else if(creep.carry.U > 0){
            creep.memory.myResource = RESOURCE_UTRIUM;
        }else if(creep.carry.L > 0){
            creep.memory.myResource = RESOURCE_LEMERGIUM;
        }else if(creep.carry.K > 0){
            creep.memory.myResource = RESOURCE_KEANIUM;
        }else if(creep.carry.Z > 0){
            creep.memory.myResource = RESOURCE_ZYNTHIUM;
        }else if(creep.carry.X > 0){
            creep.memory.myResource = RESOURCE_CATALYST;
        }else if(creep.carry.G > 0){
            creep.memory.myResource = RESOURCE_GHODIUM;
        }
    }
};

module.exports = roleExtractor;
