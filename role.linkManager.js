const UnloadEnergy = require('job.unloadEnergy');
let UnloadMinerals = require('job.unloadMinerals');
const PickEnergy = require('job.pickEnergy');
let LinkManager = {
    run: function(creep){
        //let myStorage = Game.getObjectById(creep.room.memory.myStorage);
        this.SetTask(creep);
        let start;
        let end;
        let debug = 0;
        if(creep.room.name == creep.memory.myRoom){
            switch(creep.memory.task){
                case 'loading':
                    if(!creep.memory.loadFrom || creep.memory.loadFrom == 0){
                        let myLink = Game.getObjectById(creep.room.memory.linkTo);
                        if(myLink && myLink != 0 && myLink.energy > 0){
                            creep.memory.loadFrom = myLink.id;
                        }else{
                            let pickEnergyResult;
                            if(creep.room.memory.myStorage){
                                pickEnergyResult = PickEnergy.run(creep, ['notFull'], 0, true);
                            }else{
                                pickEnergyResult = PickEnergy.run(creep, ['notFull'], 0, false);
                            }
                            if(pickEnergyResult == 'noTarget'){
                                //RoleMineralHauler.run(creep);
                                let myContainers = creep.room.memory.sourceContainers;
                                let validContainers = [];
                                for (let i in myContainers){
                                    let thisContainer = Game.getObjectById(myContainers[i][0]);
                                    if(thisContainer){
                                        if(thisContainer.store.energy > (creep.carryCapacity - _.sum(creep.carry))){
                                            validContainers.push(thisContainer);
                                        }
                                    }
                                }
                                if(validContainers && validContainers.length > 0){
                                    _.sortBy(validContainers, s => creep.pos.getRangeTo(s));
                                    //_.sortBy(validContainers, s => _.sum(s.store));
                                    creep.memory.loadFrom = validContainers[0].id;
                                }
                            }
                        }
                    }else{
                        let target = Game.getObjectById(creep.memory.loadFrom);
                            if(creep.pos.isNearTo(target)){
                                let loadResult = creep.withdraw(target, RESOURCE_ENERGY);
                                if(loadResult != OK){
                                    creep.memory.task  = 'unloading';
                                    creep.memory.loadFrom = 0;
                                }
                            }else{
                                creep.travelTo(target);
                            }
                    }
                break;
                case 'unloading':
                    if(debug){
                        start = Game.cpu.getUsed();
                    }
                    if(creep.carry.energy > 0){
                        if(!creep.memory.unloadTo || creep.memory.unloadTo == 0){
                            let myStorage = Game.getObjectById(creep.room.memory.myStorage);
                            if(myStorage){
                                if(myStorage.store.energy > 10000){

                                    let myContainer = Game.getObjectById(creep.room.memory.myUpgradersContainer);
                                    if(myContainer && (myContainer.storeCapacity - _.sum(myContainer.store)) > creep.carry.energy){
                                        creep.memory.unloadTo = myContainer.id;
                                    }else{
                                        if(myStorage.store.energy != myStorage.storeCapacity){
                                            creep.memory.unloadTo = myStorage.id;
                                        }else{
                                            creep.memory.unloadTo = 0;
                                            unloadResult = UnloadEnergy.run(creep, ['extensions', 'spawns']);
                                        }
                                    }
                                }else{
                                    creep.memory.unloadTo = myStorage.id;
                                }
                            }else{
                                let myContainer = Game.getObjectById(creep.room.memory.myUpgradersContainer);
                                if(myContainer && myContainer.storeCapacity > _.sum(myContainer.store)){
                                    creep.memory.unloadTo = myContainer.id;
                                }else{
                                    creep.memory.unloadTo = 0;
                                    unloadResult = UnloadEnergy.run(creep, ['extensions', 'spawns']);
                                
                                }
                            }
                        }else{
                            let target = Game.getObjectById(creep.memory.unloadTo);
                            if(creep.pos.isNearTo(target)){
                                let unloadResult = creep.transfer(target, RESOURCE_ENERGY);
                                if(unloadResult != OK){
                                    creep.memory.unloadTo = 0;
                                }
                            }else{
                                creep.travelTo(target);
                            }
                        }
                    }else if(_.sum(creep.carry) > 0){
                        let unloadResult = UnloadMinerals.run(creep, ['terminals'], false);
                        if(unloadResult != OK && unloadResult != ERR_NOT_IN_RANGE){
                            unloadResult = UnloadMinerals.run(creep, ['storages'], false);
                        }
                    }
                    if(debug){
                        end = Game.cpu.getUsed();
                        console.log("Link Manager: ", end-start);
                    }
                break;
            }
        }else{
            creep.travelTo(Game.spawns[creep.memory.mySpawn]);
        }
    },

    SetTask: function(creep){
        if(_.sum(creep.carry) == creep.carryCapacity){
            creep.memory.task = 'unloading';
            creep.memory.loadFrom = 0;

        }else if(_.sum(creep.carry) == 0){
            creep.memory.task = 'loading';
            creep.memory.unloadTo = 0;

        }
    }
};

module.exports = LinkManager;



