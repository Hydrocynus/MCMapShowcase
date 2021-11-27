/**
 * extension to the native Error class to use custom Exception names.
 * @author Hydrocynus
 * @date 21/11/2021
 * @class CustomError
 * @extends {Error}
 */
class CustomError extends Error {
  /**
   * Creates an instance of CustomError.
   * @author Hydrocynus
   * @date 21/11/2021
   * @param {Exception} name Name of the Exception. (See Exception enum)
   * @param {string} message Description of the Exception.
   * @memberof CustomError
   */
  constructor (name: Exception, message: string) {
    super();
    this.message = message;
    this.name    = name;
  }
}