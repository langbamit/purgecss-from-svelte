import {Parser} from "htmlparser2";


class PurgeFromSvelte {
  static extract(content) {
    let selectors = [];

    let insideHeadTag = false;

    const should_ignore = tag => {
      if(insideHeadTag) return true;
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

    const parser = new Parser(
      {
        onopentag: (tag, attribs) => {
          if(tag === "head" || tag === "svelte:head") {
            insideHeadTag = true;
          }
          if (should_ignore(tag)) {
            return;
          }
          selectors.push(tag);
          if (attribs) {
            if (attribs.class) {
              const classes = attribs.class.match(/([\w\d-/:%.]+)/g) || [];
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
        },
        oncomment(comment) {
          if(insideHeadTag) return;
          if (comment.trim().startsWith('class:')) {
            comment
              .trim()
              .substring("class:".length)
              .split(",")
              .map(s => s.trim())
              .forEach(kclass => {
                if(kclass) {
                  selectors.push(kclass)
                } 
              });
          }
        },
        onclosetag(tag) {
          if(tag === "head" || tag === "svelte:head") {
            insideHeadTag = false;
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
