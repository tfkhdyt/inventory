import User from '#models/user'
import Movement from '#models/movement'
import { AuthorizationResponse, BasePolicy } from '@adonisjs/bouncer'
import { AuthorizerResponse } from '@adonisjs/bouncer/types'

export default class MovementPolicy extends BasePolicy {
  before(user: User | null) {
    if (user && user.role === 'ADMIN') return true
  }

  show(user: User, movement: Movement): AuthorizerResponse {
    if (user.id === movement.userId) return true

    return AuthorizationResponse.deny('You are not authorized to view this data')
  }

  update(user: User, movement: Movement): AuthorizerResponse {
    if (user.id === movement.userId) return true

    return AuthorizationResponse.deny('You are not authorized to update this data')
  }

  destroy(user: User, movement: Movement): AuthorizerResponse {
    if (user.id === movement.userId) return true

    return AuthorizationResponse.deny('You are not authorized to delete this data')
  }
}
