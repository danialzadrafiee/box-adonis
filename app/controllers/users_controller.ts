import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'

export default class UsersController {
  async index({ response }: HttpContext) {
    const users = await User.all()
    return response.json(users)
  }
  async listByRank({ request, response }: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 0)

    let query = User.query()
      .select('telegram_id', 'telegram_username', 'telegram_first_name', 'telegram_last_name', 'cp')
      .orderBy('cp', 'desc')

    let users: Array<Partial<User>>
    let meta: any = null

    if (limit > 0) {
      const paginatedResult = await query.paginate(page, limit)
      const jsonResult = paginatedResult.toJSON()
      users = jsonResult.data
      meta = {
        total: jsonResult.meta.total,
        perPage: jsonResult.meta.per_page,
        currentPage: jsonResult.meta.current_page,
        lastPage: jsonResult.meta.last_page,
        firstPage: 1,
        hasTotal: true,
      }
    } else {
      users = await query.exec()
    }

    const rankedUsers = users.map((user, index) => ({
      rank: limit > 0 ? (page - 1) * limit + index + 1 : index + 1,
      telegram_id: user.telegram_id,
      telegram_username: user.telegram_username,
      name: `${user.telegram_first_name || ''} ${user.telegram_last_name || ''}`.trim(),
      cp: user.cp
    }))

    if (meta) {
      return response.json({
        meta,
        data: rankedUsers
      })
    }

    return response.json(rankedUsers)
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
    const user = auth.user
    if (!user) {
      return response.status(401).json({ error: 'User not authenticated' })
    }
    return response.json(user)
  }

  async authenticate({ request, response }: HttpContext) {
    const {
      telegram_id,
      telegram_first_name,
      telegram_last_name,
      telegram_username,
      telegram_inviter_id
    } = request.only(['telegram_id', 'telegram_first_name', 'telegram_last_name', 'telegram_username', 'telegram_inviter_id'])

    let user = await User.findBy('telegram_id', telegram_id)

    if (!user) {
      user = await User.create({
        telegram_id,
        telegram_first_name,
        telegram_last_name,
        telegram_username,
        telegram_inviter_id
      })

      if (telegram_inviter_id) {
        const inviter = await User.findBy('telegram_id', telegram_inviter_id)
        if (inviter) {
          inviter.ticket_capacity += 1
          inviter.ticket_amount = inviter.ticket_capacity
          inviter.cp ? inviter.cp += 5000 : inviter.cp = 5000
          await inviter.save()
        }
      }
    } else {
      user.merge({
        telegram_first_name,
        telegram_last_name,
        telegram_username,
      })
      await user.save()
    }

    const token = await User.accessTokens.create(user)
    return response.json({
      token: {
        type: 'bearer',
        value: token.value!.release(),
      },
      user: user
    })
  }







  async update({ auth, request, response }: HttpContext) {
    const user = auth.user
    if (!user) {
      return response.notFound('User not found')
    }
    const userData = request.only([
      'telegram_username',
      'telegram_first_name',
      'telegram_last_name',
      'telegram_inviter_id',
      'wallet_address',
      'ticket_capacity',
      'ticket_amount',
      'cp',
      'chest_silver',
      'chest_gold',
      'chest_diamond',
      'referral_code',
      'tap_booster_level',
      'miner_booster_level',
      'estimated_join_date',
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

  async getDirectReferrals({ auth, response }: HttpContext) {
    const user = auth.user
    if (!user) {
      return response.status(401).json({ error: 'User not authenticated' })
    }

    const directReferrals = await User.query()
      .where('telegram_inviter_id', user.telegram_id)
      .select([
        'id',
        'telegram_id',
        'telegram_username',
        'telegram_first_name',
        'telegram_last_name',
        'created_at'
      ])

    return response.json(directReferrals)
  }
}
