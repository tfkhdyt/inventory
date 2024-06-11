import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import Movement from './movement.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'

export default class Item extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare sku: string

  @column()
  declare name: string

  @column()
  declare description: string | null

  @column()
  declare unit: string

  @column()
  declare quantity: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => Movement)
  declare movements: HasMany<typeof Movement>
}
