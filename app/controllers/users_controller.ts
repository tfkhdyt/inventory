import User from '#models/user'
import { registerUserValidator } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class UsersController {
  async register({ request, response }: HttpContext) {
    const payload = await request.validateUsing(registerUserValidator)

    await User.create(payload)

    response.safeStatus(201).send({
      message: 'User created successfully',
    })
  }
}
