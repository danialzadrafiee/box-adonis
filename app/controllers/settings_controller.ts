import Setting from "#models/setting";
import type { HttpContext } from '@adonisjs/core/http'


export default class SettingsController {
  async index({ response }: HttpContext) {
    const settings = await Setting.all()
    return response.json(settings)
  }
}
