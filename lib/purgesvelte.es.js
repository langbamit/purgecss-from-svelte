import parse5 from 'parse5';
import htmlparser2 from 'parse5-htmlparser2-tree-adapter';

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

var getSelectorsInNodes = function getSelectorsInNodes(node) {
  var selectors = [];
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = node.children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var childNode = _step.value;

      if (childNode.type === "tag") {
        (function () {
          var tag = void 0,
              classes = [],
              ids = []; // add tag name

          tag = childNode.name; // add classes names

          if (childNode.attribs) {
            if (childNode.attribs.class) classes = childNode.attribs.class.split(" ");
            Object.keys(childNode.attribs).forEach(function (attr) {
              if (attr.startsWith('class:')) {
                classes.push(attr.substring(6));
              }
            });
            if (childNode.attribs.id) ids = childNode.attribs.id.split(" ");
          }

          selectors = [].concat(_toConsumableArray(selectors), [tag], _toConsumableArray(classes), _toConsumableArray(ids), _toConsumableArray(getSelectorsInNodes(childNode)));
        })();
      } else if (childNode.type === "root") {
        selectors = [].concat(_toConsumableArray(selectors), _toConsumableArray(getSelectorsInNodes(childNode)));
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return selectors;
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
      var tree = parse5.parse(content, {
        treeAdapter: htmlparser2
      });
      return getSelectorsInNodes(tree);
    }
  }]);

  return PurgeFromSvelte;
}();

export default PurgeFromSvelte;
