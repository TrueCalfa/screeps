let eachTwenty = {
    
    run: function(thisRoom){
        if((Game.time +2) % 20 == 0){

        
        //ARE THERE ANY CONTAINERS NEXT TO AN ENERGY SOURCE?
            this.FindSourceContainers(thisRoom);
        //SET MINERAL CONTAINER
            this.SetMineralContainer(thisRoom);
        //MINERAL HAULERS AND MINERAL EXTRACTORS
            this.SetNumberOfMineralWorkers(thisRoom);
        //ARE THERE ANY MINERAL CONTAINERS IN THIS ROOM?
            //Esto es lo mismo que SetMineralContainer, asi que lo borro por ahora.
            //this.FindMineralContainer(thisRoom);
        //ARE THERE ANY OTHER CONTAINERS? (UPGRADERS' CONTAINER)
            //this.FindUpgradersContainer(thisRoom);
        //WRITE INFO ABOUT SPAWNS
            //this.SetSpawns(thisRoom);
        }
    },
    
    FindSourceContainers: function(thisRoom){
        let myContainers = [];
        myContainers = thisRoom.find(FIND_STRUCTURES, {
            filter: (s) => s.structureType === STRUCTURE_CONTAINER && s.pos.findInRange(FIND_SOURCES, 1).length > 0
        });

        //Inicializar la memoria para los Containers
        if(!thisRoom.memory.sourceContainers){
            thisRoom.memory.sourceContainers = [];
        }else if(myContainers.length > 0){
            //Para cada contenedor....
            for (let i in myContainers){
                //Asigno el primer valor en memoria a la ID del container 
                //Y el segundo valor un 0
                if(!thisRoom.memory.sourceContainers[i]){
                    thisRoom.memory.sourceContainers[i] = [];
                    thisRoom.memory.sourceContainers[i][0] = myContainers[i].id;
                    thisRoom.memory.sourceContainers[i][1] = 0;
                }
                if(thisRoom.memory.sourceContainers[i][1] == 0){
                    let unassignedMiners = thisRoom.memory.unassignedMiners;
                    if(unassignedMiners.length > 0){
                        thisRoom.memory.sourceContainers[i][1] = unassignedMiners[0].id;
                        Game.creeps[unassignedMiners[0].name].memory.myContainer = thisRoom.memory.sourceContainers[i][0];
                        break;
                        //En "ClearMemory", continua el proceso en caso de que un minero muera y haya que dejar libre su contenedor.
                    }
                }
            }
        }
        if(thisRoom.memory.sourceContainers.length > 0){
            thisRoom.memory.desiredHarversters = 0;
        }
    },
    SetMineralContainer: function(thisRoom){
        if(null == thisRoom.memory.mineralContainer){
            let myExtractor = [];
            myExtractor = thisRoom.find(FIND_STRUCTURES, { filter: (a) => a.structureType == STRUCTURE_EXTRACTOR});
            if(myExtractor.length > 0){
                let mineralContainer = myExtractor[0].pos.findInRange(FIND_STRUCTURES, 1, {filter: (a) => a.structureType == STRUCTURE_CONTAINER});
                if(mineralContainer.length > 0){
                    thisRoom.memory.mineralContainer = mineralContainer[0].id;
                    thisRoom.memory.extractor = myExtractor[0].id;
                    
                }else{
                    thisRoom.memory.mineralContainer = null;
                    thisRoom.memory.desiredExtractors = 0;
                }
            }else{
                thisRoom.memory.mineralContainer = null;
                thisRoom.memory.desiredExtractors = 0;
            }

        }
    },
    SetNumberOfMineralWorkers: function(thisRoom){
        if(thisRoom.memory.mineralContainer && thisRoom.memory.mineralContainer != 0){
            let thisSource = Game.getObjectById(thisRoom.memory.mineralSource);
            if(thisSource && thisSource.mineralAmount > 0){
                thisRoom.memory.desiredExtractors = 0;
            }else{
                thisRoom.memory.desiredExtractors = 0;
            }
                //let myExtractor = thisRoom.find(FIND_STRUCTURES, { filter: (a) => a.structureType == STRUCTURE_EXTRACTOR});
            //thisRoom.memory.desiredMineralHaulers = 0;
            //Solo un mineral hauler siempre que el contenedor de minerales este lleno
            let mineralContainer = Game.getObjectById(thisRoom.memory.mineralContainer);
            if(mineralContainer){
                if(_.sum(mineralContainer.store) == mineralContainer.storeCapacity){
                    thisRoom.memory.desiredMineralHaulers = 1;
                }else{
                    thisRoom.memory.desiredMineralHaulers = 0;
                }
            }
            //thisRoom.memory.extractor = myExtractor[0].id
        }
    },
    
    //Deprecated and useless :D
    FindMineralContainer: function(thisRoom){
        let myOtherContainers = thisRoom.find(FIND_STRUCTURES, {
            filter: (s) => s.structureType === STRUCTURE_CONTAINER && !(s.pos.findInRange(FIND_MINERALS, 1).length > 0) && !(s.pos.findInRange(FIND_SOURCES, 1).length > 0)
        });
        if(!thisRoom.memory.nonSourceContainers){
            thisRoom.memory.nonSourceContainers = [];
        }
        for(let i in myOtherContainers){
            if(!thisRoom.memory.nonSourceContainers[i]){
                thisRoom.memory.nonSourceContainers[i] = myOtherContainers[i].id;
            }
        }
    }

};
module.exports = eachTwenty;