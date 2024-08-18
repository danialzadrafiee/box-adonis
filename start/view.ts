import edge from 'edge.js'
import env from '#start/env'

edge.global('appUrl', env.get('APP_URL'))
