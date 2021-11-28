"use strict";
/**
 * Stores and indexes all maps.
 * @author Hydrocynus
 * @version 27/11/2021
 * @since 21/11/2021
 * @class MapManager
 */
class MapManager {
    /**
     * Creates an instance of MapManager.
     * @author Hydrocynus
     * @date 21/11/2021
     * @memberof MapManager
     */
    constructor() {
        this.mapGrid = [];
        this.gridNeedsUpdate = false;
        /**
         * Provides next available id.
         * @author Hydrocynus
         * @date 21/11/2021
         * @private
         * @type {number}
         * @memberof MapManager
         */
        this.nextID = 1;
        this.curMaps = new Map;
        this.allMaps = new Map;
    }
    get grid() {
        if (this.gridNeedsUpdate) {
            console.debug("mapGrid needs update");
            this.updateGrid();
        }
        return this.mapGrid;
    }
    /**
     * Adds a new map to the MapManager.
     * @author Hydrocynus
     * @version 27/11/2021 (simplified)
     * @since 21/11/2021
     * @param {MCMap} map
     * @returns {this}
     * @memberof MapManager
     */
    add(map) {
        this.gridNeedsUpdate = true;
        let idToAddTo;
        for (let n of this.allMaps) {
            if (n[0].xCenter !== map.xCenter || n[0].zCenter !== map.zCenter)
                continue;
            idToAddTo = n[1];
            break;
        }
        if (idToAddTo === undefined) {
            idToAddTo = this.nextID++;
            this.curMaps.set(idToAddTo, map);
        }
        this.allMaps.set(map, idToAddTo);
        return this;
    }
    /**
     * Removes an existing map from the MapManager.
     * @author Hydrocynus
     * @version 27/11/2021
     * @since 21/11/2021
     * @param {MCMap} map
     * @returns {this}
     * @memberof MapManager
     */
    remove(map) {
        const idToDeleteFrom = this.allMaps.get(map);
        if (idToDeleteFrom === undefined)
            return this;
        this.gridNeedsUpdate = true;
        this.allMaps.delete(map);
        if (this.curMaps.get(idToDeleteFrom) !== map)
            return this;
        for (let n of this.allMaps) {
            if (n[1] !== idToDeleteFrom)
                continue;
            this.curMaps.set(idToDeleteFrom, n[0]);
            break;
        }
        if (this.curMaps.get(idToDeleteFrom) === map)
            this.curMaps.delete(idToDeleteFrom);
        return this;
    }
    updateGrid() {
        // console.debug("update", this.curMaps);
        for (let map of this.curMaps) {
            const x = map[1].xCenter / map[1].size - 1;
            const z = map[1].zCenter / map[1].size - 1;
            console.debug("Map", ...map, "at x", x, "and z", z);
            this.addToGrid(x, z, map[1]);
        }
    }
    addToGrid(x, z, map) {
        if (this.mapGrid[x] === undefined)
            this.mapGrid[x] = [];
        this.mapGrid[x][z] = map;
    }
    /**
     * Selects a perticular map of an id group as current.
     * @author Hydrocynus
     * @date 27/11/2021
     * @param {MCMap} map
     * @returns {this}
     * @memberof MapManager
     * @throws {MapNotFoundException}
     */
    select(map) {
        const id = this.allMaps.get(map);
        if (id === undefined)
            throw new CustomError(Exception.MapNotFound, "A map must first be added to be selected");
        this.gridNeedsUpdate = true;
        this.curMaps.set(id, map);
        return this;
    }
    /**
     * Returns an array of all stored maps.
     * @author Hydrocynus
     * @date 28/11/2021
     * @returns {MCMap[]}
     * @memberof MapManager
     */
    getAll() {
        return [...this.allMaps.keys()];
    }
    /**
     * Returns an array of all selected maps.
     * @author Hydrocynus
     * @date 27/11/2021
     * @returns {MCMap[]}
     * @memberof MapManager
     */
    getAllCurrent() {
        return [...this.curMaps.values()];
    }
    /**
     * Returns the selected version of the passed map.
     * @author Hydrocynus
     * @date 28/11/2021
     * @param {MCMap} map MCMap to find the current selected version of.
     * @returns {MCMap}
     * @memberof MapManager
     */
    getCurrentOf(map) {
        const id = this.allMaps.get(map);
        if (id === undefined)
            throw new CustomError(Exception.MapNotFound, "The searched card has not been added yet");
        const curMap = this.curMaps.get(id);
        if (curMap === undefined)
            throw new CustomError(Exception.MapNotFound, "No current version has been selected yet for the transferred map");
        return curMap;
    }
}
