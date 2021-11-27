/**
 * Properties of a MC map color.
 * @author Hydrocynus
 * @date 20/11/2021
 * @interface colorInfo
 */
interface colorInfo {
  ID: number,
  RGB: string,
  Blocks: string
}

/**
 * provides information to MC map colors.
 * @author Hydrocynus
 * @version 21/11/2021
 * @since 20/11/2021
 * @class Colors
 */
class Colors {
  /**
   * Stores color properties to every color id.
   * @author Hydrocynus
   * @date 20/11/2021
   * @private
   * @static
   * @type {Map<number, colorInfo>}
   * @memberof Colors
   */
  private static colorMap: Map<number, colorInfo>;

  /**
   * path to config file.
   * @author Hydrocynus
   * @date 20/11/2021
   * @private
   * @static
   * @type {string}
   * @memberof Colors
   */
  private static url: string = "config/mcmapcolorids.json";

  /**
   * returns all color properties.
   * @author Hydrocynus
   * @date 20/11/2021
   * @static
   * @returns {Promise<Map<number, colorInfo>>}
   * @memberof Colors
   */
  static async get (): Promise<Map<number, colorInfo>> {
    if (this.colorMap === undefined) await this.loadColorMap();
    return this.colorMap;
  }

  /**
   * returns color properties of a id.
   * @author Hydrocynus
   * @version 21/11/2021 (Implemented CustomError)
   * @since 20/11/2021
   * @static
   * @param {number} id
   * @returns {Promise<colorInfo>}
   * @memberof Colors
   * @throws {ColorNotFoundException}
   */
  static async getByID (id: number): Promise<colorInfo> {
    const color = (await this.get()).get(id);
    if (color === undefined) throw new CustomError(Exception.ColorNotFound, `The color ID (${id}) was not found.`);
    return color;
  }

  /**
   * loads color properties from config file.
   * @author Hydrocynus
   * @date 20/11/2021
   * @private
   * @static
   * @returns {Promise<Map<number, colorInfo>>}
   * @memberof Colors
   */
  private static async loadColorMap (): Promise<Map<number, colorInfo>> {
    const json    = await fetch(this.url);
    const array   = await json.json();
    this.colorMap = new Map();
    array.forEach((color: colorInfo) => this.colorMap.set(color.ID, color));
    return this.colorMap;
  }
}