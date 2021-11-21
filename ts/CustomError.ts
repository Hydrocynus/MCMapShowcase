/**
 *
 *
 * @author Tobias
 * @date 21.11.2021
 * @class CustomError
 * @extends {Error}
 */
class CustomError extends Error {
  constructor (name: Exception, message: string) {
    super();
    this.message = message;
    this.name    = name;
  }
}