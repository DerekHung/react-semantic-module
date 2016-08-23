"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
function makeid(length, counter) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }return text + counter;
}

exports.default = makeid;