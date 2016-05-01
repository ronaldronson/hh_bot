'use strict'

var api = require('./api')
var form = require('./form')
var io = require('./io')
var url = require('./url')

function run($, req) {
  $.sendMessage('Let me check what we have for you...')
  api.loadXml(url.toAPI(req.postcode, req.query), name => {
    var txt = !!name
     ? 'Look what I have found!\n' + url.toHH(name)
     : 'Have a look at those restaurants: \n' + url.toHH(req.postcode, req.query)
    $.sendMessage(txt + '\n\nSearch another /postcode or /food or maybe you want to /start again?')
  })
}

module.exports = tg => ({
  StartController: $ => {
    tg.for('/start', $ => {
      console.log('req: /start', $.user)
      $.runForm(form.main($), res => {
         io.set($, res)
         run($, res)
      })
    })

    tg.for('/postcode', $ => {
      console.log('req: /postcode', $.user)
      $.runForm(form.postcode($), res => {
        io.set($, res)
        if (io.get($)) run($, io.get($))
      })
    })

    tg.for('/food', $ => {
      console.log('req: /food', $.user)
      $.runForm(form.query($), res => {
        io.set($, res)
        if (io.get($)) run($, io.get($))
      })
    })
  }
})
