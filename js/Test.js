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
 * @author Hydrocynus
 * @version 28/11/2021
 * @since 21/11/2021
 * @param {HTMLInputElement} input
 */
function onFileInput(input) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!input)
            throw new CustomError(Exception.ElementNotFound, "The map input field was not passed on input");
        if (!input.files)
            throw new CustomError(Exception.EmptyFileInput, "The file input is empty - no files were selected");
        const files = input.files;
        const mapManager = new MapManager;
        for (let file of files) {
            const nbtMap = yield loadMapData(file);
            console.debug("nbtMap", nbtMap);
            const objMap = yield NBTParser.parse(nbtMap);
            console.debug("objMap", objMap);
            const mcMap = yield MCMap.fromNBTData(objMap);
            mapManager.add(mcMap);
            drawMap(mcMap);
        }
        console.debug("AllMaps", mapManager.getAll());
        console.debug("Current", mapManager.getAllCurrent());
        console.debug("Grid", mapManager.grid);
    });
}
/**
 * @author Hydrocynus
 * @date 21/11/2021
 * @param {File} file
 * @returns {Promise<Uint8Array>}
 */
function loadMapData(file) {
    return __awaiter(this, void 0, void 0, function* () {
        const buffer = yield file.arrayBuffer();
        const array = new Uint8Array(buffer);
        const mapdata = pako.inflate(array); // unzipping
        return mapdata;
    });
}
/**
 * @author Hydrocynus
 * @date 21/11/2021
 * @param {MCMap} map
 */
function drawMap(map) {
    const SIZE = 8;
    const pixels = map.pixels;
    const canvas = d3.select("canvas")
        .attr("width", pixels.length * SIZE + "px")
        .attr("height", pixels.length * SIZE + "px")
        .node();
    if (!canvas)
        throw new CustomError(Exception.ElementNotFound, "The canvas was not found");
    const c = canvas.getContext("2d");
    if (!c)
        throw new CustomError(Exception.CanvasNoContext, "No context could be obtained for the canvas");
    c.moveTo(0, 0);
    for (let x = 0; x < pixels.length; x++) {
        for (let y = 0; y < pixels[x].length; y++) {
            if (pixels[x][y].color === "Transparent") {
                c.clearRect(x * SIZE, y * SIZE, SIZE, SIZE);
            }
            else {
                c.fillStyle = `rgb(${pixels[x][y].color})`;
                c.fillRect(x * SIZE, y * SIZE, SIZE, SIZE);
            }
        }
    }
}
