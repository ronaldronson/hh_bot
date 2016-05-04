'use strict'

const config = require('./config')
const filter = require('./validation').postcode

function normilizePostcode(val) {
  const postcode = filter(val)
  console.log('postcode ', postcode[0])
  return postcode ? postcode[0] : ''
}

module.exports = {
  toSearch: (term, postcode) =>
    config.domain + '/takeaways/' + postcode + '?q=' + term,

  toRest: (name, postcode) =>
    config.domain + '/' + name + '/?postcode=' + postcode,

  toAPI: (postcode, term) =>
    config.domain + '/api/iphone-'
      + config.hh_token + '/search/'
      + normilizePostcode(postcode)
      + '/All/0-5/?q=' + term
}
