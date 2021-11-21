"use strict";
class CustomError extends Error {
    constructor(name, message) {
        super();
        this.message = message;
        this.name = name;
    }
}
