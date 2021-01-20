import PurgesSvelte from "../index.js"
import test_list from "./test_list"

test_list.forEach(([name, input, expected]) => {
    test(name, () => {
        expect(PurgesSvelte.extract(input).sort()).toEqual(expected)
    })
});
