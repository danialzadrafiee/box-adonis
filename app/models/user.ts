// app/models/user.ts
import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany, manyToMany } from '@adonisjs/lucid/orm'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import Task from './task.js'
import type { BelongsTo, HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare telegram_id: number | null

  @column()
  declare telegram_username: string | null

  @column()
  declare telegram_first_name: string | null

  @column()
  declare telegram_last_name: string | null

  @column()
  declare wallet_address: string | null

  @column()
  declare ticket_capacity: number

  @column()
  declare ticket_amount: number

  @column()
  declare cp: number | null

  @column()
  declare chest_silver: number | null

  @column()
  declare chest_gold: number | null

  @column()
  declare chest_diamond: number | null

  @column()
  declare referral_code: string | null

  @column()
  declare tap_booster_level: number | null

  @column()
  declare miner_booster_level: number | null

  @column()
  declare estimated_join_date: number | null

  @column()
  declare telegram_inviter_id: number | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @column()
  declare referred_by_id: number | null

  static accessTokens = DbAccessTokensProvider.forModel(User)

  @manyToMany(() => Task, {
    pivotTable: 'user_tasks',
    pivotColumns: ['is_done']
  })
  declare tasks: ManyToMany<typeof Task>

  @belongsTo(() => User, {
    foreignKey: 'telegram_inviter_id',
  })
  declare inviter: BelongsTo<typeof User>

  @hasMany(() => User, {
    foreignKey: 'telegram_inviter_id',
  })
  declare referrals: HasMany<typeof User>
}
