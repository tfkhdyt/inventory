import vine from '@vinejs/vine'
import { DateTime } from 'luxon'

/**
 * Validator to validate the payload when creating
 * a new movement.
 */
export const createMovementValidator = vine.compile(
  vine.object({
    moveDate: vine
      .date({ formats: { utc: true } })
      .transform((value) => DateTime.fromJSDate(value)),
    direction: vine.enum(['IN', 'OUT']),
    quantity: vine.number().min(0),
    note: vine.string().nullable(),
  })
)

/**
 * Validator to validate the payload when updating
 * an existing movement.
 */
export const updateMovementValidator = vine.compile(
  vine.object({
    moveDate: vine
      .date({ formats: { utc: true } })
      .optional()
      .transform((value) => DateTime.fromJSDate(value)),
    // direction: vine.enum(['IN', 'OUT']).optional(),
    // quantity: vine.number().min(0).optional(),
    note: vine.string().nullable().optional(),
  })
)
