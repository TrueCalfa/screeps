const Build = require('job.build');
const LoadEnergy = require('job.loadEnergy');

var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

		this.SetTask(creep);
		
		switch(creep.memory.task){
	        case 'working':
				let buildResult = Build.run(creep);
			break;
			case 'loading':
				let myContainer;
				let myStorage;
				myStorage = Game.getObjectById(creep.room.memory.myStorage);
				if(myStorage && myStorage.store.energy > 0){
					if(creep.pos.isNearTo(myStorage)){
						creep.withdraw(myStorage, RESOURCE_ENERGY);
					}else{
						creep.travelTo(myStorage);
					}
				}else{
					for(let i in creep.room.memory.sourceContainers){
						let thisContainer = Game.getObjectById(creep.room.memory.sourceContainers[i][0]);
						if(thisContainer.store.energy > (_.sum(creep.carry))-creep.carryCapacity){
							myContainer = thisContainer;
							break;
						}
					}
					if(myContainer){
						if(creep.pos.isNearTo(myContainer)){
							creep.withdraw(myContainer, RESOURCE_ENERGY);
						}else{
							creep.travelTo(myContainer);
						}
					}
				}
				//let loadEnergyResult =  LoadEnergy.run(creep, ['containers', 'storages'], creep.carryCapacity, Infinity);
			break;
			default:{
				creep.memory.task = 'loading';
			}break;
	    }
	},
	
	SetTask: function(creep){
		if(creep.carry.energy == 0){
	        creep.memory.task = 'loading';
        }else if(creep.carry.energy == creep.carryCapacity){
			creep.memory.task = 'working';
			creep.memory.loadFrom = 0;
        }
	}
};

module.exports = roleBuilder;

