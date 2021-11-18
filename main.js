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
    const colors  = await extractColors(mapdata);
    const map     = processColors(colors);
    drawMap(map);
}

async function loadMapData(file) {
  const buffer = await file.arrayBuffer();
  const array   = new Uint8Array(buffer)
  const mapdata = pako.inflate(array); // unzipping
  return mapdata;
}

async function extractColors(mapdata) {
  const data = await new Promise((resolve, reject) => {
    nbt.parse(mapdata, (error, data) => {
      if (error) reject(error);
      else resolve(data);
    });
  });
  const colors = data.value.data.value.colors.value;
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
    const c = colorMapEntry || {ID: 0, Name: "NONE", RGB: "Tranparent", Blocks: "Bad Pixel"};
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
        .attr("data-blocks", d => d.blocks)
        .on("mouseover", (e,d) => d3.select("#lookingAt").text(d.blocks))
        .on("mouseout", () => d3.select("#lookingAt").text(""))
        .style("fill", d => {
          if (d.rgb === "Transparent") return "transparent";
          return `rgb(${d.rgb})`;
        });
}

function drawMap(map) {
  const SIZE = 8;
  const canvas = d3.select("canvas")
    .attr("width", map.length *SIZE + "px")
    .attr("height", map.length *SIZE + "px")
    .node();
  const c = canvas.getContext("2d");
  c.moveTo(0,0);
  for(let x=0; x<map.length; x++) {
    for (let y=0; y<map[x].length; y++) {
      if (map[x][y].rgb === "Transparent") {
        c.clearRect(x*SIZE, y*SIZE, SIZE, SIZE);
      } else {
        c.fillStyle = `rgb(${map[x][y].rgb})`;
        c.fillRect(x*SIZE, y*SIZE, SIZE, SIZE);
      }
    }
  }
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