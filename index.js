'use strict'

var token = require('./config').tl_token
var tg = require('telegram-node-bot')(token)
var ctrl = require('./controller')(tg)

tg.router.when(['/start', '/postcode', '/food'], 'StartController')
tg.controller('StartController', ctrl.StartController)

console.log('application started...')
