'use strict'

var config = require('./config')
var filter = require('./validation').postcode

function normilizePostcode(val) {
  var postcode = filter(val)
  console.log('postcode ', postcode[0])
  return postcode ? postcode[0] : ''
}

module.exports = {
  toHH: function (args) {
    var args = [].slice.call(arguments)

    if (2 === args.length)
      return config.domain + '/takeaways/'
        + args[0] + '?q=' + args[1]

    return config.domain + '/' + args[0]
  },

  toAPI: (postcode, cousine) => {
    return config.domain + '/api/iphone-'
      + config.hh_token + '/search/'
      + normilizePostcode(postcode)
      + '/All/0-5/?q=' + cousine
  }
}
