import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'movements'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('item_id').unsigned().references('id').inTable('items').onDelete('SET NULL')
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('SET NULL')
      table.datetime('move_date').notNullable()
      table.enum('direction', ['IN', 'OUT']).notNullable()
      table.integer('quantity').unsigned().notNullable().defaultTo(0)
      table.text('note')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
