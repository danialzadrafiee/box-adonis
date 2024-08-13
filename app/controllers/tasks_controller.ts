// app/controllers/tasks_controller.ts
import type { HttpContext } from '@adonisjs/core/http'
import Task from '#models/task'
import User from '#models/user'

export default class TasksController {
  public async index({ auth, response }: HttpContext) {
    const user = auth.user!
    const tasks = await Task.query().preload('users', (query) => {
      query.where('user_id', user.id)
    })

    const formattedTasks = tasks.map((task) => ({
      id: task.id,
      image: task.image,
      link: task.link,
      description: task.description,
      reward: task.reward,
      isDone: task.users.length > 0 && task.users[0].$extras.pivot_is_done,
    }))

    return response.json(formattedTasks)
  }

  public async complete({ params, auth, response }: HttpContext) {
    const user = auth.user! as User
    const task = await Task.findOrFail(params.id)

    const userTask = await task.related('users').pivotQuery().where('user_id', user.id).first()

    if (userTask && userTask.is_done) {
      return response.badRequest('Task already completed')
    }

    await task.related('users').sync({
      [user.id]: {
        is_done: true
      }
    }, false)

    user.cp = (user.cp || 0) + task.reward
    await user.save()

    await task.load('users', (query) => {
      query.where('user_id', user.id)
    })

    return response.json({
      id: task.id,
      image: task.image,
      link: task.link,
      description: task.description,
      reward: task.reward,
      isDone: true,
    })
  }
}
