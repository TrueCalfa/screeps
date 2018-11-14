const UnloadEnergy = require('job.unloadEnergy');

let LinkManager = {
    run: function(creep){
        //let myStorage = Game.getObjectById(creep.room.memory.myStorage);
        this.SetTask(creep);
        let start;
        let end;
        let debug = 0;
        switch(creep.memory.task){
            case 'loading':
                if(!creep.memory.loadFrom || creep.memory.loadFrom == 0){
                    let myLink = Game.getObjectById(creep.room.memory.linkTo);
                    if(myLink && myLink != 0 && myLink.energy > 0){
                        creep.memory.loadFrom = myLink.id;
                    }else{
                        
                        let myContainers = creep.room.memory.sourceContainers;
                        let validContainers = [];
                        for (let i in myContainers){
                            let thisContainer = Game.getObjectById(myContainers[i][0]);
                            if(thisContainer.store.energy > (creep.carryCapacity - _.sum(creep.carry))){
                                validContainers.push(thisContainer);
                            }
                        }
                        _.sortBy(validContainers, s => creep.pos.getRangeTo(s));
                        if(validContainers && validContainers.length > 0){
                            creep.memory.loadFrom = validContainers[0].id;
                        }
                    }
                }else{
                    let target = Game.getObjectById(creep.memory.loadFrom);
                    if(creep.pos.isNearTo(target)){
                        creep.withdraw(target, RESOURCE_ENERGY);
                        if(target.energy == 0){
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
                if(!creep.memory.unloadTo || creep.memory.unloadTo == 0){
                    let myContainer = Game.getObjectById(creep.room.memory.myUpgradersContainer);
                    if(myContainer && myContainer.store.energy < creep.carry.energy){
                        creep.memory.unloadTo = myContainer.id;
                    }else{
                        let myStorage = Game.getObjectById(creep.room.memory.myStorage);
                        if(myStorage && myStorage.store.energy != myStorage.storeCapacity){
                            creep.memory.unloadTo = myStorage.id;
                        }
                    }
                }else{
                    let target = Game.getObjectById(creep.memory.unloadTo);
                    if(creep.pos.isNearTo(target)){
                        creep.transfer(target, RESOURCE_ENERGY);
                        if(target.store.energy == target.storeCapacity){
                            creep.memory.unloadTo = 0;
                        }
                    }else{
                        creep.travelTo(target);
                    }
                }
                    
                    
                               
                //UnloadEnergy.run(creep, ['containers', 'storages']);
                //UnloadEnergy.run(creep, ['extensions', 'spawns', 'containers', 'storages']);
                if(debug){
                    end = Game.cpu.getUsed();
                    console.log("Link Manager: ", end-start);
                }
            break;
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



