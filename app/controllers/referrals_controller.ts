// app/controllers/referrals_controller.ts
import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'

export default class ReferralsController {
  public async getInvitedUsers({ auth, response }: HttpContext) {
    const user = auth.user!
    const invitedUsers = await user.related('referrals').query().select(['id', 'wallet_address', 'createdAt'])
    return response.json(invitedUsers)
  }

  public async joinByReferral({ request, response }: HttpContext) {
    const { wallet_address, referral_code } = request.only(['wallet_address', 'referral_code'])

    const inviter = await User.findByOrFail('referral_code', referral_code)

    let user = await User.findBy('wallet_address', wallet_address)
    if (!user) {
      user = await User.create({
        wallet_address,
        inviter_id: inviter.id,
        ticket_capacity: 1,
        ticket_amount: 1,
      })
    } else if (user.inviter_id) {
      return response.badRequest('User already joined with a referral')
    } else {
      user.inviter_id = inviter.id
      user.ticket_capacity += 1
      user.ticket_amount = user.ticket_capacity
      await user.save()
    }

    inviter.ticket_capacity += 1
    inviter.ticket_amount = inviter.ticket_capacity
    await inviter.save()

    return response.json({ message: 'Joined successfully', user })
  }
}
