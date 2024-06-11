import vine from '@vinejs/vine'
import { DateTime } from 'luxon'

/**
 * Validator to validate the payload when creating
 * a new movement.
 */
export const createMovementValidator = vine.compile(
  vine.object({
    moveDate: vine.date().transform((value) => DateTime.fromJSDate(value)),
    direction: vine.enum(['IN', 'OUT']),
    quantity: vine.number().min(0),
    note: vine.string().nullable(),
  })
)

/**
 * Validator to validate the payload when updating
 * an existing movement.
 */
export const updateMovementValidator = vine.compile(vine.object({}))
