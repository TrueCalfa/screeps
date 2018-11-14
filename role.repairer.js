//const Build = require('job.build');
const Repair = require('job.repair');
//const Harvest = require('job.harvest');
//const PickEnergy = require('job.pickEnergy');
const LoadEnergy = require('job.loadEnergy');
//const UnloadEnergy = require('routines.unloadEnergy');
var roleRepairer = {

    /** @param {Creep} creep **/
    run: function(creep) {

	    this.SetTask(creep);

	    switch(creep.memory.task){
	        case 'working':
	            let repairResult = Repair.run(creep, false);
	            if(repairResult == 'noTarget'){
                    creep.memory.inRepairPosition = false;
                    creep.memory.inPosition = false;
                    if(creep.carry.energy != creep.carryCapacity){
                        creep.memory.task = 'loading';
                    }
                } 
            break;
            case 'loading':
                //Esto ha de ser asi, porque es posible que este lleno, y que como no encuentra algo que reparar, se quede en "loading" pero lleno.
                //y asi evito que llame a LoadEnergy innecesariamente.
                if(creep.carry.energy < creep.carryCapacity){
                    let currentCapacity = creep.carryCapacity - creep.carry.energy;
                    
                    let loadEnergyResult =  LoadEnergy.run(creep, ['storages'], currentCapacity, Infinity);
                    if(loadEnergyResult != OK && loadEnergyResult != ERR_NOT_IN_RANGE && loadEnergyResult != ERR_NOT_ENOUGH_RESOURCES){
                        loadEnergyResult =  LoadEnergy.run(creep, ['containers'], currentCapacity, Infinity);
                    }
                }
            
            break;
            default:{
				creep.memory.task = 'loading';
			}break;
	    }
    },

    SetTask: function(creep){
        if(creep.carry.energy == 0){
            creep.memory.task = 'loading';
            creep.memory.inRepairPosition = false;
            creep.memory.unloadTo = 0;
        }else if(creep.carry.energy == creep.carryCapacity){
            creep.memory.task = 'working';
            creep.memory.loadFrom = 0;
        }
    }
};

module.exports = roleRepairer;

