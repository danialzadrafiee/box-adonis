import { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import Task from '#models/task'
import Setting from '#models/setting'
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

  public async addTask({ request, response }: HttpContext) {
    const { image, link, description, reward } = request.body()

    try {
      const task = await Task.create({ image, link, description, reward })
      return response.status(201).json({
        success: true,
        message: 'Task added successfully',
        task
      })
    } catch (error) {
      console.error('Error adding task:', error)
      return response.status(500).json({
        success: false,
        message: 'An error occurred while adding the task',
        error: error instanceof Error ? error.message : String(error)
      })
    }
  }

  public async removeTask({ params, response }: HttpContext) {
    const { id } = params

    try {
      const task = await Task.find(id)
      if (!task) {
        return response.status(404).json({
          success: false,
          message: 'Task not found'
        })
      }

      await task.delete()
      return response.json({
        success: true,
        message: 'Task removed successfully'
      })
    } catch (error) {
      console.error('Error removing task:', error)
      return response.status(500).json({
        success: false,
        message: 'An error occurred while removing the task',
        error: error instanceof Error ? error.message : String(error)
      })
    }
  }

  public async listTasks({ response }: HttpContext) {
    try {
      const tasks = await Task.all()
      return response.json({
        success: true,
        tasks
      })
    } catch (error) {
      console.error('Error listing tasks:', error)
      return response.status(500).json({
        success: false,
        message: 'An error occurred while listing tasks',
        error: error instanceof Error ? error.message : String(error)
      })
    }
  }


  public async getSettings({ response }: HttpContext) {
    const settings = await Setting.first()
    return response.json(settings)
  }

  public async updateSettings({ request, response }: HttpContext) {
    const settings = await Setting.first()
    if (!settings) {
      return response.status(404).json({ error: 'Settings not found' })
    }

    const incomingData = request.only([
      'tapMultiplierReward',
      'tapUpgradeBaseCost',
      'minerMultiplierReward',
      'minerUpgradeBaseCost',
      'chestSilverCpCost',
      'chestGoldCpCost',
      'chestDiamondCpCost',
    ])

    console.log('Incoming data:', incomingData)

    const updatedData = {
      tap_multiplier_reward: incomingData.tapMultiplierReward,
      tap_upgrade_base_cost: incomingData.tapUpgradeBaseCost,
      miner_multiplier_reward: incomingData.minerMultiplierReward,
      miner_upgrade_base_cost: incomingData.minerUpgradeBaseCost,
      chest_silver_cp_cost: incomingData.chestSilverCpCost,
      chest_gold_cp_cost: incomingData.chestGoldCpCost,
      chest_diamond_cp_cost: incomingData.chestDiamondCpCost,
    }

    console.log('Updated data:', updatedData)

    settings.merge(updatedData)
    await settings.save()

    console.log('Settings after save:', settings.toJSON())

    return response.json(settings)
  }

}
