# purgecss-from-svelte  
[![Build Status](https://travis-ci.org/langbamit/purgecss-from-svelte.svg?branch=master)](https://travis-ci.org/langbamit/purgecss-from-svelte)
[![CircleCi](https://circleci.com/gh/langbamit/purgecss-from-svelte/tree/master.svg?style=shield)]()
[![dependencies Status](https://david-dm.org/langbamit/purgecss-from-svelte/status.svg)](https://david-dm.org/langbamit/purgecss-from-svelte)
[![devDependencies Status](https://david-dm.org/langbamit/purgecss-from-svelte/dev-status.svg)](https://david-dm.org/langbamit/purgecss-from-svelte?type=dev)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/a711f39a6c2b44b2a4a55bd2a7a6c8cf)](https://www.codacy.com/app/langbamit/purgecss-from-svelte?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=langbamit/purgecss-from-svelte&amp;utm_campaign=Badge_Grade)
[![npm](https://img.shields.io/npm/v/purgecss-from-svelte.svg)](https://www.npmjs.com/package/purgecss-from-svelte)
[![license](https://img.shields.io/github/license/langbamit/purgecss-from-svelte.svg)]()

Get the selectors of an html file.

## Install

```
npm i -D purgecss-from-svelte
```

## Usage

### Use with Purgecss
```js
import Purgecss from "purgecss"
import purgeSvelte from "purgecss-from-svelte"
const purgeCss = new Purgecss({
    content: ["**/*.html"],
    css: ["**/*.css"],
    extractors: [
        {
            extractor: purgeSvelte,
            extensions: ["html"]
        }
    ]
})
const result = purgecss.purge()
```

### Use alone

```js
import purgeSvelte from "purgecss-from-svelte"
import fs from "fs"

const htmlContent = fs.readFileSync("index.html")
const htmlSelectors = purgeSvelte.extract(htmlContent)

```
