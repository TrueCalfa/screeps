module.exports = {

    run: function(creep, flagColor,flagSecColor){
        
        //ASIGNO A UNA QUE LO NECESITE
        
            for(let i in Game.flags){
                let thatFlag = Game.flags[i];
                if(thatFlag.color == flagColor && thatFlag.secondaryColor == flagSecColor && Game.flags[i].memory.desiredMinions > Game.flags[i].memory.currentMinions){
                    creep.memory.targetFlag = thatFlag.name;
                }
            }
        
        //SI NO HAY, ASIGNO A UNA CUALQUIERA DE SU COLO
        
            if(!(Game.flags[creep.memory.targetFlag] && Game.flags[creep.memory.targetFlag].color == flagColor && Game.flags[creep.memory.targetFlag].secondaryColor == flagSecColor)){
                for(let i in Game.flags){
                    let thatFlag = Game.flags[i];
                    if(thatFlag.color == flagColor && thatFlag.secondaryColor == flagSecColor){
                        creep.memory.targetFlag = thatFlag.name;
                    }
                }
            }
            
        //SI AUN ASI NO HE ENCONTRADO NINGUNA...
        //LO ENVIO A SU SPAWN
            if(!Game.flags[creep.memory.targetFlag]){
                creep.memory.targetFlag = null;
                if(!creep.fatige){
                    creep.travelTo(Game.spawns[creep.memory.mySpawn]);
                }
            }
    }

};