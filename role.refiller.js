const PickEnergy = require('job.pickEnergy');
const UnloadEnergy = require('job.unloadEnergy');
//const LoadEnergy = require('job.loadEnergy');

let roleRefiller = {
    run: function(creep){
        let start;
        let end;
        let debug = 0;

        this.SetTask(creep);
        switch(creep.memory.task){
            
            case 'loading':
                //let loadResult = LoadEnergy.run(creep, ['containers', 'storages'], 99, Infinity);
                if(!creep.memory.loadFrom || creep.memory.loadFrom == 0){
                    let myStorage = Game.getObjectById(creep.room.memory.myStorage);
                    if(myStorage && myStorage.store.energy > 0){
                        creep.memory.loadFrom = myStorage.id;
                    }else{
                        
                        let myContainers = [];
                        if(creep.room.memory.sourceContainers){
                            for(let i in creep.room.memory.sourceContainers){
                                let thisContainer = Game.getObjectById(creep.room.memory.sourceContainers[i][0]);
                                if(thisContainer.store.energy > 50){
                                    myContainers.push(thisContainer);
                                }
                            }
                        }
                        if(myContainers && myContainers.length > 0){
                            _.sortBy(myContainers, s => creep.pos.getRangeTo(s));
                            //_.sortBy(myContainers, s => _.sum(s.store));
                            creep.memory.loadFrom = myContainers[0].id;
                        }else{
                            creep.memory.loadFrom = 0;
                            creep.memory.task = 'unloading';
                        }
                    }
                }else{
                    let destination = Game.getObjectById(creep.memory.loadFrom);
                    if(creep.pos.isNearTo(destination)){
                        if(destination.store.energy > 50){
                            let loadResult = creep.withdraw(destination, RESOURCE_ENERGY);
                            if(loadResult != OK && loadResult != ERR_NOT_IN_RANGE){
                                creep.memory.loadFrom = 0;
                            }
                        }else{
                            creep.memory.loadFrom = 0;
                        }
                    }else{
                        //console.log(creep.name, " - ", creep.memory.loadFrom);
                        creep.travelTo(destination);
                    }
                }
                //LoadEnergy.run(creep, ['containers'], 99, Infinity);
                
            break;
            
            case 'unloading':
                if(debug){
                    start = Game.cpu.getUsed();
                }
                if(creep.room.energyAvailable < creep.room.energyCapacityAvailable){
                    UnloadEnergy.run(creep, ['extensions', 'spawns']);
                    //creep.memory.unloadTo = 0;
                }else if(!creep.memory.unloadTo || creep.memory.unloadTo == 0){
                    let towers = creep.room.memory.towers;
                    let target;
                    for(let i in towers){
                        let thisTower = Game.getObjectById(towers[i]);
                        if(thisTower.energy < thisTower.energyCapacity * 0.9){
                            target = thisTower;
                            break;
                        }
                    }
                    if(target){
                        creep.memory.unloadTo = target.id;
                    }else{
                        if(_.sum(creep.carry) < creep.carryCapacity){
                            let pickEnergyResult = PickEnergy.run(creep, ['notFull'], 0, false);
                            if(pickEnergyResult != OK && pickEnergyResult != ERR_NOT_IN_RANGE){
                                let myContainers = [];
                                if(creep.room.memory.sourceContainers){
                                    for(let i in creep.room.memory.sourceContainers){
                                        let thisContainer = Game.getObjectById(creep.room.memory.sourceContainers[i][0]);
                                        if(thisContainer){
                                            if(_.sum(thisContainer.store) > (creep.carryCapacity-creep.carry.energy)){
                                                myContainers.push(thisContainer);
                                            }
                                        }
                                    }
                                }
                                if(myContainers && myContainers.length > 0){
                                    _.sortBy(myContainers, s => creep.pos.getRangeTo(s));
                                    //_.sortBy(myContainers, s => _.sum(s.store));
                                    creep.memory.loadFrom = myContainers[0].id;
                                    creep.memory.unloadTo = 0;
                                }else{
                                    creep.memory.loadFrom = 0;
                                    creep.memory.unloadTo = 0;
                                }
                                creep.memory.task = 'loading';
                            }
                        }else{
                            let myContainer = Game.getObjectById(creep.room.memory.myUpgradersContainer);
                            if(myContainer && myContainer.storeCapacity > _.sum(myContainer.store)){
                                creep.memory.unloadTo = myContainer.id;
                            }else{
                                creep.memory.unloadTo = 0;
                            }
                        }
                        
                    }
                }else{
                    let target = Game.getObjectById(creep.memory.unloadTo);
                    if(creep.pos.isNearTo(target)){
                        creep.transfer(target, RESOURCE_ENERGY);
                        creep.memory.unloadTo = 0;
                    }else{
                        creep.travelTo(target);
                    }
                }
                if(debug){
                    end = Game.cpu.getUsed();
                    console.log("Unload Energy",creep.name, " - ", end-start);
                }
                
            break;
        }
    },

    SetTask: function(creep){
        if(creep.carry.energy == 0){
            creep.memory.task = 'loading';
            creep.memory.unloadTo = 0;
        }else if(creep.carry.energy == creep.carryCapacity){
            creep.memory.task = 'unloading';
            creep.memory.loadFrom = 0;
        }
    }
}

module.exports = roleRefiller;
