import { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'

export default class AdminController {
  public async resetTickets({ response }: HttpContext) {
    try {
      const updatedCount = await User.query().update({ ticket_amount: 0 })

      return response.json({
        success: true,
        message: `Successfully reset tickets for ${updatedCount} users.`
      })
    } catch (error) {
      console.error('Error resetting tickets:', error)

      return response.status(500).json({
        success: false,
        message: 'An error occurred while resetting tickets.',
        error: error instanceof Error ? error.message : String(error)
      })
    }
  }

  // You can add more admin-related methods here
  public async getUserStats({ response }: HttpContext) {
    try {
      const totalUsers = await User.query().count('* as total')
      const activeUsers = await User.query().where('ticket_amount', '>', 0).count('* as active')

      return response.json({
        success: true,
        stats: {
          totalUsers: totalUsers[0].$extras.total,
          activeUsers: activeUsers[0].$extras.active
        }
      })
    } catch (error) {
      console.error('Error fetching user stats:', error)

      return response.status(500).json({
        success: false,
        message: 'An error occurred while fetching user stats.',
        error: error instanceof Error ? error.message : String(error)
      })
    }
  }
}
