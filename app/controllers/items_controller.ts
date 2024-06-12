import Item from '#models/item'
import { createItemValidator, updateItemValidator } from '#validators/item'
import type { HttpContext } from '@adonisjs/core/http'

export default class ItemsController {
  /**
   * Display a list of resource
   */
  async index({ request }: HttpContext) {
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
  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(createItemValidator)

    await Item.create(payload)

    response.safeStatus(201).send({ message: 'Item created successfully' })
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {
    const { id } = params

    const item = await Item.findOrFail(id)

    return item
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {
    const { id } = params

    const item = await Item.findOrFail(id)
    const payload = await request.validateUsing(updateItemValidator, {
      meta: { itemId: item.id },
    })
    await item.merge(payload).save()

    return { message: 'Item updated successfully' }
  }

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {
    const { id } = params

    const item = await Item.findOrFail(id)
    await item.delete()

    return { message: 'Item deleted successfully' }
  }
}
