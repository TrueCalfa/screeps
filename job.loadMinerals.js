let LoadMinerals = {
    run: function(creep, args, min, energyToo){
        let target = null;
        if(!creep.memory.loadFrom || creep.memory.loadFrom == 0){
            let fromContainers = false;
            let fromTerminals = false;
            let fromLabs = false;
            let fromStorages = false;

            if(args && args.length){
                for(let i in args){
                    switch(args[i]){
                        case 'containers':  {fromContainers = true;}    break;
                        case 'storages':    {fromStorages = true;}      break;
                        case 'terminals':   {fromTerminals = true;}     break;
                        case 'labs':        {fromLabs = true;}          break;
                        default:        console.log('Invalid input at LoadMinerals(): '+args[i]);     break;
                    }
                }
            }

            target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: function(s){
                    return(
                        (s.structureType == STRUCTURE_CONTAINER && _.sum(s.store) >= (s.storeCapacity - _.sum(s.store)) && fromContainers && s.id == creep.room.memory.mineralContainer) ||
                        (s.structureType == STRUCTURE_STORAGE && _.sum(s.store) > min && fromStorages) ||
                        (s.structureType == STRUCTURE_LAB && _.sum(s.store) > min && fromLabs) ||
                        (s.structureType == STRUCTURE_TERMINAL && _.sum(s.tore) > min && fromTerminals)
                    );
                }
            });

            if(target){
                creep.memory.loadFrom = target.id;
            }else{
                creep.memory.loadFrom = 0;
                return 'noTarget';
            }
        }else{
            target = Game.getObjectById(creep.memory.loadFrom);
        }

        if(target != null){
            let loadResult;
            if(creep.pos.isNearTo(target)){
                let myResource = this.SetResource(target, energyToo);
                creep.withdraw(target, myResource);
                creep.memory.loadFrom = 0;
                return OK;
            }else{
                creep.travelTo(target);
                return ERR_NOT_IN_RANGE;
            }
        }
    },
    SetResource: function(s, energyToo){
        let myResource;
        if(energyToo){
            if(s.store.energy > 0){
                myResource = RESOURCE_ENERGY;
            }else if(s.store.H > 0){
                myResource = RESOURCE_HYDROGEN;
            }else if(s.store.O > 0){
                myResource = RESOURCE_OXYGEN;
            }else if(s.store.U > 0){
                myResource = RESOURCE_UTRIUM;
            }else if(s.store.L > 0){
                myResource = RESOURCE_LEMERGIUM;
            }else if(s.store.K > 0){
                myResource = RESOURCE_KEANIUM;
            }else if(s.store.Z > 0){
                myResource = RESOURCE_ZYNTHIUM;
            }else if(s.store.X > 0){
                myResource = RESOURCE_CATALYST;
            }else if(s.store.G > 0){
                myResource = RESOURCE_GHODIUM;
            }else if(s.store.OH > 0){
                myResource = RESOURCE_HYDROXIDE;
            }else if(s.store.ZK > 0){
                myResource = RESOURCE_ZYNTHIUM_KEANITE;
            }else if(s.store.UL > 0){
                myResource = RESOURCE_UTRIUM_LEMERGITE;
            }else if(s.store.UH > 0){
                myResource = RESOURCE_UTRIUM_HYDRIDE;
            }else if(s.store.UO > 0){
                myResource = RESOURCE_UTRIUM_OXIDE;
            }else if(s.store.KH > 0){
                myResource = RESOURCE_KEANIUM_HYDRIDE;
            }else if(s.store.KO > 0){
                myResource = RESOURCE_KEANIUM_OXIDE;
            }else if(s.store.LH > 0){
                myResource = RESOURCE_LEMERGIUM_HYDRIDE;
            }else if(s.store.LO > 0){
                myResource = RESOURCE_LEMERGIUM_OXIDE;
            }else if(s.store.ZH > 0){
                myResource = RESOURCE_ZYNTHIUM_HYDRIDE;
            }else if(s.store.ZO > 0){
                myResource = RESOURCE_ZYNTHIUM_OXIDE;
            }else if(s.store.GH > 0){
                myResource = RESOURCE_GHODIUM_HYDRIDE;
            }else if(s.store.GO > 0){
                myResource = RESOURCE_GHODIUM_OXIDE;
            }
        }else{
            if(s.store.H > 0){
                myResource = RESOURCE_HYDROGEN;
            }else if(s.store.O > 0){
                myResource = RESOURCE_OXYGEN;
            }else if(s.store.U > 0){
                myResource = RESOURCE_UTRIUM;
            }else if(s.store.L > 0){
                myResource = RESOURCE_LEMERGIUM;
            }else if(s.store.K > 0){
                myResource = RESOURCE_KEANIUM;
            }else if(s.store.Z > 0){
                myResource = RESOURCE_ZYNTHIUM;
            }else if(s.store.X > 0){
                myResource = RESOURCE_CATALYST;
            }else if(s.store.G > 0){
                myResource = RESOURCE_GHODIUM;
            }else if(s.store.OH > 0){
                myResource = RESOURCE_HYDROXIDE;
            }else if(s.store.ZK > 0){
                myResource = RESOURCE_ZYNTHIUM_KEANITE;
            }else if(s.store.UL > 0){
                myResource = RESOURCE_UTRIUM_LEMERGITE;
            }else if(s.store.UH > 0){
                myResource = RESOURCE_UTRIUM_HYDRIDE;
            }else if(s.store.UO > 0){
                myResource = RESOURCE_UTRIUM_OXIDE;
            }else if(s.store.KH > 0){
                myResource = RESOURCE_KEANIUM_HYDRIDE;
            }else if(s.store.KO > 0){
                myResource = RESOURCE_KEANIUM_OXIDE;
            }else if(s.store.LH > 0){
                myResource = RESOURCE_LEMERGIUM_HYDRIDE;
            }else if(s.store.LO > 0){
                myResource = RESOURCE_LEMERGIUM_OXIDE;
            }else if(s.store.ZH > 0){
                myResource = RESOURCE_ZYNTHIUM_HYDRIDE;
            }else if(s.store.ZO > 0){
                myResource = RESOURCE_ZYNTHIUM_OXIDE;
            }else if(s.store.GH > 0){
                myResource = RESOURCE_GHODIUM_HYDRIDE;
            }else if(s.store.GO > 0){
                myResource = RESOURCE_GHODIUM_OXIDE;
            }
        }
        
        return myResource;
    }
}

module.exports = LoadMinerals;