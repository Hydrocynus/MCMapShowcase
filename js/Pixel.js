"use strict";
/**
 * A MC Map Pixel
 * @author Hydrocynus
 * @version 28/11/2021
 * @since 20/11/2021
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
    constructor(color = Pixel._defaultColor, tooltip = "") {
        this.color = color;
        this.tooltip = tooltip;
    }
    /**
     * Returns a new pixel object based on the color information of an id.
     * @author Hydrocynus
     * @version 18/02/2022 (Removed async)
     * @since 20/11/2021
     * @static
     * @param {number} id Color ID. (See class Colors).
     * @returns {Pixel}
     * @memberof Pixel
     */
    static fromID(id) {
        if (!this._colors.ready)
            return Pixel.fromID(id);
        try {
            const color = this._colors.getByID(id);
            return new Pixel(color.RGB, color.Blocks);
        }
        catch (e) {
            console.error(e);
            return new Pixel("255, 0, 255", `Error (${e})`);
        }
    }
    /**
     * Reloads the colorMap from file.
     * @author Hydrocynus
     * @date 19/02/2022
     * @static
     * @memberof Pixel
     */
    static refreshColors() {
        this._colors = new Colors();
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
Pixel._defaultColor = "Transparent";
/**
 * color object for color reference.
 * @author Hydrocynus
 * @date 20/11/2021
 * @private
 * @static
 * @type {Colors}
 * @memberof Pixel
 */
Pixel._colors = new Colors();
