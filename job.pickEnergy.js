let pickEnergy = {
    
    run: function(creep, args, minAmount, mineralsTrue){
        
//Si cambio las lineas comentadas por las uqe no lo estan, va a recoger el mas cercano, pero gasto mas CPU
//De esta forma, recoge la que mas energia tenga, porque asi estan ordenados desde SetMemory, pero recorre
//mas camino. Por ahora lo dejo asi porque me ahorro un findInRange y un findClosestByPath. Por otro lado, 
//para ser dropped energy, solo tiene que ser > 50, y hay veces que es una tonteria o ni siquiera llena el bicho
//mientras que de esta manera, me aseguro que va a por el monton mas gordo.

        //let droppedResources = creep.pos.findInRange(creep.room.memory.droppedResources, maxDist);
        let pickEnergyResult;
        if(!creep.memory.pickFrom || creep.memory.pickFrom == 0){
            if(creep.room.memory.droppedResources && creep.room.memory.droppedResources.length > 0){
                creep.memory.pickFrom = creep.room.memory.droppedResources[0];
                //creep.memory.loadFrom = 1;
                //pickEnergyResult = OK;
            }else{
                creep.memory.pickFrom = 0;
                pickEnergyResult = 'noTarget';
            }
        }else{
            pickEnergyResult = this.GoFor(creep, creep.memory.pickFrom, minAmount, mineralsTrue);
            //console.log(creep.name, " - ", pickEnergyResult);
        }
        return pickEnergyResult;
    },
    
    GoFor: function(creep, targetId, minAmount, mineralsTrue){
        let target = Game.getObjectById(targetId);
        if(target){
            if(target.resourceType == RESOURCE_ENERGY){
                if(!creep.memory.inPosition){
                    if(creep.pos.isNearTo(target)){
                        creep.memory.inPosition = true;
                    }else{
                        creep.travelTo(target);
                        return ERR_NOT_IN_RANGE;
                    }
                }else if(creep.memory.inPosition == true){
                    if(target.amount >= minAmount){
                        creep.pickup(target);
                        creep.memory.pickFrom = 0;
                        creep.memory.inPosition = false;
                        return 'gotIt';
                    }
                }
            }else if(mineralsTrue == false){
                if(!creep.memory.inPosition){
                    if(creep.pos.isNearTo(target)){
                        creep.memory.inPosition = true;
                        return OK;
                    }else{
                        creep.travelTo(target);
                        return ERR_NOT_IN_RANGE;
                    }
                }else if(creep.memory.inPosition == true){
                    if(target.amount >= minAmount){
                        creep.pickup(target);
                        creep.memory.pickFrom = 0;
                        creep.memory.inPosition = false;
                        return 'gotIt';
                    }
                }
            }
        }else{
            creep.memory.pickFrom = 0;
            return 'noTarget';
        }
    }
    
}

module.exports = pickEnergy;



