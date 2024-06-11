import Item from '#models/item'
import { createItemValidator } from '#validators/item'
import type { HttpContext } from '@adonisjs/core/http'

export default class ItemsController {
  /**
   * Display a list of resource
   */
  async index({ auth, request }: HttpContext) {
    await auth.authenticate()

    const { page = 1, per_page: perPage = 10, q } = request.qs()

    const items = await Item.query()
      .if(q, (query) =>
        query
          .whereLike('sku', `%${q}%`)
          .orWhereLike('name', `%${q}%`)
          .orWhereLike('description', `%${q}%`)
      )
      .orderBy('created_at', 'desc')
      .paginate(page, perPage)

    return items
  }

  /**
   * Handle form submission for the create action
   */
  async store({ auth, request, response }: HttpContext) {
    await auth.authenticate()
    const payload = await request.validateUsing(createItemValidator)
    await Item.create(payload)

    response.safeStatus(201).send({ message: 'Item created successfully' })
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {
    const { sku } = params
    const item = await Item.findByOrFail('sku', sku)

    return item
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {}

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {}
}
