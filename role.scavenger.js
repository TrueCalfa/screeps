let UnloadEnergy = require('job.unloadEnergy');
let PickEnergy = require('job.pickEnergy');
let UnloadMinerals = require('job.unloadMinerals');
let RoleMineralHauler = require('role.mineralHauler');

let roleScavenger = {
    run: function(creep){
        
        this.SetTask(creep);
        
        if(creep.room.name == creep.memory.myRoom){
            switch(creep.memory.task){
                case 'loading': 
                    let pickEnergyResult = PickEnergy.run(creep, ['notFull'], 0);
                    if(pickEnergyResult == 'noTarget'){
                        //RoleMineralHauler.run(creep);
                    }
                break;
                case 'unloading':
                    if(creep.carry.energy > 0){
                        let unloadResult = UnloadEnergy.run(creep, ['containers']);
                        if(unloadResult != OK && unloadResult != ERR_NOT_IN_RANGE){
                            unloadResult = UnloadEnergy.run(creep, ['storages']);
                            if(unloadResult != OK && unloadResult != ERR_NOT_IN_RANGE){
                                unloadResult = UnloadEnergy.run(creep, ['extensions', 'spawns']);
                            }
                        }
                    }else if(_.sum(creep.carry) > 0){
                        let unloadResult = UnloadMinerals.run(creep, ['terminals'], false);
                    }
                break;
            }
        }else{
            //console.log(creep.name+' is lost in room '+creep.room.name);
            creep.travelTo(Game.spawns[creep.memory.mySpawn]);
        }
            
    },

    SetTask: function(creep){
        if(_.sum(creep.carry) == 0){
            creep.memory.task = 'loading';
            creep.memory.unloadTo = 0;
        }else if(_.sum(creep.carry) == creep.carryCapacity){
            creep.memory.task = 'unloading';
        }

    }
    
    
    
    
    
    
    
    
};
module.exports = roleScavenger;
