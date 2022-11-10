import Route from '@ioc:Adonis/Core/Route';

Route.group(() => {
  Route.post('/login', 'LoginController.login')
  Route.get('/logout', 'LoginController.logout')
});

Route.group(() => {
  Route.post('/users', 'UserController.create')
  Route.patch('/users', 'UserController.update')
  Route.get('/users', 'UserController.search')
  Route.get('/user/:id', 'UserController.find')
}).prefix('v1').middleware(['auth', 'authApiKey']);