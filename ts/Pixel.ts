/**
 * A MC Map Pixel
 * @author Hydrocynus
 * @version 19/02/2022
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
  private static _defaultColor: string = "Transparent";

  /**
   * color object for color reference.
   * @author Hydrocynus
   * @date 28/11/2021
   * @private
   * @static
   * @type {Colors}
   * @memberof Pixel
   */
  private static _colors: Colors = new Colors();

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
  constructor (color: string = Pixel._defaultColor, tooltip: string = "") {
    this.color   = color;
    this.tooltip = tooltip;
  }

  /**
   * Returns a new pixel object based on the color information of an id.
   * @author Hydrocynus
   * @version 18/02/2022 (Removed async)
   * @since 20/11/2021
   * @static
   * @param {number} id Color ID. (See class Colors).
   * @returns {Pixel}
   * @memberof Pixel
   */
  static fromID (id: number): Pixel {
    if (!this._colors.ready) return Pixel.fromID(id);
    try {
      const color = this._colors.getByID(id);
      return new Pixel(color.RGB, color.Blocks);
    } catch (e) {
      console.error(e);
      return new Pixel("255, 0, 255", `Error (${e})`);
    }
  }

  /**
   * Reloads the colorMap from file.
   * @author Hydrocynus
   * @date 19/02/2022
   * @static
   * @memberof Pixel
   */
  static refreshColors() {
    this._colors = new Colors();
  }
}