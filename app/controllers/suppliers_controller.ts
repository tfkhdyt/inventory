import Supplier from '#models/supplier'
import { createSupplierValidator } from '#validators/supplier'
import type { HttpContext } from '@adonisjs/core/http'

export default class SuppliersController {
  /**
   * Display a list of resource
   */
  async index({ request }: HttpContext) {
    const { page = 1, per_page: perPage = 10, q } = request.qs()

    const suppliers = await Supplier.query()
      .if(q, (query) =>
        query
          .whereLike('name', `%${q}%`)
          .orWhereLike('email', `%${q}%`)
          .orWhereLike('phone', `%${q}%`)
          .orWhereLike('address', `%${q}%`)
      )
      .orderBy('created_at', 'asc')
      .paginate(page, perPage)

    return suppliers
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(createSupplierValidator)

    await Supplier.create(payload)

    response.safeStatus(201).send({ message: 'Supplier created successfully' })
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