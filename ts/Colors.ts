/**
 * Properties of a MC map color.
 * @author Hydrocynus
 * @version 28/11/2021 (Added obligatory attribute Name.)
 * @since 20/11/2021
 * @interface colorInfo
 */
 interface colorInfo {
  ID: number,
  RGB: string,
  Blocks: string,
  Name?: string,
}

/**
 * provides information to MC map colors.
 * @author Hydrocynus
 * @version 18/02/2022
 * @since 20/11/2021
 * @class Colors
 */
 class Colors {
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
  private static _url: string = "config/mcmapcolorids.json";

  /**
   * All available colors.
   * @author Hydrocynus
   * @version 21/11/2021
   * @since 20/11/2021
   * @private
   * @type {Map<number, colorInfo>}
   * @memberof Colors
   */
  private _colorMap!: Map<number, colorInfo>;

  /**
   * Set true once colorMap is ready.
   * @author Hydrocynus
   * @date 21/11/2021
   * @private
   * @type {boolean}
   * @memberof Colors
   */
  private _ready: boolean;

  /**
   * Gets called once colorMap finishes loading.
   * @author Hydrocynus
   * @date 21/11/2021
   * @private
   * @type {Function}
   * @memberof Colors
   */
  private _onready?: Function;

  /**
   * Creates an instance of Colors.
   * @author Hydrocynus
   * @version 18/02/2022
   * @since 21/11/2021
   * @memberof Colors
   */
  constructor () {
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
  get colorMap (): Map<number, colorInfo> { return this._colorMap; }

  /**
   * Set true once colorMap is ready.
   * @author Hydrocynus
   * @date 21/11/2021
   * @readonly
   * @type {boolean}
   * @memberof Colors
   */
  get ready (): boolean { return this._ready; }

  /**
   * Gets called once colorMap finishes loading.
   * @author Hydrocynus
   * @date 21/11/2021
   * @memberof Colors
   */
  set onready (onready: Function) { this._onready = onready; }

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
  getByID (id: number): colorInfo {
    const color = this._colorMap.get(id);
    if (color === undefined) throw new CustomError(Exception.ColorNotFound, `The color ID (${id}) was not found.`);
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
  private async load (): Promise<Map<number, colorInfo>> {
    this._ready    = false;
    const json     = await fetch(Colors._url);
    const array    = await json.json();
    this._colorMap = new Map;
    array.forEach((color: colorInfo) => this._colorMap.set(color.ID, color));
    this._ready    = true;
    if (this._onready !== undefined) this._onready();
    return this._colorMap;
  }
}