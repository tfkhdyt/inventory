/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router.get('/movies', async () => {})
router.get('/movies/:slug', async (ctx) => {
  const { slug } = ctx.params

  return `Movie slug is ${slug}`
})
router.post('/movies', async () => {})
router.put('/movies/:id', async () => {})
router.delete('/movies/:id', async () => {})
