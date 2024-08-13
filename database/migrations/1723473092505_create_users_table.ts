import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('telegram_id')
      table.string('telegram_username').nullable()
      table.string('telegram_first_name').nullable();
      table.string('telegram_last_name').nullable();
      table.string('wallet_address').nullable()
      table.integer('ticket_capacity').defaultTo(5)
      table.integer('ticket_amount').defaultTo(5)
      table.integer('cp').nullable().defaultTo(0)
      table.integer('chest_silver').nullable().defaultTo(0)
      table.integer('chest_gold').nullable().defaultTo(0)
      table.integer('chest_diamond').nullable().defaultTo(0)
      table.string('referral_code').nullable().defaultTo(0)
      table.integer('tap_booster_level').nullable().defaultTo(1)
      table.integer('miner_booster_level').nullable().defaultTo(1)
      table.integer('estimated_join_date').nullable()
      table.integer('inviter_id').nullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
