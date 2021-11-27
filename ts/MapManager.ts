/**
 * Stores and indexes all maps.
 * @author Hydrocynus
 * @version 27/11/2021
 * @since 21/11/2021
 * @class MapManager
 */
class MapManager {
  /**
   * Notes which version of a perticular map is currently selected.
   * @author Hydrocynus
   * @date 21/11/2021
   * @private
   * @type {Map<number, MCMap>}
   * @memberof MapManager
   */
  private curMaps: Map<number, MCMap>;

  /**
   * Groups maps with the same coordinates together and assigns an ID to each.
   * @author Hydrocynus
   * @date 21/11/2021
   * @private
   * @type {Map<MCMap, number>}
   * @memberof MapManager
   */
  private allMaps: Map<MCMap, number>;

  /**
   * Provides next available id.
   * @author Hydrocynus
   * @date 21/11/2021
   * @private
   * @type {number}
   * @memberof MapManager
   */
  private nextID: number = 1;

  /**
   * Creates an instance of MapManager.
   * @author Hydrocynus
   * @date 21/11/2021
   * @memberof MapManager
   */
  constructor () {
    this.curMaps = new Map;
    this.allMaps = new Map;
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
  add (map: MCMap): this {
    let idToAddTo: number | undefined;
    for (let n of this.allMaps) {
      if (n[0].xCenter !== map.xCenter || n[0].zCenter !== map.zCenter) continue;
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
  remove (map: MCMap): this {
    const idToDeleteFrom = this.allMaps.get(map);
    if (idToDeleteFrom === undefined) return this;
    this.allMaps.delete(map);
    if (this.curMaps.get(idToDeleteFrom) !== map) return this;
    for (let n of this.allMaps) {
      if (n[1] !== idToDeleteFrom) continue;
      this.curMaps.set(idToDeleteFrom, n[0]);
      break;
    }
    if (this.curMaps.get(idToDeleteFrom) === map) this.curMaps.delete(idToDeleteFrom);
    return this;
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
  select (map: MCMap): this {
    const id = this.allMaps.get(map);
    if (id === undefined) throw new CustomError(Exception.MapNotFound, "A map must first be added to be selected");
    this.curMaps.set(id, map);
    return this;
  }
}