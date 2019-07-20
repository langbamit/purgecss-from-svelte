# purgecss-from-svelte

[![Build Status](https://travis-ci.org/langbamit/purgecss-from-svelte.svg?branch=master)](https://travis-ci.org/langbamit/purgecss-from-svelte)
[![CircleCi](https://circleci.com/gh/langbamit/purgecss-from-svelte/tree/master.svg?style=shield)]()
[![dependencies Status](https://david-dm.org/langbamit/purgecss-from-svelte/status.svg)](https://david-dm.org/langbamit/purgecss-from-svelte)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/a711f39a6c2b44b2a4a55bd2a7a6c8cf)](https://www.codacy.com/app/langbamit/purgecss-from-svelte?utm_source=github.com&utm_medium=referral&utm_content=langbamit/purgecss-from-svelte&utm_campaign=Badge_Grade)
[![npm](https://img.shields.io/npm/v/purgecss-from-svelte.svg)](https://www.npmjs.com/package/purgecss-from-svelte)
[![license](https://img.shields.io/github/license/langbamit/purgecss-from-svelte.svg)]()

Get the selectors of an Svelte3 file.

## Install

```
npm i -D purgecss-from-svelte
```

## Usage

### Use with Purgecss - PostCSS

```js
import Purgecss from "purgecss";
import PurgeSvelte from "purgecss-from-svelte";

const options = {
  content: ["./src/**/*.svelte"],
  extractors: [
    {
      extractor: PurgeSvelte,
      extensions: ["svelte"]
    }
  ]
};

/* Purgecss */
const purgecss = new Purgecss(options);
const result = purgecss.purge();

/* PostCSS */
{
  plugins: [require("@fullhuman/postcss-purgecss")(options)];
}
```

### Use alone

```js
import PurgeSvelte from "purgecss-from-svelte";
import fs from "fs";

const htmlContent = fs.readFileSync("index.html");
const selectors = PurgeSvelte.extract(htmlContent);
```
