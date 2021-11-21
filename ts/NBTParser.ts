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
 *
 *
 * @author Tobias
 * @date 20.11.2021
 * @interface NBTTag
 * @template T
 */
 interface NBTTag<T> {
  type:  string,
  value: T
}

/**
 *
 *
 * @author Tobias
 * @date 21.11.2021
 * @interface NBTData
 */
interface NBTData {
  data: NBTTag<any>
}

/**
 *
 *
 * @author Tobias
 * @version 21.11.2021 (Replaced template type for value with NBTData)
 * @since 20.11.2021
 * @interface NBTResult
 */
interface NBTResult {
  name: string,
  value: NBTData
}

/**
 *
 *
 * @author Tobias
 * @since 20.11.2021
 * @version 21.11.2021
 * @class NBTParser
 */
class NBTParser {
  /**
   *
   *
   * @author Tobias
   * @version 21.11.2021
   * @since 20.11.2021
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