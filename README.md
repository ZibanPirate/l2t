# l2t - Convert List into Tree

Elegantly Convert List into Tree

[![](https://img.shields.io/npm/v/l2t)](https://www.npmjs.com/package/l2t)
[![](https://img.shields.io/npm/dm/l2t)](https://www.npmjs.com/package/l2t)

[![Tests](https://github.com/ZibanPirate/l2t/workflows/Tests/badge.svg?branch=master)](https://github.com/ZibanPirate/l2t/actions?query=workflow%3ATests)
[![codecov](https://codecov.io/gh/ZibanPirate/l2t/branch/master/graph/badge.svg)](https://codecov.io/gh/ZibanPirate/l2t)

## Table of Content

- [l2t - Convert List into Tree](#l2t---convert-list-into-tree)
  - [Table of Content](#table-of-content)
  - [Get Started](#get-started)
    - [Install the package](#install-the-package)
    - [Use with Javascript](#use-with-javascript)
    - [Use with Typescript (rich typing support)](#use-with-typescript-rich-typing-support)
  - [Contributing](#contributing)
    - [Perquisites](#perquisites)
    - [Clone the repo](#clone-the-repo)
    - [Install dependencies](#install-dependencies)
    - [Run test suite](#run-test-suite)
  - [License](#license)

## Get Started

### Install the package

- from NPM

```sh
npm install l2t
```

- or from Yarn

```sh
yarn add l2t
```

### Use with Javascript

```js
import listToTree from "lt2"; // with ES6 syntax:
// const { listToTree } = require("lt2"); // or with CommonJS syntax:

// a simple list of 6 items, three of which are children
const simpleList = [
  { id: "1", label: "1" },
  { id: "2", label: "2", parentId: "1" },
  { id: "3", label: "3", parentId: "1" },
  { id: "4", label: "4" },
  { id: "5", label: "5" },
  { id: "6", label: "6", parentId: "5" },
];

// convert the simple list into a tree
const tree = listToTree(
  // the list
  simpleList,
  // a function returns id of the item
  // or a string name of the id field e.g. 'id'
  (item) => item.id,
  // a function returns id of the item's parent
  // or a string name of the parent id field e.g. 'parentId'
  (item) => item.parentId,
  // key for storing children items if there are any
  "children",
  // a mapper function to map the item to whatever object you like
  (item) => {
    return {
      label: `item-number-${item.label}`, // let's modify the label and prepend "item-number-"
      index: item.id, // let's change id to index
    };
  },
);

// output the result
console.log(JSON.stringify(tree, null, 2));
```

the result:

```json
[
  {
    "label": "item-number-1",
    "index": "1",
    "children": [
      {
        "label": "item-number-2",
        "index": "2",
        "children": []
      },
      {
        "label": "item-number-3",
        "index": "3",
        "children": []
      }
    ]
  },
  {
    "label": "item-number-4",
    "index": "4",
    "children": []
  },
  {
    "label": "item-number-5",
    "index": "5",
    "children": [
      {
        "label": "item-number-6",
        "index": "6",
        "children": []
      }
    ]
  }
]
```

### Use with Typescript (rich typing support)

```ts
import { listToTree } from "lt2";
// import listToTree from "lt2"; // or with default import:

// List Item interface
interface SimpleItem {
  id: string;
  label: string;
  parentId?: string;
}
// Tree Node interface
interface SimpleNode {
  index: string;
  label: string;
  children: SimpleNode[];
}

// a simple list of 6 items, three of which are children
const simpleList: SimpleItem[] = [
  { id: "1", label: "1" },
  { id: "2", label: "2", parentId: "1" },
  { id: "3", label: "3", parentId: "1" },
  { id: "4", label: "4" },
  { id: "5", label: "5" },
  { id: "6", label: "6", parentId: "5" },
];

// convert the simple list into a tree
const tree = listToTree<SimpleItem, SimpleNode>(
  simpleList,
  // a function returns id of the item
  // or a string name of the id field e.g. 'id'
  (item) => item.id,
  // a function returns id of the item's parent
  // or a string name of the parent id field e.g. 'parentId'
  (item) => item.parentId,
  // key for storing children items if there are any, note that when using typescript,
  // this key has to be one of the keys in the node interface (SimpleNode in this case)
  "children",
  // a mapper function to map the item to whatever object you like
  (item) => {
    return {
      label: `item-number-${item.label}`, // let's modify the label and prepend "item-number-"
      index: item.id, // let's change id to index
    };
  },
);
```

this will give you the same result as the Javascript version.

## Contributing

To get started see [the contributing guidelines](https://github.com/ZibanPirate/l2t/blob/master/.github/CONTRIBUTING.md).

**Unit test** :
Unit test are written in [Jest](https://jestjs.io/). Please add/edit unit test(s) for every new feature or bug fix. `yarn test` to run the test suite.

### Perquisites

Make sure you have:

- [git](https://git-scm.com/)
- [nodejs](https://nodejs.org/) 10 or higher
- [yarn](https://yarnpkg.com/)

### Clone the repo

```sh
git clone https://github.com/ZibanPirate/l2t.git
```

### Install dependencies

```sh
yarn
```

### Run test suite

- Run once

```sh
yarn test
```

- Run in watch mode

```sh
yarn test --watch
```

- Run in watch mode with coverage report

```sh
yarn test --watch --coverage
```

## License

Copyright (c) 2020 ZibanPirate (twitter: [@ZibanPirate](https://twitter.com/zibanpirate)) Licensed under the MIT license.
