module.exports = {
    
    distanceSq: function(from,to) {
    
        var xDif = from.pos.x - to.pos.x;
        var yDif = from.pos.y - to.pos.y;
        var dist = Math.sqrt(xDif*xDif + yDif*yDif);   
        return dist;
    
    },
    
    CheckTile: function(creep, targetPos) {
        var tileOccupied = creep.room.lookAt(targetPos);
        var whoIs=[];
        tileOccupied.forEach(function(object){
            if (object.type == LOOK_CREEPS){
                whoIs[0] = object[LOOK_CREEPS];
            }
        });
        if(whoIs[0]){
            return true;
        }else{
            return false;
        }
    },
    
    CheckSource: function(){
        var resources_list = spawn.room.find(FIND_SOURCES);
        for(var i=0;i<resources_list.length;i++)
        {
            var resource = resources_list[i];
            var temp = spawn.room.lookForAtArea(LOOK_TERRAIN,resource.pos.y-2,resource.pos.x-2,resource.pos.y+2,resource.pos.x+2,true);
            console.log(temp);
        }
    }
};