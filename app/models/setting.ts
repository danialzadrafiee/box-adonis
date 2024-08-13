import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Setting extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare  tap_multiplier_reward: number

  @column()
  declare tap_upgrade_base_cost : number

  @column()
  declare miner_multiplier_reward: number

  @column()
  declare  miner_upgrade_base_cost : number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
