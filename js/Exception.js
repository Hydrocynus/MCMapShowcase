"use strict";
/**
 * Fixed Exception names.
 * @author Hydrocynus
 * @version 27/11/2021
 * @since 21/11/2021
 * @enum {number}
 */
var Exception;
(function (Exception) {
    Exception["ColorNotFound"] = "ColorNotFoundException";
    Exception["NBTParse"] = "NBTParseException";
    Exception["ElementNotFound"] = "ElementNotFoundException";
    Exception["EmptyFileInput"] = "EmptyFileInputException";
    Exception["CanvasNoContext"] = "CanvasNoContextException";
    Exception["MapNotFound"] = "MapNotFoundException";
})(Exception || (Exception = {}));
