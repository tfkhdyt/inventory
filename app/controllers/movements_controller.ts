import Item from '#models/item'
import Movement from '#models/movement'
import { createMovementValidator, updateMovementValidator } from '#validators/movement'
import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'

export default class MovementsController {
  /**
   * Display a list of resource
   */
  async index({ auth, request }: HttpContext) {
    const { page = 1, per_page: perPage = 10, direction, from, to } = request.qs()
    const itemId = request.param('item_id')

    const movements = await Movement.query()
      .preload('item')
      .preload('createdBy')
      .if(direction, (query) => query.where('direction', direction))
      .if(from && to, (query) => query.whereBetween('move_date', [from, to]))
      .if(auth.user!.role === 'STAFF', (query) => query.where('user_id', auth.user!.id))
      .where('item_id', itemId)
      .orderBy('created_at', 'desc')
      .paginate(page, perPage)

    return movements
  }

  /**
   * Handle form submission for the create action
   */
  async store({ auth, request, response }: HttpContext) {
    const payload = await request.validateUsing(createMovementValidator)
    const itemId = request.param('item_id')

    await db.transaction(async (trx) => {
      await Movement.create({ ...payload, userId: auth.user!.id, itemId }, { client: trx })
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

    response.safeStatus(201).send({ message: 'Movement added successfully' })
  }

  /**
   * Show individual record
   */
  async show({ bouncer, params }: HttpContext) {
    const { id } = params

    const movement = await Movement.findOrFail(id)
    await bouncer.with('MovementPolicy').authorize('show', movement)

    return movement
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ bouncer, params, request }: HttpContext) {
    const { id } = params
    const payload = await request.validateUsing(updateMovementValidator)

    const movement = await Movement.findOrFail(id)
    await bouncer.with('MovementPolicy').authorize('update', movement)
    await movement.merge(payload).save()

    return { message: 'Movement updated successfully' }
  }

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {}
}
