import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'settings'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('tap_multiplier_reward').defaultTo(2)
      table.integer('tap_upgrade_base_cost').defaultTo(200)
      table.integer('miner_multiplier_reward').defaultTo(30)
      table.integer('miner_upgrade_base_cost').defaultTo(1000)
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
