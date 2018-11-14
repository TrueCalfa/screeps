const UnloadMinerals = require('job.unloadMinerals');
//const LoadMinerals = require('job.loadMinerals');

let roleMineralHauler = {
    run: function(creep){

        this.SetTask(creep);
        switch(creep.memory.task){
            case 'loading':
                if(!creep.memory.loadFrom || creep.memory.loadFrom == 0){
                    creep.memory.loadFrom = creep.room.memory.mineralContainer;
                }else{

                    let myResource = creep.room.memory.mineralType;
                    let target = Game.getObjectById(creep.memory.loadFrom);
                    if(_.sum(target.store) < creep.carryCapacity){
                        if(creep.memory.role == 'mineralHauler'){
                            creep.suicide();
                        }
                    }else{
                        if(creep.pos.isNearTo(target)){
                            if(_.sum(target.store) >= (creep.carryCapacity - _.sum(creep.carry))){
                            //if(_.sum(target.store) > 0){
                                creep.withdraw(target, myResource);
                            }
                        }else{
                            creep.travelTo(target);
                        }
                    }
                }
                //let loadResult = LoadMinerals.run(creep, ['containers'], 99, true);
            break;
            case 'unloading':
                //Si elijo descargar algo en terminales, acordarse de pasar un "false" para que no descargeue energia ahi.
                //El refiller se va a encargar de que cada terminal siempre tenga al menos 2k de energia.
                let unloadResult = UnloadMinerals.run(creep, ['terminals'], false);
                if(unloadResult == 'noTarget'){
                    unloadResult = UnloadMinerals.run(creep, ['storages'], true);
                }
            break;
        }
    },

    SetTask: function(creep){
        if(_.sum(creep.carry) == 0){
            creep.memory.task = 'loading';
            creep.memory.unloadTo = 0;
        }else if(_.sum(creep.carry) == creep.carryCapacity){
            creep.memory.task = 'unloading';
            creep.memory.loadFrom = 0;
        }
    }
}

module.exports = roleMineralHauler;