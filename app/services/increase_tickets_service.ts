import cron from 'node-cron'
import db from '@adonisjs/lucid/services/db'

export function scheduleTicketIncrease() {
  console.log('Ticket increase scheduled to run every 5 seconds')
  cron.schedule('0 */2 * * *', async () => {
    console.log('Running ticket increase at:', new Date())
    try {
      // Get users eligible for increase
      const eligibleUsers = await db.from('users')
        .where('ticket_amount', '<', db.raw('ticket_capacity'))
        .select('id', 'telegram_username', 'ticket_amount', 'ticket_capacity')

      for (const user of eligibleUsers) {
        // Increase ticket amount
        await db.from('users')
          .where('id', user.id)
          .increment('ticket_amount', 1)

        // Get updated ticket amount
        const [updatedUser] = await db.from('users')
          .where('id', user.id)
          .select('ticket_amount')

        console.log(
          `User ${user.telegram_username || user.id}: ` +
          `Increased from ${user.ticket_amount} to ${updatedUser.ticket_amount}. ` +
          `Capacity: ${user.ticket_capacity}`
        )
      }

      console.log(`Ticket amounts increased for ${eligibleUsers.length} users`)
    } catch (error) {
      console.error('Error increasing ticket amounts:', error)
    }
  })
}
