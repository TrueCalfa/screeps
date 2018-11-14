let UnloadMinerals = {
    run: function(creep, args, energyToo){
        let start;
        let end;
        let debug = 0;
        if(debug){
            start = Game.cpu.getUsed();
        }
        let target = null;
        let myResource = this.SetResource(creep, energyToo);
        if(!creep.memory.unloadTo || creep.memory.unloadTo == 0){
            let atStorages = false;
            let atLabs = false;
            let atTerminals = false;

            if(args && args.length){
                for(let i in args){
                    switch(args[i]){
                    case'storages':        atStorages = true;      break;
                    case'terminals':       atTerminals = true;     break;
                    case'labs':            atLabs = true;          break;
                    default:                console.log('Invalid input at UnloadMinerals(): '+args[i]);       break;
                    }
                }
            }
            target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: function(s){
                    return(
                        (s.structureType == STRUCTURE_STORAGE   && atStorages && _.sum(s.store) < s.storeCapacity)    ||
                        (s.structureType == STRUCTURE_TERMINAL  && atTerminals && _.sum(s.store) < s.storeCapacity)   ||
                        (s.structureType == STRUCTURE_LAB       && atLabs && _.sum(s.store) < s.storeCapacity)
                    );
                }
            });
            if(target){
                creep.memory.unloadTo = target.id;
            }else{
                creep.memory.unloadTo = 0;
            }
        }else{
            target = Game.getObjectById(creep.memory.unloadTo);
        }

        let unloadResult;
        if(target != null){
            if(creep.pos.isNearTo(target)){
                if(myResource != undefined){
                    unloadResult = creep.transfer(target, myResource);
                    creep.memory.unloadTo = 0;
                }else{
                    creep.memory.unloadTo = 0;
                    //console.log(creep.name+': '+unloadResult);
                    unloadResult =  'noTarget';
                }
                
            }else{
                creep.travelTo(target);
                unloadResult = ERR_NOT_IN_RANGE;
            }
            //console.log(creep.name+': '+unloadResult);
        }else{
            //console.log(creep.name+': '+unloadResult);
            unloadResult = 'noTarget';
        }
        if(debug){
            end = Game.cpu.getUsed();
            console.log("Unload Minerals ", end-start);
        }
        return unloadResult;
    },
    SetResource: function(creep, energyToo){
        let myResource;
        if(energyToo){
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
            }else if(creep.carry.OH > 0){
                myResource = RESOURCE_HYDROXIDE;
            }else if(creep.carry.ZK > 0){
                myResource = RESOURCE_ZYNTHIUM_KEANITE;
            }else if(creep.carry.UL > 0){
                myResource = RESOURCE_UTRIUM_LEMERGITE;
            }else if(creep.carry.UH > 0){
                myResource = RESOURCE_UTRIUM_HYDRIDE;
            }else if(creep.carry.UO > 0){
                myResource = RESOURCE_UTRIUM_OXIDE;
            }else if(creep.carry.KH > 0){
                myResource = RESOURCE_KEANIUM_HYDRIDE;
            }else if(creep.carry.KO > 0){
                myResource = RESOURCE_KEANIUM_OXIDE;
            }else if(creep.carry.LH > 0){
                myResource = RESOURCE_LEMERGIUM_HYDRIDE;
            }else if(creep.carry.LO > 0){
                myResource = RESOURCE_LEMERGIUM_OXIDE;
            }else if(creep.carry.ZH > 0){
                myResource = RESOURCE_ZYNTHIUM_HYDRIDE;
            }else if(creep.carry.ZO > 0){
                myResource = RESOURCE_ZYNTHIUM_OXIDE;
            }else if(creep.carry.GH > 0){
                myResource = RESOURCE_GHODIUM_HYDRIDE;
            }else if(creep.carry.GO > 0){
                myResource = RESOURCE_GHODIUM_OXIDE;
            }
        }else{
            if(creep.carry.H > 0){
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
            }else if(creep.carry.OH > 0){
                myResource = RESOURCE_HYDROXIDE;
            }else if(creep.carry.ZK > 0){
                myResource = RESOURCE_ZYNTHIUM_KEANITE;
            }else if(creep.carry.UL > 0){
                myResource = RESOURCE_UTRIUM_LEMERGITE;
            }else if(creep.carry.UH > 0){
                myResource = RESOURCE_UTRIUM_HYDRIDE;
            }else if(creep.carry.UO > 0){
                myResource = RESOURCE_UTRIUM_OXIDE;
            }else if(creep.carry.KH > 0){
                myResource = RESOURCE_KEANIUM_HYDRIDE;
            }else if(creep.carry.KO > 0){
                myResource = RESOURCE_KEANIUM_OXIDE;
            }else if(creep.carry.LH > 0){
                myResource = RESOURCE_LEMERGIUM_HYDRIDE;
            }else if(creep.carry.LO > 0){
                myResource = RESOURCE_LEMERGIUM_OXIDE;
            }else if(creep.carry.ZH > 0){
                myResource = RESOURCE_ZYNTHIUM_HYDRIDE;
            }else if(creep.carry.ZO > 0){
                myResource = RESOURCE_ZYNTHIUM_OXIDE;
            }else if(creep.carry.GH > 0){
                myResource = RESOURCE_GHODIUM_HYDRIDE;
            }else if(creep.carry.GO > 0){
                myResource = RESOURCE_GHODIUM_OXIDE;
            }
        }
        //console.log(myResource);
        return myResource;
    }
}

module.exports = UnloadMinerals;