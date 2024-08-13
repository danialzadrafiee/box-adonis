// app/controllers/users_controller.ts
import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'

export default class UsersController {
  async index({ response }: HttpContext) {
    const users = await User.all()
    return response.json(users)
  }

  async isAuthenticated({ auth, response }: HttpContext) {
    const user = auth.user
    if (!user) {
      return response.status(401).json({ error: 'User not authenticated' })
    }
    return true
  }

  async show({ request, response }: HttpContext) {
    const { id } = request.qs()
    const user = await User.find(id)
    if (!user) {
      return response.notFound('User not found')
    }
    return response.json(user)
  }

  async me({ auth, response }: HttpContext) {
    console.log('Auth user:', auth.user)
    const user = auth.user
    if (!user) {
      console.log('User not authenticated')
      return response.status(401).json({ error: 'User not authenticated' })
    }
    return response.json(user)
  }

  async authenticate({ request, response }: HttpContext) {
    const { wallet_address } = request.only(['wallet_address'])
    let user = await User.findBy('wallet_address', wallet_address)
    if (!user) {
      user = await User.create({ wallet_address })
    }
    const token = await User.accessTokens.create(user)
    return response.json({
      token: {
        type: 'bearer',
        value: token.value!.release(),
      },
    })
  }
  async update({ auth, request, response }: HttpContext) {
    const user = auth.user
    if (!user) {
      return response.notFound('User not found')
    }

    const userData = request.only([
      'wallet_address',
      'ticket_capacity',
      'ticket_amount',
      'cp',
      'chest_silver',
      'chest_gold',
      'chest_diamond',
      'referral_code',
      'referral_count',
      'tap_booster_level',
      'miner_booster_level',
      'estimated_join_date',
      'invitor_id',
      'invitor_username',
      'telegram_id',
      'telegram_username',
    ])

    user.merge(userData)
    await user.save()

    return response.json(user)
  }

  async delete({ request, response }: HttpContext) {
    const { id } = request.only(['id'])
    const user = await User.find(id)
    if (!user) {
      return response.notFound('User not found')
    }
    await user.delete()
    return response.noContent()
  }
}


