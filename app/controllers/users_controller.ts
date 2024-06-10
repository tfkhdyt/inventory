import User from '#models/user'
import { loginUserValidator, registerUserValidator } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class UsersController {
  async register({ request, response }: HttpContext) {
    const payload = await request.validateUsing(registerUserValidator)
    await User.create(payload)

    response.safeStatus(201).send({
      message: 'User created successfully',
    })
  }

  async login({ request }: HttpContext) {
    const { email, password } = await request.validateUsing(loginUserValidator)
    const user = await User.verifyCredentials(email, password)
    const token = await User.accessTokens.create(user)

    return token
  }

  async inspect({ auth }: HttpContext) {
    const user = await auth.authenticate()

    return user
  }
}
