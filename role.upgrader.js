//ROLE UPGRADER
const GoUpgrade = require('job.upgrade');
const GoHarvest = require('job.harvest');
//const PickEnergy = require('job.pickEnergy');
//const LoadEnergy = require('job.loadEnergy');
var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {

        this.SetTask(creep);

	    if(creep.memory.task == 'working'){
	        GoUpgrade.run(creep);
        }else if(creep.memory.task == 'loading'){
			// if(!creep.memory.myContainer || creep.memory.myContainer == 0){
			// 	creep.memory.myContainer = creep.pos.findInRange(FIND_STRUCTURES, 1,{
			// 		filter: function(s){
			// 			return(s.structureType == STRUCTURE_CONTAINER);
			// 		}
			// 	}).id;
			// }

			let myContainer = Game.getObjectById(creep.room.memory.myUpgradersContainer);
			if(myContainer && myContainer.store.energy > 0){
				if(creep.pos.isNearTo(myContainer)){
					creep.withdraw(myContainer, RESOURCE_ENERGY);
					creep.memory.task = 'working';
				}else{
					creep.travelTo(myContainer);
				}
				//Todo lo de abajo relativo a myStorage, deberia estar aqui, pero como voy tan mal d cpu, lo dejo ahi abajo.
			}else{
				
				//console.log(creep.room.name);
				let myStorage = Game.getObjectById(creep.room.memory.myStorage);
				if(myStorage && myStorage.store.energy > 0){
					if(creep.pos.isNearTo(myStorage)){
						creep.withdraw(myStorage, RESOURCE_ENERGY);
					}else{
						creep.travelTo(myStorage);
					}
				}else{
					GoHarvest.run(creep);
				}
				
			}
			/*
			if(loadEnergyResult == 'noTarget'){
				GoHarvest.run(creep);
			}
			*/
        }
	},

	SetTask: function(creep){
		if(creep.carry.energy == 0) {
			creep.memory.task = 'loading';
			creep.memory.inPosition = false;
			//creep.memory.upgrading = false;
		}
	    if(creep.carry.energy == creep.carryCapacity) {
			creep.memory.task = 'working';
			creep.memory.myContainer = 0;
			creep.memory.loadFrom = 0;
			
		}
	}
};

module.exports = roleUpgrader;