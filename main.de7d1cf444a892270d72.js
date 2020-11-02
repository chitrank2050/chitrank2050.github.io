/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(1);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(2)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getTarget = function (target, parent) {
  if (parent){
    return parent.querySelector(target);
  }
  return document.querySelector(target);
};

var getElement = (function (fn) {
	var memo = {};

	return function(target, parent) {
                // If passing function in options, then use it for resolve "head" element.
                // Useful for Shadow Root style i.e
                // {
                //   insertInto: function () { return document.querySelector("#foo").shadowRoot }
                // }
                if (typeof target === 'function') {
                        return target();
                }
                if (typeof memo[target] === "undefined") {
			var styleTarget = getTarget.call(this, target, parent);
			// Special case to return head of iframe instead of iframe itself
			if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[target] = styleTarget;
		}
		return memo[target]
	};
})();

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(3);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
        if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertAt.before, target);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}

	if(options.attrs.nonce === undefined) {
		var nonce = getNonce();
		if (nonce) {
			options.attrs.nonce = nonce;
		}
	}

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function getNonce() {
	if (false) {}

	return __webpack_require__.nc;
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = typeof options.transform === 'function'
		 ? options.transform(obj.css) 
		 : options.transform.default(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 3 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./src/scss/main.scss
var main = __webpack_require__(0);

// CONCATENATED MODULE: ./src/views/app.template.js
var appTemplate = function appTemplate(_ref) {
  var header = _ref.header,
      items = _ref.items,
      cart = _ref.cart;
  return "\n".concat(header, "\n<section class=\"container__fluid\" id=\"main_wrapper\">\n    <div class=\"container__row\">\n        <div class=\"container__col-12 container__col-md-9\">\n            <div class=\"container__fluid\">\n                <div class=\"container__row\">\n                    ").concat(items, "\n                </div>\n            </div>\n        </div>\n        ").concat(cart, "\n    </div>\n</section>\n");
};
// CONCATENATED MODULE: ./src/views/app.model.js
var DummyData = {
  items: [{
    id: "0",
    name: 'Samsung Series 4',
    image: 'https://rukminim1.flixcart.com/image/670/600/allinone-desktop/d/n/q/apple-imac-21-5-inch-4k-retina-core-i5-3-1ghz-8gb-1tb-intel-iris-original-imaeh5h83fuzbksz.jpeg?q=90',
    price: {
      actual: 13999,
      display: 22500
    },
    discount: 37
  }, {
    id: "1",
    name: 'Samsung Series 6',
    image: 'https://rukminim1.flixcart.com/image/670/600/allinone-desktop/d/n/q/apple-imac-21-5-inch-4k-retina-core-i5-3-1ghz-8gb-1tb-intel-iris-original-imaeh5h83fuzbksz.jpeg?q=90',
    price: {
      actual: 35999,
      display: 66900
    },
    discount: 46
  }, {
    id: "2",
    name: 'Samsung The Frame',
    image: 'https://rukminim1.flixcart.com/image/670/600/allinone-desktop/d/n/q/apple-imac-21-5-inch-4k-retina-core-i5-3-1ghz-8gb-1tb-intel-iris-original-imaeh5h83fuzbksz.jpeg?q=90',
    price: {
      actual: 84999,
      display: 133900
    },
    discount: 36
  }, {
    id: "3",
    name: 'LG Ultra HD',
    image: 'https://rukminim1.flixcart.com/image/670/600/allinone-desktop/d/n/q/apple-imac-21-5-inch-4k-retina-core-i5-3-1ghz-8gb-1tb-intel-iris-original-imaeh5h83fuzbksz.jpeg?q=90',
    price: {
      actual: 39990,
      display: 79990
    },
    discount: 50
  }, {
    id: "4",
    name: 'Koryo Android TV',
    image: 'https://rukminim1.flixcart.com/image/670/600/allinone-desktop/d/n/q/apple-imac-21-5-inch-4k-retina-core-i5-3-1ghz-8gb-1tb-intel-iris-original-imaeh5h83fuzbksz.jpeg?q=90',
    price: {
      actual: 55999,
      display: 199990
    },
    discount: 71
  }, {
    id: "5",
    name: 'MicroMax LED SMART',
    image: 'https://rukminim1.flixcart.com/image/670/600/allinone-desktop/d/n/q/apple-imac-21-5-inch-4k-retina-core-i5-3-1ghz-8gb-1tb-intel-iris-original-imaeh5h83fuzbksz.jpeg?q=90',
    price: {
      actual: 9999,
      display: 27990
    },
    discount: 64
  }]
};
// CONCATENATED MODULE: ./src/store.service.js
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var StoreService = /*#__PURE__*/function () {
  function StoreService() {
    _classCallCheck(this, StoreService);

    if (!StoreService.instance) {
      this.cart = [];
      this.summary = {
        totalQuantity: 0,
        totalPrice: 0,
        totalAfterDiscount: 0,
        typeDiscount: 0
      };
      StoreService.instance = this;
    }

    return StoreService.instance;
  }

  _createClass(StoreService, [{
    key: "addTocart",
    value: function addTocart(item) {
      var _found = this.cart.findIndex(function (e) {
        return e.id == item.id;
      });

      console.log('>ADDTO ITEM', this.cart, item, _found);

      if (_found !== -1) {
        var _foundItem = this.cart[_found];
        this.cart.splice(_found, 1, this.updateCart(_found, _foundItem, _foundItem.qty + 1, item.price));
      } else {
        this.cart.push(this.updateCart(0, item, 1, item.price));
      }

      this.refreshStore();
    }
  }, {
    key: "updateQuantity",
    value: function updateQuantity(item) {
      console.log('>REMOVE FROM CART', item);

      var _found = this.cart.findIndex(function (e) {
        return e.id == item.id;
      });

      if (_found !== -1) {
        var _foundItem = this.cart[_found];
        this.cart.splice(_found, 1, this.updateCart(_found, _foundItem, _foundItem.qty-- > 0 ? _foundItem.qty-- : 0, item.price));
        this.refreshStore();
      }
    }
  }, {
    key: "updateCart",
    value: function updateCart(index, item, qty, price) {
      return _objectSpread(_objectSpread({}, item), {}, {
        qty: qty,
        calculatedPrice: qty * price.display,
        calculatedAfterDiscount: qty * price.actual
      });
    }
  }, {
    key: "refreshStore",
    value: function refreshStore() {
      Object.assign(this.summary, this.cart.reduce(function (a, b) {
        return {
          totalQuantity: a.totalQuantity + b.qty,
          totalPrice: a.totalPrice + b.calculatedPrice,
          totalAfterDiscount: a.totalAfterDiscount + b.calculatedAfterDiscount,
          typeDiscount: a.typeDiscount
        };
      }, {
        totalQuantity: 0,
        totalPrice: 0,
        totalAfterDiscount: 0,
        typeDiscount: 0
      }));
    }
  }]);

  return StoreService;
}();

var instance = new StoreService();
Object.freeze(instance);
/* harmony default export */ var store_service = (instance);
// CONCATENATED MODULE: ./src/views/header/header.template.js
var headerTemplate = function headerTemplate() {
  return "\n  <section class=\"container__fluid header-section\">\n    <div class=\"container__row\">\n      <div class=\"container__col-sm-12 container__col-md-2\">\n        <h6>All Items</h6>\n      </div>\n      <div class=\"hamburger-icon\">\n        <div></div>\n        <div></div>\n        <div></div>\n      </div>\n      <!--\n      <div class=\"container__col-sm-12 container__col-md-8 text-center\">\n        <Button class=\"primaryButton\">Item2 is added to cart</Button>\n      </div> -->\n    </div>\n  </section>\n";
};
// CONCATENATED MODULE: ./src/views/header/header.component.js

var HeaderComponent = {
  render: function render() {
    return headerTemplate();
  }
};
// CONCATENATED MODULE: ./src/views/item/item.template.js
var itemTemplate = function itemTemplate(_ref) {
  var id = _ref.id,
      name = _ref.name,
      image = _ref.image,
      _ref$price = _ref.price,
      actual = _ref$price.actual,
      display = _ref$price.display,
      discount = _ref.discount;
  return "\n<div class=\"container__col-12 container__col-lg-4 container__col-md-6\">\n  <div id=\"card-tile\">\n    <div class=\"card_image\" style=\"background-image: url(".concat(image, ");\">\n      <span>").concat(discount, "&#37; off</span>\n    </div>\n    <div class=\"card_body\">\n      <div class=\"container__row\">").concat(name, "</div>\n      <div class=\"container__row\">\n        <div class=\"price_wrapper\">\n          <span class=\"actual_price\">&#x20B9;").concat(display, "</span>\n          <span class=\"discounted_price\">&#x20B9;").concat(actual, "</span>\n        </div>\n        <button class=\"outlineButton\" data-id=").concat(id, ">Add to cart</button>\n      </div>\n    </div>\n  </div>\n</div>\n");
};
// CONCATENATED MODULE: ./src/views/item/item.component.js

var ItemCommponent = {
  render: function render(item) {
    return itemTemplate(item);
  }
};
// CONCATENATED MODULE: ./src/views/cart/cart_item.template.js
var cartItemTemplate = function cartItemTemplate(_ref) {
  var id = _ref.id,
      name = _ref.name,
      qty = _ref.qty,
      calculatedPrice = _ref.calculatedPrice;
  return "\n  <tr>\n    <td>".concat(name, "</td>\n    <td>\n        <div class=\"input-group\">\n            <input type=\"button\" value=\"-\" class=\"button-minus\" data-field=\"quantity\" data-id=").concat(id, ">\n            <input type=\"number\" step=\"1\" max=\"\" value=").concat(qty, " name=\"quantity\" class=\"quantity-field\" readOnly>\n            <input type=\"button\" value=\"+\" class=\"button-plus\" data-field=\"quantity\" data-id=").concat(id, ">\n        </div>\n    </td>\n    <td>&#x20B9;").concat(calculatedPrice, "</td>\n  </tr>\n");
};
// CONCATENATED MODULE: ./src/views/cart/cart_summary.template.js
var cartSummaryTemplate = function cartSummaryTemplate(_ref) {
  var totalQuantity = _ref.totalQuantity,
      totalPrice = _ref.totalPrice,
      totalAfterDiscount = _ref.totalAfterDiscount,
      typeDiscount = _ref.typeDiscount;
  return "\n<section id=\"cart-total-section\">\n    <div class=\"container__row\">Total</div>\n    <table>\n        <tr>\n            <td>Items(".concat(totalQuantity, ")</td>\n            <td>:</td>\n            <td>&#x20B9;").concat(totalPrice, "</td>\n        </tr>\n        <tr>\n            <td>Discount</td>\n            <td>:</td>\n            <td>&#x20B9;").concat(totalAfterDiscount - totalPrice, "</td>\n        </tr>\n        <tr>\n            <td>Type Discount</td>\n            <td>:</td>\n            <td>&#x20B9;").concat(typeDiscount, "</td>\n        </tr>\n    </table>\n    <table>\n        <tr>\n            <td>Order Total</td>\n            <td>:</td>\n            <td>&#x20B9;").concat(totalAfterDiscount, "</td>\n        </tr>\n    </table>\n</section>\n");
};
// CONCATENATED MODULE: ./src/views/cart/cart.template.js
var cartTemplate = function cartTemplate(_ref) {
  var cartSection = _ref.cartSection,
      totalSection = _ref.totalSection;
  return "\n <div class=\"container__col-md-3 cart-section\">\n    <section id=\"cart-items-section\">\n        <table class=\"striped\">\n            <thead>\n                <tr>\n                    <th>Items</th>\n                    <th>Qty</th>\n                    <th>Price</th>\n                </tr>\n            </thead>\n            <tbody>\n              ".concat(cartSection, "\n            </tbody>\n        </table>\n    </section>\n    ").concat(totalSection, "\n</div>\n");
};
// CONCATENATED MODULE: ./src/views/cart/cart.component.js




var CartComponent = {
  render: function render() {
    var _cartItem = store_service.cart.map(function (e) {
      return cartItemTemplate(e);
    }).join('');

    var _cartSummary = cartSummaryTemplate(store_service.summary);

    return cartTemplate({
      cartSection: _cartItem,
      totalSection: _cartSummary
    });
  }
};
// CONCATENATED MODULE: ./src/views/app.component.js






var AppComponent = {
  init: function init() {
    this.appElement = document.querySelector('#app');
    this.initEvents();
    this.render();
  },
  initEvents: function initEvents() {
    var _this = this;

    this.appElement.onclick = function (event) {
      if (event.target.className === 'outlineButton' || event.target.className === 'button-plus') {
        store_service.addTocart(DummyData.items.find(function (e) {
          return e.id == event.target.dataset.id;
        }));

        _this.render();
      }

      if (event.target.className === 'button-minus') {
        store_service.updateQuantity(DummyData.items.find(function (e) {
          return e.id == event.target.dataset.id;
        }));

        _this.render();
      }
    };
  },
  render: function render() {
    var items = DummyData.items;

    var _itemsList = DummyData.items.map(function (e) {
      return ItemCommponent.render(e);
    }).join('');

    this.appElement.innerHTML = appTemplate({
      header: HeaderComponent.render(),
      items: _itemsList,
      cart: CartComponent.render()
    });
  }
};
// CONCATENATED MODULE: ./src/views/app.module.js

var App = {
  init: function init() {
    this.initComponents();
  },
  initComponents: function initComponents() {
    AppComponent.init();
  } // initServiceWorker() {
  //     if (!navigator.serviceWorker) {
  //         return;
  //     }
  //     navigator.serviceWorker
  //         .register('./sw.js')
  //         .then(() => {
  //             console.log('sw registered successfully!');
  //         })
  //         .catch((error) => {
  //             console.log('Some error while registering sw:', error);
  //         });
  // }

};
// CONCATENATED MODULE: ./src/main.js


App.init();

/***/ })
/******/ ]);