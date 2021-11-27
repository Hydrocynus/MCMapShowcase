/**
 * MC map coordinates.
 * @author Hydrocynus
 * @date 20/11/2021
 * @interface NBTMapPos
 */
interface NBTMapPos {
  X: NBTTag<number>,
  Y: NBTTag<number>,
  Z: NBTTag<number>,
}

/**
 * MC map banner info.
 * @author Hydrocynus
 * @date 20/11/2021
 * @interface NBTMapBanner
 */
interface NBTMapBanner {
  Color?: NBTTag<string>,
  Name?:  NBTTag<string>,
  Pos?:   NBTTag<NBTMapPos>
}

/**
 * MC map frame info.
 * @author Hydrocynus
 * @date 20/11/2021
 * @interface NBTMapFrame
 */
interface NBTMapFrame {
  EntityId?: NBTTag<number>,
  Rotation?: NBTTag<number>,
  Pos?:      NBTTag<NBTMapPos>,
}

/**
 * All possible and partly required information of a MC map.
 * @author Hydrocynus
 * @date 21/11/2021
 * @interface NBTMapData
 * @extends {NBTData}
 */
interface NBTMapData extends NBTData {
  data:         NBTTag<{
    scale:              NBTTag<number>,
    dimension?:         NBTTag<string>,
    trackingPosition?:  NBTTag<number>,
    unlimitedTracking?: NBTTag<number>,
    locked?:            NBTTag<number>,
    xCenter:            NBTTag<number>,
    zCenter:            NBTTag<number>,
    banners?:           NBTTag<NBTMapBanner[]>,
    frames?:            NBTTag<NBTMapFrame[]>,
    colors:             NBTTag<number[]>,
  }>,
  DataVersion?: NBTTag<number>
}

/**
 * Header of a MC map.
 * @author Hydrocynus
 * @version 21/11/2021 (Outsourced NBTMapData for attribute value)
 * @since 20/11/2021
 * @interface NBTMap
 */
interface NBTMap {
  name: string,
  value: NBTMapData
}

/**
 * Representation of a MC map.
 * @author Hydrocynus
 * @date 20/11/2021
 * @class MCMap
 */
class MCMap {
  /**
   * The array with all pixels of the map.
   * @author Hydrocynus
   * @date 20/11/2021
   * @private
   * @type {Pixel[][]}
   * @memberof MCMap
   */
  pixels: Pixel[][];

  /**
   * Size of the map.
   * @author Hydrocynus
   * @date 20/11/2021
   * @private
   * @type {number}
   * @memberof MCMap
   */
  size: number;

  /**
   * X-center coordinate of the map.
   * @author Hydrocynus
   * @date 20/11/2021
   * @private
   * @type {number}
   * @memberof MCMap
   */
  xCenter: number;

  /**
   * Z-center coordinate of the map.
   * @author Hydrocynus
   * @date 20/11/2021
   * @private
   * @type {number}
   * @memberof MCMap
   */
  zCenter: number;

  /**
   * All information in one object.
   * @author Hydrocynus
   * @date 20/11/2021
   * @private
   * @type {object}
   * @memberof MCMap
   */
  raw: object;

  /**
   * Creates an instance of MCMap.
   * @author Hydrocynus
   * @date 20/11/2021
   * @param {Pixel[][]} pixels
   * @param {number} size
   * @param {number} xCenter
   * @param {number} zCenter
   * @param {NBTMap} raw
   * @memberof MCMap
   */
  constructor (pixels: Pixel[][], size: number, xCenter: number, zCenter: number, raw: NBTMap) {
    this.pixels  = pixels;
    this.size    = size;
    this.xCenter = xCenter;
    this.zCenter = zCenter;
    this.raw     = raw;
  }

  /**
   * Returns a new MC map object from parsed NBT data.
   * @author Hydrocynus
   * @date 20/11/2021
   * @static
   * @param {NBTMap} map NBT data as parsed object.
   * @returns {Promise<MCMap>}
   * @memberof MCMap
   */
  static async fromNBTData (map: NBTMap): Promise<MCMap> {
    const mapdata             = map.value.data.value;
    const pixels1D: number[]  = mapdata.colors.value;
    const pixels2D: Pixel[][] = [];
    const size:     number    = Math.sqrt(pixels1D.length);
    const xCenter:  number    = mapdata.xCenter.value;
    const zCenter:  number    = mapdata.zCenter.value;

    for (let x=0; x<size; x++) {
      pixels2D.push([]);
      for (let y=0; y<size; y++) {
        const pixel = await Pixel.fromID(pixels1D[x+y*size]);
        pixels2D[x].push(pixel);
      }
    }

    return new MCMap(pixels2D, size, xCenter, zCenter, map);
  }
}