// database/migrations/[timestamp]_create_user_tasks_table.ts
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'user_tasks'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.integer('task_id').unsigned().references('id').inTable('tasks').onDelete('CASCADE')
      table.boolean('is_done').defaultTo(false)
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })

      table.unique(['user_id', 'task_id'])
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
