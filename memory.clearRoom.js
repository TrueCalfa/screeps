module.exports = {

    run: function(thisRoom, args){
        
        if(Game.time % 5 == 0){
            let sourceContainers = thisRoom.memory.sourceContainers;
            if(sourceContainers && sourceContainers.length > 0){
                let isMinerAlive = 0;
                //let myCreeps = Memory.creeps;
                for (let i in  sourceContainers){
                    for(let j in Memory.creeps){
                        if(Game.creeps[j].id == sourceContainers[i][1]){
                            isMinerAlive = 1;

                            break;
                        }else{
                            isMinerAlive = 0;
                        }
                    }
                    if(isMinerAlive == 0){

                        thisRoom.memory.sourceContainers[i][1] = 0;
                    }
                }
            }
            
            if(!thisRoom.memory.linkTo){
                thisRoom.memory.linkTo = 0;
            }
            if(!thisRoom.memory.linkFrom ){
                thisRoom.memory.linkFrom = [];
            }



            //Miro a ver si hay que borrar un contenedor de la memoria porque lo destruyo y lo construyo en otro sitio.
            //ESTO NO CONTEMPLA LOS CONTENEDORES QUE ESTAN AL LADO DE LOS ENERGY SOURCES
            let nonSourceContainers = thisRoom.memory.nonSourceContainers;
            if(nonSourceContainers && nonSourceContainers.length > 0){
                for(let i in nonSourceContainers){
                    if(!Game.getObjectById(nonSourceContainers[i])){
                        delete thisRoom.memory.nonSourceContainers[i];
                    }
                }
            }
        }
    }
}
