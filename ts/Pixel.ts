/**
 * A MC Map Pixel
 * @author Hydrocynus
 * @version 28/11/2021
 * @since 20/11/2021
 * @class Pixel
 */
class Pixel {
  /**
   * Provides the default color value.
   * @author Hydrocynus
   * @date 20/11/2021
   * @private
   * @static
   * @type {string}
   * @memberof Pixel
   */
  private static defaultColor: string = "Transparent";

  /**
   * Stores the color of the pixel as RGB value "R, G, B".
   * @author Hydrocynus
   * @date 20/11/2021
   * @type {string}
   * @memberof Pixel
   */
  public color: string;

  /**
   * Stores a tooltip for the pixel.
   * @author Hydrocynus
   * @date 20/11/2021
   * @type {string}
   * @memberof Pixel
   */
  public tooltip: string;

  /**
   * Creates an instance of Pixel.
   * @author Hydrocynus
   * @date 20/11/2021
   * @param {string} [color=Pixel.defaultColor]
   * @param {string} [tooltip=""]
   * @memberof Pixel
   */
  constructor (color: string = Pixel.defaultColor, tooltip: string = "") {
    this.color   = color;
    this.tooltip = tooltip;
  }

  /**
   * Returns a new pixel object based on the color information of an id.
   * @author Hydrocynus
   * @version 28/11/2021 (Changed color of unknown IDs to magenta.)
   * @since 20/11/2021
   * @static
   * @param {number} id Color ID. (See class Colors).
   * @returns {Promise<Pixel>}
   * @memberof Pixel
   */
  static async fromID (id: number): Promise<Pixel> {
    try {
      const color = await Colors.getByID(id);
      return new Pixel(color.RGB, color.Blocks);
    } catch (e) {
      console.error(e);
      return new Pixel("255, 0, 255", `Error (${e})`);
    }
  }
}