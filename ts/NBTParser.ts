declare var nbt: {
  parse: (
    data: ArrayBuffer,
    callback: (
      error: Error,
      result: NBTResult
    ) => void
  ) => void
}

/**
 * Generic header of a NBT-Tag.
 * @author Hydrocynus
 * @date 20/11/2021
 * @interface NBTTag
 * @template T The actual data type depends on the type attribute of the NBT-Tag.
 */
interface NBTTag<T> {
  type:  string,
  value: T
}

/**
 * Generic structure of NBT data.
 * @author Hydrocynus
 * @date 21/11/2021
 * @interface NBTData
 */
interface NBTData {
  data: NBTTag<any>
}

/**
 * Header of NBT data.
 * @author Hydrocynus
 * @version 21/11/2021 (Replaced template type for value with NBTData)
 * @since 20/11/2021
 * @interface NBTResult
 */
interface NBTResult {
  name: string,
  value: NBTData
}

/**
 * Parses NBT data.
 * @author Hydrocynus
 * @since 20/11/2021
 * @version 21/11/2021
 * @class NBTParser
 */
class NBTParser {
  /**
   * Returns an object of the NBT data provided as a byte array.
   * @author Hydrocynus
   * @version 21/11/2021
   * @since 20/11/2021
   * @static
   * @param {Uint8Array} data
   * @returns {Promise<NBTResult>}
   * @memberof NBTLoader
   * @throws {NBTParseException}
   */
  static async parse (data: Uint8Array): Promise<NBTResult> {
    return await new Promise((resolve, reject) => {
      nbt.parse(data, (error: Error, result: NBTResult) => {
        if (error) {
          error.name = Exception.NBTParse;
          reject(error);
        }
        else resolve(result);
      });
    });
  }
}