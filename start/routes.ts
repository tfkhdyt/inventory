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

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

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
  })
  .prefix('/items')
