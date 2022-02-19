"use strict";
/**
 * Representation of a MC map.
 * @author Hydrocynus
 * @version 28/11/2021
 * @since 20/11/2021
 * @class MCMap
 */
class MCMap {
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
    constructor(pixels, size, xCenter, zCenter, raw) {
        this.pixels = pixels;
        this.size = size;
        this.xCenter = xCenter;
        this.zCenter = zCenter;
        this.raw = raw;
    }
    /**
     * Returns a new MC map object from parsed NBT data.
     * @author Hydrocynus
     * @version 18/02/2022 (Removed async.)
     * @since 20/11/2021
     * @static
     * @param {NBTMap} map NBT data as parsed object.
     * @returns {MCMap}
     * @memberof MCMap
     */
    static fromNBTData(map) {
        const mapdata = map.value.data.value;
        const pixels1D = mapdata.colors.value;
        const pixels2D = [];
        const size = Math.sqrt(pixels1D.length);
        const xCenter = mapdata.xCenter.value;
        const zCenter = mapdata.zCenter.value;
        for (let x = 0; x < size; x++) {
            pixels2D.push([]);
            for (let y = 0; y < size; y++) {
                let id = pixels1D[x + y * size];
                if (id < 0)
                    id += 256;
                const pixel = Pixel.fromID(id);
                pixels2D[x].push(pixel);
            }
        }
        return new MCMap(pixels2D, size, xCenter, zCenter, map);
    }
}
