## 👨🏾‍💻 Project documentation.
The developed proposal is a roulette that consumes a public api.

<h2> 🍸 Endpoints </h2>
To access the endpoints collection via postman <a href="https://www.getpostman.com/collections/f5269a63bdf0d1434a50" target="_blank"> click here . </a>

To access the endpoints documentation via swagger, just access the root endpoint, example: (http://localhost:3333/)

<h2> 🍸 Automated tests </h2>
To run the automated tests on the api, you can run the following command inside the api:

```bash
$ node ace test
```

<h2> 🍸 Build Setup </h2>

```bash
# Create containers, the api will open on port 3333 while the web_app will be on port 3000
$ docker-compose up --build

# go to paste
$ cd api

# Create your .env file using .env.example as an example

# Install Dependencies
$ yarn install

# Create database structure
$ node ace migration:run
$ node ace db:seed
```

If you want to run the api and frontend locally without docker, you can run the following command sequence:

<h3> <li> Create container database  </li></h3>

```bash
$ docker-compose up th-gaming-database
```

<h3> <li> Go to API folder  </li></h3>

```bash
$ cd api
```
<h3> <li> Create your .env file using .env.example as an example  </li></h3>

<h3> <li> Create database structure (PS: If you have already run this command before, you do not need to run it again.)  </li></h3>

```bash
$ node ace migration:run
$ node ace db:seed
```

<h3> <li> Install Dependencies  </li></h3>

```bash
$ yarn install
```

<h3> <li> Run for development  </li></h3>

```bash
$ yarn dev
```

<h3> <li> Run for production  </li></h3>

```bash
$ yarn build
$ yarn start
```

<h3> <li> Go to web_app folder  </li></h3>

```bash
$ cd ../web_app
```

<h3> <li> Install Dependencies  </li></h3>

```bash
$ yarn install
```

<h3> <li> Run for development  </li></h3>

```bash
$ yarn dev
```

<h3> <li> Run for production  </li></h3>

```bash
$ yarn build
$ yarn start
```

<h3> <li> (Optional) Generate Static Project  </li></h3>

```bash
$ yarn generate
```
## 👨🏾‍💻 Techs

<h3> Front-end </h3>

<ul>
  <li> Vue.js </li>
  <ul>
    <li> <a href="https://github.com/championswimmer/vuex-module-decorators"> Vuex-module-decorators </a> </li>
    <li> <a href="https://www.npmjs.com/package/lottie-vuejs"> Lottie Vue </a> </li>
  </ul>
  <li> Vuetify.js </li>
  <li> Nuxt.js </li>
  <ul>
    <li> <a href="https://go.nuxtjs.dev/axios"> Axios </a> </li>
    <li> <a href="https://github.com/nuxt-community/router-module"> Router </a> </li>
    <li> <a href="https://www.npmjs.com/package/cookie-universal-nuxt"> Cookie-Universal </a> </li>
    <li> <a href="https://www.npmjs.com/package/@nuxtjs/toast"> Toast </a> </li>
  </ul>
  <li> Typescript </li>
</ul>

<h3> Backend </h3>
<ul>
  <li> Node.js </li>
  <li> Adonis.js </li>
  <ul>
    <li> <a href="https://docs.adonisjs.com/guides/auth/introduction"> Auth </a> </li>
    <li> <a href="https://docs.adonisjs.com/guides/authorization"> Authorization </a> </li>
    <li> <a href="https://docs.adonisjs.com/guides/database/introduction"> Lucid ORM </a> </li>
    <li> <a href="https://docs.adonisjs.com/guides/views/introduction"> Views & Templates </a> </li>
  </ul>
  <li> Typescript </li>
</ul>

## 👤 Author

<h3> <b> Waliston Belles </b></h3>

<li> Github: <a href="https://github.com/WalistonBelles">Waliston Belles</a> </li>
<li> Linkedin: <a href="https://www.linkedin.com/in/waliston-belles-88927a212/"> Waliston Belles</a> </li>
<li> Discord:  Waliston#0145</a></li>
<br>
