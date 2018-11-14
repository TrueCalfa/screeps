
const GoBuild = require('job.build');
const GoFarm = require('job.harvest');
const GoRepair = require('job.repair');
const UnloadEnergy = require('job.unloadEnergy');
const LoadEnergy = require('job.loadEnergy');
const GoUpgrade = require('job.upgrade');
const AssignNewFlag = require('flag.assignNew');

let roleFlagBuilder = {

    run: function(creep) {
        let flag = Game.flags[creep.memory.targetFlag];

        if(flag && flag.color == COLOR_GREEN && flag.secondaryColor == COLOR_GREEN){
            
            if(creep.room == flag.room){

                    this.SetTask(creep);

                    if(creep.memory.harvesting == true){
                    
                            let farmResult = GoFarm.run(creep);
                            if(farmResult == ERR_NOT_ENOUGH_ENERGY || farmResult == ERR_NOT_ENOUGH_RESOURCES || farmResult == ERR_NO_PATH){
                                let loadResult = LoadEnergy.run(creep, ['containers', 'storages'], 500);
                            }

                    }else{

                        let buildResult = GoBuild.run(creep);
                        
                        if(buildResult != ERR_NOT_IN_RANGE && buildResult != OK){    

                            let repairResult = GoRepair.run(creep);
                            if(repairResult != ERR_NOT_IN_RANGE && repairResult != OK){
                            
                                let unloadResult = UnloadEnergy.run(creep, ['any'], Infinity);
                                if(unloadResult != ERR_NOT_IN_RANGE){

                                    let upgradeResult = GoUpgrade.run(creep);
                                    if(upgradeResult != ERR_NOT_IN_RANGE && upgradeResult != OK){
                                        let farmResult = GoFarm.run(creep);
                                    }
                                }
                            }
                            //let unloadStructures = ['containers', 'spawns','towers','extensions', 'storages'];
                            //let unloadResult = UnloadEnergy.run(creep, unloadStructures);


                        }
                            

                    }

            }else{
                creep.travelTo(flag);
            }
        }else{

            AssignNewFlag.run(creep, COLOR_GREEN, COLOR_GREEN);

        }


    },

    SetTask: function(creep){
        if(creep.memory.harvesting != true){

            creep.memory.harvesting = false;
        }

        if(_.sum(creep.carry) == 0) {
            creep.memory.unloadTo = 0;
            creep.memory.harvesting = true;

        }else if(_.sum(creep.carry) == creep.carryCapacity){
            creep.memory.harvesting = false;
            creep.memory.loadFrom = 0;
        }
    }
};

module.exports = roleFlagBuilder;
