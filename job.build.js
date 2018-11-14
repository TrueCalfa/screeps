let Build = {
    run: function(creep){
        if(creep.room.memory.targetToBuild && creep.room.targetToBuild != 0){
            let target = Game.getObjectById(creep.room.memory.targetToBuild);
            if(target && !(target instanceof Structure)){
                if(creep.pos.inRangeTo(target, 3)){
                    creep.build(target);
                    if(CREEPS_SPEAK){
                        creep.say('🚧');
                    }
                    return OK;
                }else{
                    creep.travelTo(target);
                    return ERR_NOT_IN_RANGE;
                }
            }else{
                creep.room.memory.targetToBuild = 0;
                
            }
        }else{ 
            let targets = creep.room.memory.constructionSites;
            if(targets.length > 0) {
                creep.room.memory.targetToBuild = targets[0].id;
            //Ahora lo intento asi. Voy a ordenarlos por tipo de construccion y cojo  el primero:
            //creep.memory.targetToBuild = targets[0];
            }else{
                return 'noTarget';
            }
        }
    }
}

module.exports = Build;

/* BACKUP!!!
let Build = {
    run: function(creep){
        if(creep.memory.targetToBuild != 0){
            let target = Game.getObjectById(creep.memory.targetToBuild);
            if(target && !(target instanceof Structure)){
                if(creep.pos.inRangeTo(target, 3)){
                    creep.build(target);
                    if(CREEPS_SPEAK){
                        creep.say('🚧');
                    }
                    return OK;
                }else{
                    creep.travelTo(target);
                    return ERR_NOT_IN_RANGE;
                }
            }else{
                creep.memory.targetToBuild = 0;
                
            }
        }else{ 
            let targets = creep.room.memory.constructionSites;
            if(targets.length > 0) {
                creep.memory.targetToBuild = creep.pos.findClosestByPath(targets).id;
            //Ahora lo intento asi. Voy a ordenarlos por tipo de construccion y cojo  el primero:
            //creep.memory.targetToBuild = targets[0];
            }else{
                return 'noTarget';
            }
        }
    }
}

module.exports = Build;
*/