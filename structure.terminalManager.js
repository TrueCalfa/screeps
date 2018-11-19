module.exports = {

    SellMinerals: function(thisRoom){
        let terminal = thisRoom.memory.terminal;
        let myTerminal = Game.getObjectById(terminal);
        if (myTerminal) {
            let myResource = this.SetResource(myTerminal);
            if ((myTerminal.store.energy) >= 1000 && (myTerminal.store[myResource]) >= 2000) {
                var orders = Game.market.getAllOrders(order => 
                    order.resourceType == myResource &&
                    order.type == ORDER_BUY &&
                    Game.market.calcTransactionCost(200, myTerminal.room.name, order.roomName) < 100);
                orders.sort(function(a,b){return b.price - a.price;});

                if(orders.length){
                    //console.log('Best price for terminal on room '+ myTerminal.room.name+' for '+myResource+' was: ' + orders[0].price);
                    if (orders[0].price >= 0.99) {
                      let result = Game.market.deal(orders[0].id, 1000, myTerminal.room.name);
                      if (result == 0) {
                          console.log('Order completed successfully: ');
                      }

                    }
                }

            }
        }
    },
    SellEnergy: function(thisRoom){
        let terminal = thisRoom.memory.terminal;
        let myTerminal = Game.getObjectById(terminal);
        if (myTerminal && myTerminal.isActive) {
            //let myResource = this.SetResource(myTerminal);
            if ((myTerminal.store.energy) >= 10000) {
                var orders = Game.market.getAllOrders(order => 
                    order.resourceType == RESOURCE_ENERGY &&
                    order.type == ORDER_BUY &&
                    Game.market.calcTransactionCost(200, myTerminal.room.name, order.roomName) < 100);
                orders.sort(function(a,b){return b.price - a.price;});

                if(orders.length){
                    //console.log('Best price for terminal on room '+ myTerminal.room.name+' for '+myResource+' was: ' + orders[0].price);
                    if (orders[0].price >= 0.005) {
                      let result = Game.market.deal(orders[0].id, 1000, myTerminal.room.name);
                      if (result == 0) {
                          console.log("Sold Energy successfully");
                      }

                    }
                }

            }
        }
    },
    BuyEnergy: function(thisRoom){
        let terminal = thisRoom.memory.myTerminal;
        let myTerminal = Game.getObjectById(terminal);
        if (myTerminal && (Game.time % 10 == 0)) {

            var curOrders = Game.market.getAllOrders(order => order.resourceType == RESOURCE_ENERGY && order.type == ORDER_SELL && order.amount > 500);
            if(curOrders.length){
                curOrders.sort(function(a,b){return a.price - b.price;});
    
                console.log('Best price: ' + curOrders[0].price);
                if (curOrders[0].price < 0.0015) {
                    var result = Game.market.deal(curOrders[0].id, 200, thisRoom.name);
    
                    if (result == 0) {
                        //console.log('Order completed successfully: ');
    
                    }
    
                }
            }


        }
    },
    SetResource: function(terminal){
        let myResource;
        if(RESOURCE_HYDROGEN in terminal.store){
            myResource = RESOURCE_HYDROGEN;
        }else if(RESOURCE_OXYGEN in terminal.store){
            myResource = RESOURCE_OXYGEN;
        }else if(RESOURCE_UTRIUM in terminal.store){
            myResource = RESOURCE_UTRIUM;
        }else if(RESOURCE_LEMERGIUM in terminal.store){
            myResource = RESOURCE_LEMERGIUM;
        }else if(RESOURCE_KEANIUM in terminal.store){
            myResource = RESOURCE_KEANIUM;
        }else if(RESOURCE_ZYNTHIUM in terminal.store){
            myResource = RESOURCE_ZYNTHIUM;
        }else if(RESOURCE_CATALYST in terminal.store){
            myResource = RESOURCE_CATALYST;
        }else if(RESOURCE_GHODIUM in terminal.store){
            myResource = RESOURCE_GHODIUM;
        }
        return myResource;
    }
};

//order.resourceType == RESOURCE_GHODIUM && order.type == ORDER_SELL && Game.market.calcTransactionCost(200, 'W12N64', order.roomName) < 500));
