module.exports = {

    run: function(){
        
        for(let i in Memory.creeps) {
            if(!Game.creeps[i]) {
                delete Memory.creeps[i];
            }
        }
        for(let i in Memory.flags) {
            if(!Game.flags[i]) {
                delete Memory.flags[i];
            }else if(Game.flags[i].color == COLOR_PURPLE && Game.flags[i].room && Game.flags[i].room.controller.my){
                Game.flags[i].remove();
            }
        }
    }
}
