import parse5 from "parse5"
import htmlparser2 from "parse5-htmlparser2-tree-adapter"

const getSelectorsInNodes = node => {
    let selectors = []
    for (let childNode of node.children) {
        if (childNode.type === "tag") {
            let tag, classes = [], ids = []
            // add tag name
            tag = childNode.name
            // add classes names
            if (childNode.attribs) {
                if (childNode.attribs.class)
					classes = childNode.attribs.class.split(" ")
				Object.keys(childNode.attribs).forEach(attr => {
					if(attr.startsWith('class:')) {
						classes.push(attr.substring(6))
					}
				})
                if (childNode.attribs.id) ids = childNode.attribs.id.split(" ")
			}
			

            selectors = [
                ...selectors,
                tag,
                ...classes,
                ...ids,
                ...getSelectorsInNodes(childNode)
            ]
        } else if (childNode.type === "root") {
            selectors = [
                ...selectors,
                ...getSelectorsInNodes(childNode)
            ]
        }
    }
    return selectors;
}

class PurgeFromSvelte {
    static extract(content) {
        const tree = parse5.parse(content, {
            treeAdapter: htmlparser2
        })
        return getSelectorsInNodes(tree)
    }
}

export default PurgeFromSvelte
