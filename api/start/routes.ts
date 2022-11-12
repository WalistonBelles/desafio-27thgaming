import Route from '@ioc:Adonis/Core/Route';

Route.group(() => {
  Route.post('/login', 'v1/LoginController.login')
  Route.get('/logout', 'v1/LoginController.logout')
}).prefix('v1');

Route.group(() => {
  Route.post('/users', 'v1/UserController.create')
  Route.patch('/users', 'v1/UserController.update')
  Route.get('/users', 'v1/UserController.search')
  Route.get('/user/:id', 'v1/UserController.find')

  Route.get('/play/:bet', 'v1/RouletteController.playBet')
}).prefix('v1').middleware(['auth', 'authApiKey']);