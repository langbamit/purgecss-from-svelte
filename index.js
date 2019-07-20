import { default as htmlparser2 } from "htmlparser2";

const should_ignore = tag => {
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

class PurgeFromSvelte {
  static extract(content) {
    let selectors = [];
    const parser = new htmlparser2.Parser(
      {
        onopentag: (tag, attribs) => {
          if (should_ignore(tag)) {
            return;
          }
          selectors.push(tag);
          if (attribs) {
            if (attribs.class) {
              const classes = attribs.class.match(/[A-Za-z0-9-_:/]+/g) || [];
              selectors = selectors.concat(classes);
            }

            Object.keys(attribs).forEach(attr => {
              if (attr.startsWith("class:")) {
                selectors.push(attr.substring("class:".length));
              }
            });
            if (attribs.id) {
              selectors.push(attribs.id);
            }
          }
        }
      },
      {
        decodeEntities: true,
        lowerCaseAttributeNames: false,
        lowerCaseTags: false
      }
    );
    parser.write(content);
    parser.end();
    return [...new Set(selectors)];
  }
}

export default PurgeFromSvelte;
