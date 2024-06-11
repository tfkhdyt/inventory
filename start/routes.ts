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
import router from '@adonisjs/core/services/router'

router
  .group(() => {
    router.post('/register', [UsersController, 'register'])
    router.post('/login', [UsersController, 'login'])
    router.get('/inspect', [UsersController, 'inspect'])
  })
  .prefix('/auth')

router
  .group(() => {
    router.get('/', [ItemsController, 'index'])
    router.post('/', [ItemsController, 'store'])
    router.get('/:sku', [ItemsController, 'show'])
  })
  .prefix('/items')
