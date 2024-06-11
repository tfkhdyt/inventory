import Item from '#models/item'
import Movement from '#models/movement'
import { createMovementValidator } from '#validators/movement'
import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'

export default class MovementsController {
  /**
   * Display a list of resource
   */
  async index({ auth, request }: HttpContext) {
    const user = await auth.authenticate()
    const { page = 1, per_page: perPage = 10, direction, from, to } = request.qs()
    const itemId = request.param('item_id')

    const movements = await Movement.query()
      .preload('item')
      .preload('createdBy')
      .if(direction, (query) => query.where('direction', direction))
      .if(from && to, (query) => query.whereBetween('move_date', [from, to]))
      .if(user.role === 'STAFF', (query) => query.where('user_id', user.id))
      .where('item_id', itemId)
      .orderBy('created_at', 'desc')
      .paginate(page, perPage)

    return movements
  }

  /**
   * Handle form submission for the create action
   */
  async store({ auth, request, response }: HttpContext) {
    const user = await auth.authenticate()
    const payload = await request.validateUsing(createMovementValidator)
    const itemId = request.param('item_id')

    await db.transaction(async (trx) => {
      await Movement.create({ ...payload, userId: user.id, itemId }, { client: trx })
      const item = await Item.findOrFail(itemId, { client: trx })

      switch (payload.direction) {
        case 'IN':
          item.quantity += payload.quantity
          break
        case 'OUT':
          item.quantity -= payload.quantity
          break
      }

      await item.save()
    })

    response.safeStatus(201).send({ message: 'Movement created successfully' })
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {}

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {}

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {}
}
