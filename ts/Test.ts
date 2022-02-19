/**
 * @author Hydrocynus
 * @version 18/02/2022 (Removed await for MCMap.fromNBTData)
 * @since 21/11/2021
 * @param {HTMLInputElement} input
 */
async function onFileInput(input: HTMLInputElement) {
  if (!input) throw new CustomError(Exception.ElementNotFound, "The map input field was not passed on input");
  if (!input.files) throw new CustomError(Exception.EmptyFileInput, "The file input is empty - no files were selected");
  const files  = input.files;
  const mapManager = new MapManager;
  for (let file of files) {
    const nbtMap = await loadMapData(file);
    console.debug("nbtMap", nbtMap);
    const objMap = await NBTParser.parse(nbtMap);
    console.debug("objMap", objMap);
    const mcMap  = MCMap.fromNBTData(objMap);
    mapManager.add(mcMap);
    drawMap(mcMap);
  }
  console.debug("AllMaps", mapManager.getAll());
  console.debug("Current", mapManager.getAllCurrent());
  console.debug("Grid", mapManager.grid);

  // Test
}

/**
 * @author Hydrocynus
 * @date 21/11/2021
 * @param {File} file
 * @returns {Promise<Uint8Array>}
 */
async function loadMapData(file: File): Promise<Uint8Array> {
  const buffer  = await file.arrayBuffer();
  const array   = new Uint8Array(buffer)
  const mapdata = pako.inflate(array); // unzipping
  return mapdata;
}

/**
 * @author Hydrocynus
 * @date 21/11/2021
 * @param {MCMap} map
 */
function drawMap(map: MCMap) {
  const SIZE = 8;
  const pixels = map.pixels;
  const canvas = d3.select("canvas")
    .attr("width", pixels.length *SIZE + "px")
    .attr("height", pixels.length *SIZE + "px")
    .node();
  if (!canvas) throw new CustomError(Exception.ElementNotFound, "The canvas was not found");

  const c = (canvas as HTMLCanvasElement).getContext("2d");
  if (!c) throw new CustomError(Exception.CanvasNoContext, "No context could be obtained for the canvas");

  c.moveTo(0,0);
  for(let x=0; x<pixels.length; x++) {
    for (let y=0; y<pixels[x].length; y++) {
      if (pixels[x][y].color === "Transparent") {
        c.clearRect(x*SIZE, y*SIZE, SIZE, SIZE);
      } else {
        c.fillStyle = `rgb(${pixels[x][y].color})`;
        c.fillRect(x*SIZE, y*SIZE, SIZE, SIZE);
      }
    }
  }
}