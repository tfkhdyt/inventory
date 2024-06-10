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
    password: vine.string(),
  })
)
