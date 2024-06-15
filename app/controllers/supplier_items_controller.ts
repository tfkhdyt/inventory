import Item from '#models/item'
import Supplier from '#models/supplier'
import { createItemSupplierValidator } from '#validators/item_supplier'
import type { HttpContext } from '@adonisjs/core/http'

export default class SupplierItemsController {
  /**
   * Display a list of resource
   */
  async index({ params, request }: HttpContext) {
    const { page = 1, per_page: perPage = 10 } = request.qs()
    const { supplier_id: id } = params

    const supplier = await Supplier.findOrFail(id)
    const items = await supplier.related('items').query().paginate(page, perPage)

    return items
  }

  /**
   * Handle form submission for the create action
   */
  async store({ params, request, response }: HttpContext) {
    const payload = await request.validateUsing(createItemSupplierValidator)
    const { supplier_id: id } = params

    const supplier = await Supplier.findOrFail(id)
    const item = await Item.findOrFail(payload.itemId)
    await supplier.related('items').attach([item.id])

    response.safeStatus(201).send({ message: 'Supplier Item created successfully' })
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
