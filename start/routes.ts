
import router from '@adonisjs/core/services/router'
import UsersController from '#controllers/users_controller'
import { middleware } from './kernel.js'
import SettingsController from '#controllers/settings_controller'
import TasksController from '#controllers/tasks_controller'
import ReferralsController from '#controllers/referrals_controller'


router.group(() => {
  router.post('/authenticate', [UsersController, 'authenticate'])
  router.post('/index', [UsersController, 'index'])
  router.group(() => {
    router.post('/is-authenticated', [UsersController, 'isAuthenticated'])
    router.post('/me', [UsersController, 'me'])
    router.post('/show', [UsersController, 'show'])
    router.post('/update', [UsersController, 'update'])
    router.post('/delete', [UsersController, 'delete'])
  }).use(middleware.auth())
}).prefix('/user')

router.group(() => {
  router.get('/index', [SettingsController, 'index'])

}).prefix('/setting')


router.group(() => {
  router.get('/', [TasksController, 'index'])
  router.post('/:id/complete', [TasksController, 'complete'])
}).prefix('/tasks').use(middleware.auth())

router.group(() => {
  router.get('/invited-users', [ReferralsController, 'getInvitedUsers'])
}).prefix('/referrals').use(middleware.auth())

router.post('/join-by-referral', [ReferralsController, 'joinByReferral'])
