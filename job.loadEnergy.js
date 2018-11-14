let loadEnergy = {
    run: function(creep, args, min, maxDist){
        let debug = 1;
        let start;
        let end;
        if(debug){
            start = Game.cpu.getUsed();
        }
        let target = null;
        let loadResult;
        if(!creep.memory.loadFrom || creep.memory.loadFrom == 0){
        
            let fromContainers = false;
            let fromStorages = false;
            let fromLinks = false;
            let fromSpawns = false;
            let fromTowers = false;
            let fromExtensions = false;
            
            if(args && args.length){
                for (let i in args){
                    switch(args[i]){
                        case 'extensions'   :   {fromExtensions = true;}    break;
                        case 'containers'   :   {fromContainers = true;}    break;
                        case 'storages'     :   {fromStorages = true;}      break;
                        case 'links'        :   {fromLinks = true;}         break;
                        case 'towers'       :   {fromTowers = true;}        break;
                        case 'spawns'       :   {fromSpawns = true;}        break;
                        case 'any'          :   {fromExtensions = false;
                                                fromContainers = true;
                                                fromStorages = true;
                                                fromLinks = true;
                                                fromTowers = true;
                                                fromSpawns = false;}        break;
                        default:                console.log('Invalid input at LoadEnergy(): '+args[i]);     break;
                    }
                }
            }
            

            target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: function(structure){
                    return (
                    
                        (structure.structureType == STRUCTURE_STORAGE        && _.sum(structure.store) > min &&  fromStorages)      ||
                        (structure.structureType == STRUCTURE_CONTAINER      && _.sum(structure.store) > min &&  fromContainers  && creep.room.memory.mineralContainer != structure.id)    ||
                        (structure.structureType == STRUCTURE_TOWER          &&       structure.energy > min &&  fromTowers)        ||
                        (structure.structureType == STRUCTURE_LINK           &&       structure.energy > min &&  fromLinks)         ||
                        (structure.structureType == STRUCTURE_SPAWN          &&       structure.energy > min &&  fromSpawns)        ||
                        (structure.structureType == STRUCTURE_EXTENSION      &&       structure.energy > min &&  fromExtensions)
                    
                    );
                }
            });
            if(target){
                creep.memory.loadFrom = target.id;
            }else{
                creep.memory.loadFrom = 0;
            }
        }else{
            target = Game.getObjectById(creep.memory.loadFrom);
        }
//Creep has already found the closest target to load from, but if it's still further than maxDist, it won't go :/

        if(target != null){
            if(creep.pos.isNearTo(target)){
                //let myResource = this.SetResource(target);
                creep.withdraw(target, RESOURCE_ENERGY);
                creep.memory.loadFrom = 0;
                loadResult = OK;
            }else{
                creep.travelTo(target);
                loadResult = ERR_NOT_IN_RANGE;
                //Usually set to false
                if(CREEPS_SPEAK){
                    creep.say('⬆');
                }
            }

        }else{
            loadResult = 'noTarget';
        }
        if(debug){
            if(end-start > 1){
                end = Game.cpu.getUsed();
                console.log("Load Energy ",creep.name, end-start, "CPU");
            }
        }
        return loadResult; 
    }
}

module.exports = loadEnergy;










