import Setting from '#models/setting'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await Setting.create({
      tap_multiplier_reward: 2,
      tap_upgrade_base_cost: 200,
      miner_multiplier_reward: 30,
      miner_upgrade_base_cost: 1000,
    })
  }
}
