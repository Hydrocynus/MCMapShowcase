"use strict";
var Exception;
(function (Exception) {
    Exception["ColorNotFound"] = "ColorNotFoundException";
    Exception["NBTParse"] = "NBTParseException";
    Exception["ElementNotFound"] = "ElementNotFoundException";
    Exception["EmptyFileInput"] = "EmptyFileInputException";
    Exception["CanvasNoContext"] = "CanvasNoContextException";
})(Exception || (Exception = {}));
