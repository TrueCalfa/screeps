
var unloadEnergy = {

    run: function(creep, args) {
        let start;
        let end;
        let debug = false;
        if(debug){
            start = Game.cpu.getUsed();
        }
        
        let unloadResult;
        let target = null;
        //Check if target structure is already in creep's memory
        if(!creep.memory.unloadTo || creep.memory.unloadTo == 0){

            let atContainers = false;
            let atLinks = false;
            let atStorages = false;
            let atSpawns = false;
            let atTowers = false;
            let atExtensions = false;
            let atTerminals = false;
            
            //Check what structures does the creep want to unload to
            if(args && args.length){
                
                for(let i in args){
                    switch(args[i]){
                        case 'containers':      atContainers = true;        break;
                        case 'links':           atLinks = true;             break;
                        case 'storages':        atStorages = true;          break;
                        case 'spawns':          atSpawns = true;            break;
                        case 'towers':          atTowers = true;            break;
                        case 'extensions':      atExtensions = true;        break;
                        case 'terminals':       atTerminals = true;         break;
                        case 'any':             atContainers = true;    atLinks = true;   atStorages = true;    atSapwns = true;    atTowers = true;    atExtensions = true;    atTerminals = true;     break;
                        default:                console.log('Invalid input at UnloadEnergy(): '+args[i]);       break;
                    }
                }
            }
            //Find desired structures according to creep's preferences and making sure that structure isn't full aready
            //For containers, i also check that i don't choose containers i use for drop-mining
            target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: function(structure){
                    return (
                        
                        (atLinks &&         structure.structureType == STRUCTURE_LINK)         ||
                        (atContainers &&    structure.structureType == STRUCTURE_CONTAINER      &&      _.sum(structure.store)     <   structure.storeCapacity     && (structure.storeCapacity - _.sum(structure.store) > creep.carry.energy)   &&  structure.id != creep.room.memory.mineralContainer)  ||
                        (atStorages &&      structure.structureType == STRUCTURE_STORAGE        &&      _.sum(structure.store)     <   structure.storeCapacity     && (structure.storeCapacity - _.sum(structure.store) > creep.carry.energy))      ||
                        (atTerminals &&     structure.structureType == STRUCTURE_TERMINAL       &&      _.sum(structure.store)     <   structure.storeCapacity     &&   structure.store.energy < 2000)     ||
                        (atSpawns &&        structure.structureType == STRUCTURE_SPAWN          &&         structure.energy        <   structure.energyCapacity)        ||
                        (atTowers&&         structure.structureType == STRUCTURE_TOWER          &&         structure.energy        <   structure.energyCapacity)        ||
                        (atExtensions &&    structure.structureType == STRUCTURE_EXTENSION      &&         structure.energy        <   structure.energyCapacity)

                    );
                }
            });
            //Did i find a target?
            if(target){
                creep.memory.unloadTo = target.id;
            }else{
                creep.memory.unloadTo = 0;
            }
        //If target structure is already stored into creep's memory, i just use it
        }else{
            target = Game.getObjectById(creep.memory.unloadTo);
        }

        //Now...if i have a valid target...
        if(target != null) {
            
            
            //Is creep near enough to unload?
            if(creep.pos.isNearTo(target)){
                //Unload energy and reset the target stored in memory
                creep.transfer(target, RESOURCE_ENERGY);
                unloadResult = OK;
                creep.memory.unloadTo = 0;
                //Just sthetic
                if(CREEPS_SPEAK){
                    creep.say('⬇');
                }
            //If not near enough, move towards the target structure
            }else{
                creep.travelTo(target);
                unloadResult = ERR_NOT_IN_RANGE;
            }
            //If after all the process i didn't find a valid target...
        }else{
            unloadResult = 'noTarget';
        }
        //Just for debug purposes
        if(debug){
            end = Game.cpu.getUsed();
            if(end-start > 1){
                console.log("unloadEnergy", creep.name, end-start, "cpu");
            }
        }
        return unloadResult;

    },
    LookForFromLinks: function(structure){
        let links = creep.room.memory.linkFrom;
        for(let i in links){
            if(structure.id == links[i]){
                return true;
            }
        }
    },
    SetResource: function(creep){
        let myResource;
        if(creep.carry.energy > 0){
            myResource = RESOURCE_ENERGY;
        }else if(creep.carry.H > 0){
            myResource = RESOURCE_HYDROGEN;
        }else if(creep.carry.O > 0){
            myResource = RESOURCE_OXYGEN;
        }else if(creep.carry.U > 0){
            myResource = RESOURCE_UTRIUM;
        }else if(creep.carry.L > 0){
            myResource = RESOURCE_LEMERGIUM;
        }else if(creep.carry.K > 0){
            myResource = RESOURCE_KEANIUM;
        }else if(creep.carry.Z > 0){
            myResource = RESOURCE_ZYNTHIUM;
        }else if(creep.carry.X > 0){
            myResource = RESOURCE_CATALYST;
        }else if(creep.carry.G > 0){
            myResource = RESOURCE_GHODIUM;
        }
        return myResource;
    }
};

module.exports = unloadEnergy;
