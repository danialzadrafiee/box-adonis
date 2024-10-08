import router from '@adonisjs/core/services/router'
import server from '@adonisjs/core/services/server'
import { scheduleTicketIncrease } from '#services/increase_tickets_service'
import { scheduleMineIncrease } from '#services/increase_mine_cp_service'

server.errorHandler(() => import('#exceptions/handler'))

server.use([
  () => import('#middleware/container_bindings_middleware'),
  () => import('#middleware/force_json_response_middleware'),
  () => import('@adonisjs/cors/cors_middleware'),
])

router.use([() => import('@adonisjs/core/bodyparser_middleware'), () => import('@adonisjs/auth/initialize_auth_middleware')])

export const middleware = router.named({
  auth: () => import('#middleware/auth_middleware')
})

// Start the ticket increase scheduler
scheduleTicketIncrease()
scheduleMineIncrease()
