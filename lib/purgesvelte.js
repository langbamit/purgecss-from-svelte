'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var htmlparser2 = _interopDefault(require('htmlparser2'));

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  }
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

var should_ignore = function should_ignore(tag) {
  if (tag.length) {
    if (tag[0] === tag[0].toUpperCase()) {
      return true;
    }

    if (tag.startsWith("svelte:")) {
      return true;
    }

    if (tag == "script" || tag == "style") {
      return true;
    }
  }

  return false;
};

var PurgeFromSvelte =
/*#__PURE__*/
function () {
  function PurgeFromSvelte() {
    _classCallCheck(this, PurgeFromSvelte);
  }

  _createClass(PurgeFromSvelte, null, [{
    key: "extract",
    value: function extract(content) {
      var selectors = [];
      var parser = new htmlparser2.Parser({
        onopentag: function onopentag(tag, attribs) {
          if (should_ignore(tag)) {
            return;
          }

          selectors.push(tag);

          if (attribs) {
            if (attribs.class) {
              var classes = attribs.class.match(/[A-Za-z0-9-_:/]+/g) || [];
              selectors = selectors.concat(classes);
            }

            Object.keys(attribs).forEach(function (attr) {
              if (attr.startsWith("class:")) {
                selectors.push(attr.substring("class:".length));
              }
            });

            if (attribs.id) {
              selectors.push(attribs.id);
            }
          }
        }
      }, {
        decodeEntities: true,
        lowerCaseAttributeNames: false,
        lowerCaseTags: false
      });
      parser.write(content);
      parser.end();
      return _toConsumableArray(new Set(selectors));
    }
  }]);

  return PurgeFromSvelte;
}();

module.exports = PurgeFromSvelte;
