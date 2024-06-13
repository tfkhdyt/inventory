/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const UsersController = () => import('#controllers/users_controller')
const ItemsController = () => import('#controllers/items_controller')
const MovementsController = () => import('#controllers/movements_controller')
const SuppliersController = () => import('#controllers/suppliers_controller')
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

router
  .group(() => {
    router.post('/register', [UsersController, 'register'])
    router.post('/login', [UsersController, 'login'])
    router.get('/inspect', [UsersController, 'inspect']).use(middleware.auth({ guards: ['api'] }))
  })
  .prefix('/auth')

router
  .group(() => {
    router.resource('items', ItemsController).apiOnly()
    router.shallowResource('items.movements', MovementsController).apiOnly()
    router.resource('suppliers', SuppliersController).apiOnly()
  })
  .use(middleware.auth({ guards: ['api'] }))
