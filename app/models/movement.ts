import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from './user.js'
import Item from './item.js'

export default class Movement extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column({ serializeAs: null })
  declare itemId: number

  @column({ serializeAs: null })
  declare userId: number

  @column.dateTime()
  declare moveDate: DateTime

  @column()
  declare direction: 'IN' | 'OUT'

  @column()
  declare quantity: number

  @column()
  declare note: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => User)
  declare createdBy: BelongsTo<typeof User>

  @belongsTo(() => Item)
  declare item: BelongsTo<typeof Item>
}
