/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})


Route.resource('/users', 'UsersController');

Route.post('/login', 'AuthController.login');

Route.get('/dashboard', async ({ auth }) => {
  await auth.use('api').authenticate();
  
  return `Dashboard de ${auth.user?.username}`;

});

//Rota do Veiculos.
Route.group(() => {
  Route.resource('/veiculos', 'VehiclesController')
  .apiOnly();
  
}).middleware('auth');