import Item from '#models/item'
import vine from '@vinejs/vine'

/**
 * Validator to validate the payload when creating
 * a new item.
 */
export const createItemValidator = vine.compile(
  vine.object({
    sku: vine
      .string()
      .trim()
      .unique(async (_, value) => {
        const item = await Item.findBy('sku', value)
        return !item
      }),
    name: vine.string().trim().maxLength(100),
    description: vine.string().trim().nullable(),
    unit: vine.string().trim(),
    quantity: vine.number().min(0),
  })
)

/**
 * Validator to validate the payload when updating
 * an existing item.
 */
export const updateItemValidator = vine.withMetaData<{ itemId: number }>().compile(
  vine.object({
    sku: vine
      .string()
      .trim()
      .unique(async (_, value, field) => {
        const item = await Item.query()
          .whereNot('id', field.meta.itemId)
          .where('sku', value)
          .first()

        return !item
      })
      .optional(),
    name: vine.string().trim().maxLength(100).optional(),
    description: vine.string().trim().nullable().optional(),
    unit: vine.string().trim().optional(),
    quantity: vine.number().min(0).optional(),
  })
)
