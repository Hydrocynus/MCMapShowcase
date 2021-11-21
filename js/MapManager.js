"use strict";
class MapManager {
    constructor() {
        this.nextID = 1;
        this.curMaps = new Map;
        this.allMaps = new Map;
    }
    add(map) {
        console.debug("add: allMaps | curMaps", this.allMaps, this.curMaps);
        let idToAddTo;
        this.allMaps.forEach((v, k) => {
            if (k.xCenter === map.xCenter && k.zCenter === map.zCenter)
                idToAddTo = v;
        });
        if (idToAddTo === undefined) {
            idToAddTo = this.nextID;
            this.nextID++;
            console.debug("adding map with new ID " + idToAddTo);
            this.allMaps.set(map, idToAddTo);
            this.curMaps.set(idToAddTo, map);
        }
        else {
            console.debug("adding map to ID " + idToAddTo);
            this.allMaps.set(map, idToAddTo);
        }
        console.debug("values", [...this.allMaps.values()]);
        for (let id in [...this.allMaps.values()]) {
            console.debug("searching id", id, typeof id);
        }
        console.debug("add: allMaps | curMaps", this.allMaps, this.curMaps);
        return this;
    }
    remove(map) {
        console.debug("remove: allMaps | curMaps", this.allMaps, this.curMaps);
        const deletedID = this.allMaps.get(map);
        console.debug("deletedID", deletedID);
        if (deletedID)
            console.debug("cur?", this.curMaps.get(deletedID));
        this.allMaps.delete(map);
        if (deletedID && this.curMaps.get(deletedID) === map) {
            console.debug("removed map was current of ID " + deletedID);
            for (let id in [...this.allMaps.values()]) {
                console.debug("searching id", id, typeof id);
                if (id == deletedID + "") {
                }
            }
        }
        console.debug("remove: allMaps | curMaps", this.allMaps, this.curMaps);
        return this;
    }
}
