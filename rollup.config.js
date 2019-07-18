import babel from "rollup-plugin-babel"
import resolve from "rollup-plugin-node-resolve"

export default {
    input: "index.js",
    output: [
        {
            file: "lib/purgesvelte.es.js",
            format: "es"
        },
        {
            file: "lib/purgesvelte.js",
            format: "cjs"
        }
    ],
    plugins: [
        resolve(),
        babel()
    ],
    external: ["htmlparser2"]
}
