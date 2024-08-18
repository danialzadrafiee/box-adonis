
import router from '@adonisjs/core/services/router'
import UsersController from '#controllers/users_controller'
import { middleware } from './kernel.js'
import SettingsController from '#controllers/settings_controller'
import TasksController from '#controllers/tasks_controller'
import AdminController from '#controllers/admin_controller'
import Task from '#models/task'


router.group(() => {
  router.post('/authenticate', [UsersController, 'authenticate'])
  router.post('/index', [UsersController, 'index'])
  router.get('/rank', [UsersController, 'listByRank'])
  router.group(() => {
    router.post('/is-authenticated', [UsersController, 'isAuthenticated'])
    router.post('/me', [UsersController, 'me'])
    router.post('/show', [UsersController, 'show'])
    router.post('/update', [UsersController, 'update'])
    router.post('/delete', [UsersController, 'delete'])
    router.get('/direct-referrals', [UsersController, 'getDirectReferrals'])
  }).use(middleware.auth())
}).prefix('/user')


router.group(() => {
  router.get('/index', [SettingsController, 'index'])

}).prefix('/setting')


router.group(() => {
  router.get('/', [TasksController, 'index'])
  router.post('/:id/complete', [TasksController, 'complete'])
}).prefix('/tasks').use(middleware.auth())

// Admin routes
router.group(() => {
  router.get('/reset-tickets', [AdminController, 'resetTickets'])
  router.get('/user-stats', [AdminController, 'getUserStats'])
  router.post('/tasks', [AdminController, 'addTask'])
  router.delete('/tasks/:id', [AdminController, 'removeTask'])
  router.get('/tasks-list', [AdminController, 'listTasks'])
  router.get('/task-help', async ({ view }: any) => {
    const tasks = await Task.all()
    return view.render('admin/task_management', { tasks })
  })
}).prefix('/admin')
