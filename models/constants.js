/**
 * Created by emielPC on 15/11/16.
 */

function define(name, value) {
    Object.defineProperty(exports, name, {
        value:      value,
        enumerable: true
    });
}

define("MALE", 1);
define("FEMALE", 2);