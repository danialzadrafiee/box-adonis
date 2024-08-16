import cron from 'node-cron'
import db from '@adonisjs/lucid/services/db'
export function scheduleMineIncrease() {
  const intervalSeconds = 5 // Current interval in seconds
  const secondsPerHour = 3600 // Number of seconds in an hour

  console.log(`CP mining increase scheduled to run every ${intervalSeconds} seconds`)
  cron.schedule(`*/${intervalSeconds} * * * * *`, async () => {
    console.log('Running CP mining increase at:', new Date())
    try {
      // Get settings
      const [settings] = await db.from('settings').select('miner_multiplier_reward')

      // Get all users
      const users = await db.from('users')
        .select('id', 'telegram_username', 'miner_booster_level', 'cp')

      for (const user of users) {
        // Calculate CP increase
        const hourlyIncrease = user.miner_booster_level * settings.miner_multiplier_reward
        const cpIncrease = Math.floor(hourlyIncrease * intervalSeconds / secondsPerHour)

        // Increase CP
        await db.from('users')
          .where('id', user.id)
          .increment('cp', cpIncrease)

        // Get updated CP amount
        const [updatedUser] = await db.from('users')
          .where('id', user.id)
          .select('cp')

        console.log(
          `User ${user.telegram_username || user.id}: ` +
          `CP increased from ${user.cp} to ${updatedUser.cp} (+${cpIncrease}).`
        )
      }

      console.log(`CP amounts increased for ${users.length} users`)
    } catch (error) {
      console.error('Error increasing CP amounts:', error)
    }
  })
}
