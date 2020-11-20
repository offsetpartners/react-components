# **React Components**

![npm (scoped)](https://img.shields.io/npm/v/@offsetpartners/react-components?style=for-the-badge) ![Travis (.org)](https://img.shields.io/travis/offsetpartners/react-components?style=for-the-badge)

## **Descriptions**

React Components for Figure and Offset.

## **Main Purpose**

Allows dev team to slowly port complex custom components over to React where development will be much more efficient.

## **Usage**

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
    href="https://unpkg.com/@offsetpartners/react-components@latest/dist/figure.css"
  />
</head>

<!-- Fetch via CDN Link -->
<body>
  <!-- For QueryBuilder -->
  <div id="fig-query-builder"></div>

  <!-- 
    For any props that need to be pass to the Component.
    This ALWAYS needs to be defined before the CDN Link
  -->
  <script type="text/javascript">
    FigureReact = {};
  </script>

  <!-- Make sure to include at the bottom of body to optimize load times -->

  <!-- Production React -->
  <script
    crossorigin
    src="https://unpkg.com/react@16/umd/react.production.min.js"
  ></script>
  <script
    crossorigin
    src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js"
  ></script>

  <script src="https://unpkg.com/@offsetpartners/react-components@latest/dist/figure.js"></script>
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

## **Reference Libraries**

- [AntDesign](https://ant.design/)
- [React Feather](https://github.com/feathericons/react-feather)

## **Roadmap**

- Remove certain packages from global library and add them on a per component basis??

### **Version**

v. 0.6.1
