const main = function() {
  loadColorMap("mcmapcolorids.json");
}();

async function loadColorMap(url) {
  const json = await fetch(url);
  let array  = await json.json();

  //Setting color Map
  window.colorMap = new Map();
  array.forEach(color => colorMap.set(color.ID, color));
}

async function fileChange(input) {
  const file    = input.files[0];
  const mapdata = await loadMapData(file);
  const colors  = extractColors(mapdata);
  const map     = processColors(colors);
  displayMap(map);
}

async function loadMapData(file) {
  const buffer = await new Promise(resolve => { // waiting for FileReader
    const reader  = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.readAsArrayBuffer(file);
  })
  const array   = new Uint8Array(buffer)
  const mapdata = pako.inflate(array); // unzipping
  return mapdata;
}

function extractColors(mapdata) {
  //searching for start of colors array
  const matchingSet = [0x07, 0x00, 0x06, 0x63, 0x6F, 0x6C, 0x6F, 0x72, 0x73, 0x00];
  let matchingPos = 0;
  let colors;
  for (var i=0; i<mapdata.length; i++) {
    if (matchingPos === 9) break;
    if (mapdata[i] === matchingSet[matchingPos]) matchingPos++;
    else matchingPos = 0;
  }

  //identifying length of colors array
  const length = Array.from(mapdata.slice(i, i+4))
                  .map((n,i) => n*Math.pow(16, 4-i))
                  .reduce((p,c) => p+c);
  colors = mapdata.slice(i+4, i+4+length);

  return colors;
}

class Cell {
  constructor (id, name, rgb, blocks) {
    this.id    = id;
    this.name  = name;
    this.rgb   = rgb;
    this.blocks = blocks;
  }

  static fromColorMapEntry (colorMapEntry) {
    const c = colorMapEntry;
    return new Cell(c.ID, c.Name, c.RGB, c.Blocks);
  }

  setX (x) {
    this.x = x;
    return this;
  }

  setY (y) {
    this.y = y;
    return this;
  }
}

function processColors(colors) {
  const width = Math.sqrt(colors.length); //width of square map
  const map2D = [];
  for (let i=0; i<width; i++) {
    map2D.push([]);
    for (let j=0; j<width; j++) {
      map2D[i].push(colors[i+j*width]);
    }
  }

  return map2D.map(
    (row, y) => row.map(
      (id, x) => Cell.fromColorMapEntry(colorMap.get(id))
                     .setX(x)
                     .setY(y)
    )
  );
}

function displayMap(map) {
  const SIZE = 8;
  const svg = d3.select("svg");
  svg
    .attr("width", map.length *SIZE + "px")
    .attr("height", map.length *SIZE + "px")
    .selectAll("g")
    .data(map)
    .join("g")
      .selectAll("rect")
      .data(d => d)
      .join("rect")
        .attr("x", d => d.x*SIZE)
        .attr("y", d => d.y*SIZE)
        .attr("width", SIZE)
        .attr("height", SIZE)
        .on("mouseover", (e,d) => d3.select("#lookingAt").text(d.blocks))
        .on("mouseout", () => d3.select("#lookingAt").text(""))
        .style("fill", d => {
          if (d.rgb === "Transparent") return "transparent";
          return `rgb(${d.rgb})`;
        });
}



function printIntArray2D(array) {
  let out = "";
  const set = new Set();
  for (let i=0; i<array.length; i++) {
    for (let j=0; j<array[i].length; j++) {
      let cell = array[i][j] + "";
      set.add(cell);
      while(cell.length < 3) cell = " " + cell;
      out += cell + "|";
    }
    out += "\n";
  }
  console.log(set, out);
}

function printHexArray(array) {
  let out = "\n00 01 02 03 04 05 06 07 08 09 0A 0B 0C 0D 0E 0F ";
  out    += "\n----------------------------------------------- ";
  for (let i=0; i<array.length; i+=16) {
    out += "\n";
    for (let j=0; j<16 && (j+i)<array.length; j++) {
      let byte = Math.abs(array[i+j]);
      byte     = byte.toString(16);
      byte     = byte.toUpperCase();
      while(byte.length < 2) byte = 0 + byte;
      byte    += " ";
      out     += byte;
    }
  }
  console.log(out);
}