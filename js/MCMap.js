"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/**
 *
 *
 * @author Tobias
 * @date 20.11.2021
 * @class MCMap
 */
class MCMap {
    /**
     * Creates an instance of MCMap.
     * @author Tobias
     * @date 20.11.2021
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
     *
     *
     * @author Tobias
     * @date 20.11.2021
     * @static
     * @param {NBTMap} map
     * @returns {Promise<MCMap>}
     * @memberof MCMap
     */
    static fromNBTData(map) {
        return __awaiter(this, void 0, void 0, function* () {
            const mapdata = map.value.data.value;
            const pixels1D = mapdata.colors.value;
            const pixels2D = [];
            const size = Math.sqrt(pixels1D.length);
            const xCenter = mapdata.xCenter.value;
            const zCenter = mapdata.zCenter.value;
            for (let x = 0; x < size; x++) {
                pixels2D.push([]);
                for (let y = 0; y < size; y++) {
                    const pixel = yield Pixel.fromID(pixels1D[x + y * size]);
                    pixels2D[x].push(pixel);
                }
            }
            return new MCMap(pixels2D, size, xCenter, zCenter, map);
        });
    }
}
