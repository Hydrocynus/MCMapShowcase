/**
 *
 *
 * @author Tobias
 * @date 20.11.2021
 * @class Pixel
 */
class Pixel {
  /**
   *
   *
   * @author Tobias
   * @date 20.11.2021
   * @private
   * @static
   * @type {string}
   * @memberof Pixel
   */
  private static defaultColor: string = "Transparent";

  /**
   *
   *
   * @author Tobias
   * @date 20.11.2021
   * @type {string}
   * @memberof Pixel
   */
  public color: string;

  /**
   *
   *
   * @author Tobias
   * @date 20.11.2021
   * @type {string}
   * @memberof Pixel
   */
  public tooltip: string;

  /**
   * Creates an instance of Pixel.
   * @author Tobias
   * @date 20.11.2021
   * @param {string} [color=Pixel.defaultColor]
   * @param {string} [tooltip=""]
   * @memberof Pixel
   */
  constructor (color: string = Pixel.defaultColor, tooltip: string = "") {
    this.color   = color;
    this.tooltip = tooltip;
  }

  /**
   *
   *
   * @author Tobias
   * @date 20.11.2021
   * @static
   * @param {number} id
   * @returns {Promise<Pixel>}
   * @memberof Pixel
   */
  static async fromID (id: number): Promise<Pixel> {
    try {
      const color = await Colors.getByID(id);
      return new Pixel(color.RGB, color.Blocks);
    } catch (e) {
      console.error(e);
      return new Pixel("255, 0, 0", `Error (${e})`);
    }
  }
}