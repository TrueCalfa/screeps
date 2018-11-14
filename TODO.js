/*
-) Evitar que las torres reparen ramparts y ponerme a construir muchas a lo loco
-)CPU:
    Dejar de almacenar objetos entros y almacenar solo las IDs para reducir el consumo de cpu
    
    Extractors y refillers son los mas caros. Upgraders me dan picos altos tb y repairers, y scavengers...wtf

    Empezar a sustituir LoadEnergy y UnloadEnergy de todos ellos. 
    Empezar por repairers

-)En define creeps hacer un metodo para calcular automaticamente el coste del "basicBody", para no cargarla sin querer

-)Configurar Traveler para que los refillers y puede que alguno mas calculen su ruta esquivando otros bichos o al menos que esperen menos tiempo cuando choquen contra uno
-) Nadie esta vaciando ahora mismo los contenedores de los mineros, salvo los repairers y los builders y solo si les queda cerca
-)Los builders recargan de cualquier contenedor, incluyendo el de los upgraders!!
-)Renovar refiller y a lo mejor alguno mas en vez de reconstruirlo cuando muere

-)Mirar a ver: Igual que he almacenado targetToBuild en la memoria de la habitacion en lugr de en la memoria del bicho, se podria hacer lo mismo con la targetToRepair,
 con la diferencia de que igual el bicho se vuelve un poco loco, pero s epuede hacer cada 50 ticks o algo asi

 -) Rooms: Para el terminal: Establecer unas rooms con "fine", otras con "haveMoney" y otras con "needMoney" segun lo que tengan en el storage,
 y luego habra que ver quien vacia el terminal de una room que recibe pasta



-)FlagScavenger solo mira dos supuestos:
     if(creep.pos.roomName == creep.memory.myRoom){
     y...
     else
Cuando atraviesa mas habitaciones, puede ser un problema.
Esto probablemente pueda pasar en mas FlagRoles....


-) Crear una oleada de defensores cuando detecte enemigos en una habitacion que no sea mia


-) Ramparts diferente HP segun ctrl lvl             https://docs.screeps.com/control.html

__________________________________________________________________________________________________________________________________________________________________________________













*/


