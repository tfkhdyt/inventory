import vine from '@vinejs/vine'

export const createItemSupplierValidator = vine.compile(
  vine.object({
    itemId: vine.number().min(0),
  })
)

export const updateItemSupplierValidator = vine.compile(
  vine.object({
    item_id: vine.number().min(0),
  })
)
