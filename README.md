# **React Components**

## **Descriptions**

React Components for Figure and Offset.

## **Main Purpose**

Main purpose is to slowly port complex custom components over to React where development will be much more efficient as opposed to limiting ourselves to vanilla js/jQuery.

## **Usage(W.I.P Basic Concept)**

Via React: 
- Install the package: `$ npm i @offsetpartners/react-components`
- `require("@offsetpartners/react-components")` / `import Figure from "@offsetpartners/react-components";` || `import { COMPONENT_NAME } from "@offsetpartners/react-components";`

Via CDN Link:

```html
<!-- Make Sure to include these in the <head /> -->
<head>
    <link
      rel="stylesheet"
      href="https://unpkg.com/@offsetpartners/react-components@VERSION_NUMBER/dist/figure.css"
    />
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
    
    <script src="https://unpkg.com/@offsetpartners/react-components@VERSION_NUMBER/dist/figure.js"></script>
</body>
```

## **Development**

- Clone the repo:
  ` $ git clone https://github.com/offsetpartners/react-components.git`
- CD into Project Directory and run: `$ npm i` or `$ yarn start` to install deps
- Once all packages have been installed then simply run `$ npm run start` to start a [styleguidist](https://react-styleguidist.js.org/) server
- Then viola you're ready to play around with all the Components

Once done then viola

### **Version**

v. 0.1.0
