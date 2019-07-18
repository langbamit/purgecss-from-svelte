'use strict';

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

var Parser = require("./Parser.js");

var DomHandler = require("domhandler");

function defineProp(name, value) {
  delete module.exports[name];
  module.exports[name] = value;
  return value;
}

module.exports = {
  Parser: Parser,
  Tokenizer: require("./Tokenizer.js"),
  ElementType: require("domelementtype"),
  DomHandler: DomHandler,

  get FeedHandler() {
    return defineProp("FeedHandler", require("./FeedHandler.js"));
  },

  get Stream() {
    return defineProp("Stream", require("./Stream.js"));
  },

  get WritableStream() {
    return defineProp("WritableStream", require("./WritableStream.js"));
  },

  get ProxyHandler() {
    return defineProp("ProxyHandler", require("./ProxyHandler.js"));
  },

  get DomUtils() {
    return defineProp("DomUtils", require("domutils"));
  },

  get CollectingHandler() {
    return defineProp("CollectingHandler", require("./CollectingHandler.js"));
  },

  // For legacy support
  DefaultHandler: DomHandler,

  get RssHandler() {
    return defineProp("RssHandler", this.FeedHandler);
  },

  //helper methods
  parseDOM: function (data, options) {
    var handler = new DomHandler(options);
    new Parser(handler, options).end(data);
    return handler.dom;
  },
  parseFeed: function (feed, options) {
    var handler = new module.exports.FeedHandler(options);
    new Parser(handler, options).end(feed);
    return handler.dom;
  },
  createDomStream: function (cb, options, elementCb) {
    var handler = new DomHandler(cb, options, elementCb);
    return new Parser(handler, options);
  },
  // List of all events that the parser emits
  EVENTS: {
    /* Format: eventname: number of arguments */
    attribute: 2,
    cdatastart: 0,
    cdataend: 0,
    text: 1,
    processinginstruction: 2,
    comment: 1,
    commentend: 0,
    closetag: 1,
    opentag: 2,
    opentagname: 1,
    error: 1,
    end: 0
  }
};

var should_ignore = function should_ignore(tag) {
  if (tag.startsWith("svelte:")) {
    return true;
  }

  if (tag == "script" || tag == "style") {
    return true;
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
      var parser = new undefined({
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
        lowerCaseAttributeNames: false
      });
      parser.write(content);
      parser.end();
      return _toConsumableArray(new Set(selectors));
    }
  }]);

  return PurgeFromSvelte;
}();

module.exports = PurgeFromSvelte;
