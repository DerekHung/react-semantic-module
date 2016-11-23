'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.disableScroll = disableScroll;
exports.enableScroll = enableScroll;
exports.disableDocScroll = disableDocScroll;
exports.enableDocScroll = enableDocScroll;


var keys = { 37: 1, 38: 1, 39: 1, 40: 1 };

function preventDefault(e) {
	e = e || window.event;
	if (e.preventDefault) e.preventDefault();
	e.returnValue = false;
}

function preventDefaultForScrollKeys(e) {
	if (keys[e.keyCode]) {
		preventDefault(e);
		return false;
	}
}

function disableScroll() {
	if (window.addEventListener) // older FF
		window.addEventListener('DOMMouseScroll', preventDefault, false);
	window.onwheel = preventDefault; // modern standard
	window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
	window.ontouchmove = preventDefault; // mobile
	document.onkeydown = preventDefaultForScrollKeys;
}

function enableScroll() {
	if (window.removeEventListener) window.removeEventListener('DOMMouseScroll', preventDefault, false);
	window.onmousewheel = document.onmousewheel = null;
	window.onwheel = null;
	window.ontouchmove = null;
	document.onkeydown = null;
}

function disableDocScroll() {
	if (document.body) {
		document.body.style.overflow = "hidden";
	}
}

function enableDocScroll() {
	if (document.body) {
		document.body.style.overflow = "auto";
	}
}