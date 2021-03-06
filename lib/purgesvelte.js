'use strict';

var htmlparser2 = require('htmlparser2');

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
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var PurgeFromSvelte = /*#__PURE__*/function () {
  function PurgeFromSvelte() {
    _classCallCheck(this, PurgeFromSvelte);
  }

  _createClass(PurgeFromSvelte, null, [{
    key: "extract",
    value: function extract(content) {
      var selectors = [];
      var insideHeadTag = false;

      var should_ignore = function should_ignore(tag) {
        if (insideHeadTag) return true;

        if (tag.length) {
          // Ignore svelte Component tag
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

      var parser = new htmlparser2.Parser({
        onopentag: function onopentag(tag, attribs) {
          if (tag === "head" || tag === "svelte:head") {
            insideHeadTag = true;
          }

          if (should_ignore(tag)) {
            return;
          }

          selectors.push(tag);

          if (attribs) {
            if (attribs.class) {
              var classes = attribs.class.match(/([\w\d-/:%.]+)/g) || [];
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
        },
        oncomment: function oncomment(comment) {
          if (insideHeadTag) return;

          if (comment.trim().startsWith('class:')) {
            comment.trim().substring("class:".length).split(",").map(function (s) {
              return s.trim();
            }).forEach(function (kclass) {
              if (kclass) {
                selectors.push(kclass);
              }
            });
          }
        },
        onclosetag: function onclosetag(tag) {
          if (tag === "head" || tag === "svelte:head") {
            insideHeadTag = false;
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
