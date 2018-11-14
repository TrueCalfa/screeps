let eachHundred = {
    run: function(thisRoom){    
        if((Game.time +3) % 100 == 0){

        //ARE THERE ANY STORAGES IN THIS ROOM?
            //this.SetStorages(thisRoom);
        //ARE THERE ANY TERMINALS IN THIS ROOM?
            //this.SetTerminals(thisRoom);
        //ARE THERE ANY SOURCES IN THIS ROOM?
            this.SetSources(thisRoom);
        //MINERAL SOURCE
            this.SetMineralSource(thisRoom);
        }
    },
    SetStorages: function(thisRoom){
        let myStorage = thisRoom.find(FIND_STRUCTURES, { filter: (s) => s.structureType === STRUCTURE_STORAGE });
        if(myStorage && myStorage.length > 0){
            thisRoom.memory.myStorage = myStorage[0].id;
        }
    },
    SetTerminals: function(thisRoom){
        let myTerminal = thisRoom.find(FIND_STRUCTURES, { filter: (s) => s.structureType ===STRUCTURE_TERMINAL });
        if(myTerminal && myTerminal.length > 0){
            thisRoom.memory.terminal = myTerminal[0].id;
        }
    },
    SetSources: function(thisRoom){
        let mySources = [];
        if(!thisRoom.memory.sources){
             let sources = thisRoom.find(FIND_SOURCES);
             for (let i in sources){
                 mySources.push(sources[i].id);
            }
            thisRoom.memory.sources = mySources;
        }
    },
    SetMineralSource: function(thisRoom){
        if(!thisRoom.memory.mineralSource){
            let mineralSources = thisRoom.find(FIND_MINERALS);
            if(mineralSources && mineralSources.length > 0){
                thisRoom.memory.mineralSource = mineralSources[0].id;
                thisRoom.memory.mineralType = mineralSources[0].mineralType;
            }

        }
    }
};
module.exports = eachHundred;