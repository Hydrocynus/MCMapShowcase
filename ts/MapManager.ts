/**
 *
 *
 * @author Tobias
 * @date 21.11.2021
 * @class MapManager
 */
class MapManager {
  /**
   *
   *
   * @author Tobias
   * @date 21.11.2021
   * @private
   * @type {Map<number, MCMap>}
   * @memberof MapManager
   */
  private curMaps: Map<number, MCMap>;

  /**
   *
   *
   * @author Tobias
   * @date 21.11.2021
   * @private
   * @type {Map<MCMap, number>}
   * @memberof MapManager
   */
  private allMaps: Map<MCMap, number>;

  /**
   *
   *
   * @author Tobias
   * @date 21.11.2021
   * @private
   * @type {number}
   * @memberof MapManager
   */
  private nextID: number = 1;

  /**
   * Creates an instance of MapManager.
   * @author Tobias
   * @date 21.11.2021
   * @memberof MapManager
   */
  constructor () {
    this.curMaps = new Map;
    this.allMaps = new Map;
  }

  /**
   *
   *
   * @author Tobias
   * @date 21.11.2021
   * @param {MCMap} map
   * @returns {this}
   * @memberof MapManager
   */
  add (map: MCMap): this {
    console.debug("add: allMaps | curMaps", this.allMaps, this.curMaps);
    let idToAddTo: number | undefined;
    this.allMaps.forEach((v,k) => {
      if (k.xCenter === map.xCenter && k.zCenter === map.zCenter) idToAddTo = v;
    });
    if (idToAddTo === undefined) {
      idToAddTo = this.nextID;
      this.nextID++;
      console.debug("adding map with new ID " + idToAddTo);
      this.allMaps.set(map, idToAddTo);
      this.curMaps.set(idToAddTo, map);
    } else {
      console.debug("adding map to ID " + idToAddTo);
      this.allMaps.set(map, idToAddTo);
    }

    console.debug("values", [...this.allMaps.values()])
    for (let id in [...this.allMaps.values()]) {
      console.debug("searching id", id, typeof id);
    }

    console.debug("add: allMaps | curMaps", this.allMaps, this.curMaps);
    return this;
  }

  /**
   *
   *
   * @author Tobias
   * @date 21.11.2021
   * @param {MCMap} map
   * @returns {this}
   * @memberof MapManager
   */
  remove (map: MCMap): this {
    console.debug("remove: allMaps | curMaps", this.allMaps, this.curMaps);
    const deletedID = this.allMaps.get(map);
    console.debug("deletedID", deletedID);
    if (deletedID) console.debug("cur?", this.curMaps.get(deletedID));
    this.allMaps.delete(map);
    if (deletedID && this.curMaps.get(deletedID) === map) {
      console.debug("removed map was current of ID " + deletedID);
      for (let id in [...this.allMaps.values()]) {
        console.debug("searching id", id, typeof id);
        if (id == deletedID + "") {
          // TODO: curMap neu zuordnen
        }
      }
    }
    console.debug("remove: allMaps | curMaps", this.allMaps, this.curMaps);
    return this;
  }
}