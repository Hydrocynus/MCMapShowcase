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
 * @class Colors
 */
class Colors {
    /**
     *
     *
     * @author Tobias
     * @date 20.11.2021
     * @static
     * @returns {Promise<Map<number, colorInfo>>}
     * @memberof Colors
     */
    static get() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.colorMap === undefined)
                yield this.loadColorMap();
            return this.colorMap;
        });
    }
    /**
     *
     *
     * @author Tobias
     * @date 20.11.2021
     * @static
     * @param {number} id
     * @returns {Promise<colorInfo>}
     * @memberof Colors
     * @throws {ColorNotFoundException}
     */
    static getByID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const color = (yield this.get()).get(id);
            if (color === undefined)
                throw new CustomError(Exception.ColorNotFound, `The color ID (${id}) was not found.`);
            return color;
        });
    }
    /**
     *
     *
     * @author Tobias
     * @date 20.11.2021
     * @private
     * @static
     * @returns {Promise<Map<number, colorInfo>>}
     * @memberof Colors
     */
    static loadColorMap() {
        return __awaiter(this, void 0, void 0, function* () {
            const json = yield fetch(this.url);
            const array = yield json.json();
            this.colorMap = new Map();
            array.forEach((color) => this.colorMap.set(color.ID, color));
            return this.colorMap;
        });
    }
}
/**
 *
 *
 * @author Tobias
 * @date 20.11.2021
 * @private
 * @static
 * @type {string}
 * @memberof Colors
 */
Colors.url = "config/mcmapcolorids.json";
