'use strict'

const token = require('./config').tl_token
const tg = require('telegram-node-bot')(token)
const ctrl = require('./controller')(tg)

tg.router.when(['/start', '/postcode', '/food'], 'StartController')
tg.controller('StartController', ctrl.StartController)

console.log('application started...')
