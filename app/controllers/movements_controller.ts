import Movement from '#models/movement'
import type { HttpContext } from '@adonisjs/core/http'

export default class MovementsController {
  /**
   * Display a list of resource
   */
  async index({ auth, request }: HttpContext) {
    await auth.authenticate()
    const { page = 1, per_page: perPage = 10, direction, from, to } = request.qs()

    const movements = await Movement.query()
      .if(direction, (query) => query.where('direction', direction))
      .if(from && to, (query) => query.whereBetween('move_date', [from, to]))
      .orderBy('created_at', 'desc')
      .paginate(page, perPage)

    return movements
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request }: HttpContext) {}

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
