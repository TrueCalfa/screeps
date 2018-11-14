const GoRepair = require('job.repair');
const GoBuild = require('job.build');
const GoHarvest = require('job.harvest');
//const PickEnergy = require('job.pickEnergy');
const UnloadEnergy = require('job.unloadEnergy');
//const LoadEnergy = require('job.loadEnergy');
const GoUpgrade = require('job.upgrade');
let roleHarvester = {

    run: function(creep) {

        this.SetTask(creep);
        
        if(creep.memory.harvesting == true) {
            if(!creep.memory.inPosition){
                creep.memory.inPosition = false;
            }
            GoHarvest.run(creep);
        }else{
            let args = ['extensions', 'spawns'];
            let unloadResult = UnloadEnergy.run(creep, args);
            if(unloadResult != OK && unloadResult != ERR_NOT_IN_RANGE){
                let buildResult = GoBuild.run(creep);
                if(buildResult  != OK && buildResult != ERR_NOT_IN_RANGE){
                    let repairResult = GoRepair.run(creep,true);
                    if(repairResult != OK && repairResult != ERR_NOT_IN_RANGE){
                        GoUpgrade.run(creep);
                    }else{
                        creep.memory.inPosition = false;
                    }
                }else{
                    creep.memory.inPosition = false;
                }
            }else{
                creep.memory.inPosition = false;
            }
        }
    },
    SetTask: function(creep){
        if(creep.carry.energy == 0){
            creep.memory.harvesting = true;
            creep.memory.unloadTo = 0;
            creep.memory.inPosition = false;
        }else if(creep.carry.energy == creep.carryCapacity){
            creep.memory.harvesting = false;
            creep.memory.loadFrom = 0;
        }
    }
};

module.exports = roleHarvester;


