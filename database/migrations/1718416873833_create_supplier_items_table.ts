import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'item_supplier'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table
        .integer('supplier_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('suppliers')
        .onDelete('CASCADE')

      table
        .integer('item_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('items')
        .onDelete('CASCADE')

      table.unique(['supplier_id', 'item_id'])

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
