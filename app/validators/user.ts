import User from '#models/user'
import vine from '@vinejs/vine'

export const registerUserValidator = vine.compile(
  vine.object({
    name: vine.string().trim().nullable(),
    email: vine
      .string()
      .trim()
      .maxLength(254)
      .email()
      .unique(async (_, value) => {
        const user = await User.findBy('email', value)

        return !user
      }),
    password: vine.string().minLength(8).maxLength(32),
    role: vine.enum(['ADMIN', 'STAFF']),
  })
)

export const loginUserValidator = vine.compile(
  vine.object({
    email: vine.string().maxLength(254).email(),
    password: vine.string().minLength(8).maxLength(32),
  })
)
