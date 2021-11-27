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
 * A MC Map Pixel
 * @author Hydrocynus
 * @date 20/11/2021
 * @class Pixel
 */
class Pixel {
    /**
     * Creates an instance of Pixel.
     * @author Hydrocynus
     * @date 20/11/2021
     * @param {string} [color=Pixel.defaultColor]
     * @param {string} [tooltip=""]
     * @memberof Pixel
     */
    constructor(color = Pixel.defaultColor, tooltip = "") {
        this.color = color;
        this.tooltip = tooltip;
    }
    /**
     * Returns a new pixel object based on the color information of an id.
     * @author Hydrocynus
     * @date 20/11/2021
     * @static
     * @param {number} id Color ID. (See class Colors).
     * @returns {Promise<Pixel>}
     * @memberof Pixel
     */
    static fromID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const color = yield Colors.getByID(id);
                return new Pixel(color.RGB, color.Blocks);
            }
            catch (e) {
                console.error(e);
                return new Pixel("255, 0, 0", `Error (${e})`);
            }
        });
    }
}
/**
 * Provides the default color value.
 * @author Hydrocynus
 * @date 20/11/2021
 * @private
 * @static
 * @type {string}
 * @memberof Pixel
 */
Pixel.defaultColor = "Transparent";
