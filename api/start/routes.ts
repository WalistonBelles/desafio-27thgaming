import Route from '@ioc:Adonis/Core/Route';

Route.get('/', 'v1/SwaggerController.index')
Route.get('/api-docs', 'v1/SwaggerController.index')

Route.group(() => {
  Route.post('/login', 'v1/LoginController.login')
  Route.get('/logout', 'v1/LoginController.logout')
}).prefix('v1');

Route.group(() => {
  Route.post('/user', 'v1/UserController.create')
  Route.patch('/user', 'v1/UserController.update')
  Route.get('/users', 'v1/UserController.search')
  Route.get('/user/:id', 'v1/UserController.find')

  Route.get('/bet/play/:bet', 'v1/RouletteController.playBet')
}).prefix('v1').middleware(['auth', 'authApiKey']);