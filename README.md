# sql-web-app

This is a dummy application to run SQL queries, we have implemented the logic in this way that you can perform some SQL queries like select and delete on customers and products tabele apart from that we have also added a drop-down that have some pre-definded queries.

Vue version - In this we are using Vue 3 with composition API.

npm Dependencies - [CodeMirror](https://www.npmjs.com/package/codemirror), [vue-router](https://v3.router.vuejs.org/guide/),
[vue3-pagination](https://www.npmjs.com/package/@hennge/vue3-pagination), [axios](https://www.npmjs.com/package/axios)

CSS Library - [Tailwind](https://tailwindcss.com/)

## Demo
Netlify URL - [https://silly-pithivier-d247e6.netlify.app/](https://silly-pithivier-d247e6.netlify.app/)

## Features
- Code editor where you can run some sql queries
- Dropdown in which we have some pre-defined queries
- Clear button to clear editor
- Exceute query button that run queries that are write in code editor
- On Home page we have "Go to Products Api page", where we are displaying dynamic data with lazy loading and pagination.

## Web application details
In this we have 2 tables customers and products that I have stored statically in data.json file.
We can perform the following queries in this dummy web app -
- show tables - Display table names
- Select * from table_name - Display all data from table
- Select * from table_name where stock > 50 - Display all data from table where stock is more than 50 (Here we can select any combination from any table to display data such as id = 2, email = john@example.com)
- Select name, email from table_name where city is Delhi - Display name and email column from table where city is delhi. (Here we can select any column combination from any table to display data such name, email, id, city).
- Delete * from table_name where id = 2 - Delete data from any table based on id or any other field like country, age, city.

Note - Replace table_name with actual table name (customers or products)

- To render a large amount of rows we can lazy load the component, use infinite scrolling or we can also use pagination.
In this web app, we have /apiData route where we fetched products data from dummy json api and display with pagination.


## Page loading report
Measured by Google Chrome Lighthouse
[Image](https://ibb.co/740HYGV)

Optimisations to enhance loading time -
- Add meta description for SEO
- Added lang in HTML tag
- Update color contrast to enhance accessibility

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)

## Tech Stack

**Client:** [Vue3](https://vuejs.org/), [Javascript](https://www.javascript.com/)

**Code Formatter** [Eslint](https://eslint.org/)

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## Author
Trishant Kumar (trishantshishodia@gmail.com)
