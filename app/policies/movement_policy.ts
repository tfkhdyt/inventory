import User from '#models/user'
import Movement from '#models/movement'
import { BasePolicy } from '@adonisjs/bouncer'
import { AuthorizerResponse } from '@adonisjs/bouncer/types'

export default class MovementPolicy extends BasePolicy {
  before(user: User | null) {
    if (user && user.role === 'ADMIN') return true
  }

  show(user: User, movement: Movement): AuthorizerResponse {
    return user.id === movement.userId
  }
}
