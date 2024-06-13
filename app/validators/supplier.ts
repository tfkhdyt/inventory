import Supplier from '#models/supplier'
import vine from '@vinejs/vine'

/**
 * Validator to validate the payload when creating
 * a new supplier.
 */
export const createSupplierValidator = vine.compile(
  vine.object({
    name: vine.string().trim().maxLength(100),
    email: vine
      .string()
      .trim()
      .email()
      .unique(async (_, value) => {
        const supplier = await Supplier.query().where('email', value).first()

        return !supplier
      })
      .maxLength(50),
    phone: vine
      .string()
      .trim()
      .maxLength(30)
      .unique(async (_, value) => {
        const supplier = await Supplier.query().where('phone', value).first()

        return !supplier
      })
      .nullable(),
    address: vine.string().trim().nullable(),
  })
)

/**
 * Validator to validate the payload when updating
 * an existing supplier.
 */
export const updateSupplierValidator = vine.compile(
  vine.object({
    name: vine.string().trim().maxLength(100).optional(),
    email: vine.string().trim().email().maxLength(50).optional(),
    phone: vine.string().trim().maxLength(30).nullable().optional(),
    address: vine.string().trim().nullable().optional(),
  })
)
