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
 * @since 20.11.2021
 * @version 21.11.2021
 * @class NBTParser
 */
class NBTParser {
    /**
     *
     *
     * @author Tobias
     * @since 20.11.2021
     * @version 21.11.2021
     * @static
     * @param {Uint8Array} data
     * @returns {Promise<NBTResult>}
     * @memberof NBTLoader
     * @throws {NBTParseException}
     */
    static parse(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new Promise((resolve, reject) => {
                nbt.parse(data, (error, result) => {
                    if (error) {
                        error.name = Exception.NBTParse;
                        reject(error);
                    }
                    else
                        resolve(result);
                });
            });
        });
    }
}
