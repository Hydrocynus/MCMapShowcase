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
 * provides information to MC map colors.
 * @author Hydrocynus
 * @version 21/11/2021
 * @since 20/11/2021
 * @class Colors
 */
class Colors {
    /**
     * Creates an instance of Colors.
     * @author Hydrocynus
     * @version 18/02/2022
     * @since 21/11/2021
     * @memberof Colors
     */
    constructor() {
        this.load();
        this._ready = false;
    }
    /**
     * All available colors.
     * @author Hydrocynus
     * @date 21/11/2021
     * @readonly
     * @type {Map<number, colorInfo>}
     * @memberof Colors
     */
    get colorMap() { return this._colorMap; }
    /**
     * Set true once colorMap is ready.
     * @author Hydrocynus
     * @date 21/11/2021
     * @readonly
     * @type {boolean}
     * @memberof Colors
     */
    get ready() { return this._ready; }
    /**
     * Gets called once colorMap finishes loading.
     * @author Hydrocynus
     * @date 21/11/2021
     * @memberof Colors
     */
    set onready(onready) { this._onready = onready; }
    /**
     * returns color properties of a id.
     * @author Hydrocynus
     * @version 18/02/2022 (Made synchonous)
     * @since 20/11/2021
     * @param {number} id
     * @returns {colorInfo}
     * @memberof Colors
     * @throws {ColorNotFoundException}
     */
    getByID(id) {
        const color = this._colorMap.get(id);
        if (color === undefined)
            throw new CustomError(Exception.ColorNotFound, `The color ID (${id}) was not found.`);
        return color;
    }
    /**
     * loads color properties from config file.
     * @author Hydrocynus
     * @version 18/02/2022
     * @since 20/11/2021
     * @private
     * @returns {Promise<Map<number, colorInfo>>}
     * @memberof Colors
     */
    load() {
        return __awaiter(this, void 0, void 0, function* () {
            this._ready = false;
            const json = yield fetch(Colors._url);
            const array = yield json.json();
            this._colorMap = new Map;
            array.forEach((color) => this._colorMap.set(color.ID, color));
            this._ready = true;
            if (this._onready !== undefined)
                this._onready();
            return this._colorMap;
        });
    }
}
/**
 * Path to colormap json file.
 * @author Hydrocynus
 * @version 21/11/2021
 * @since 20/11/2021
 * @private
 * @static
 * @type {string}
 * @memberof Colors
 */
Colors._url = "config/mcmapcolorids.json";
