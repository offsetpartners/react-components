# **React Components**

![npm (scoped)](https://img.shields.io/npm/v/@offsetpartners/react-components?style=for-the-badge) ![Travis (.org)](https://img.shields.io/travis/offsetpartners/react-components?style=for-the-badge)

## **Descriptions**

React Components for Figure and Offset.

## **Main Purpose**

Main purpose is to slowly port complex custom components over to React where development will be much more efficient as opposed to limiting ourselves to vanilla js/jQuery.

## **Usage(W.I.P Basic Concept)**

Via React:

- Install the package:

```properties
$ npm i @offsetpartners/react-components
```

- Import Package

```properties
require("@offsetpartners/react-components");
--- or ---
import Figure from "@offsetpartners/react-components";
--- or ---
import { COMPONENT_NAME } from "@offsetpartners/react-components";
```

Via CDN Link:

```html
<!-- Make Sure to include these in the <head /> -->
<head>
  <!-- This is for Bundled CSS file -->
  <link
    rel="stylesheet"
    href="https://unpkg.com/@offsetpartners/react-components@VERSION_NUMBER/dist/figure.css"
  />

  <!-- Production React -->
  <script
    crossorigin
    src="https://unpkg.com/react@16/umd/react.production.min.js"
  ></script>
  <script
    crossorigin
    src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js"
  ></script>
</head>

<!-- Fetch via CDN Link -->
<body>
  <!-- For QueryBuilder -->
  <div id="fig-query-builder"></div>

  <!-- Make sure to include at the bottom of body to optimize load times -->
  <script src="https://unpkg.com/@offsetpartners/react-components@VERSION_NUMBER/dist/figure.js"></script>
</body>
```

## **Development**

- Clone the repo:

```properties
git clone https://github.com/offsetpartners/react-components.git
```

- CD into Project Directory and run to install deps:

```properties
npm i
```

- Once all packages have been installed then simply run to start a [styleguidist](https://react-styleguidist.js.org/) server

```properties
npm run start
```

- Then viola you're ready to play around with all the Components

## **Roadmap**

- Remove certain packages from global library and add them on a per component basis??
- Add prop to add aditional Columns into ResultTable
- Create different Column Components for ResultTable to increase "customizability"

### **Version**

v. 0.2.0
