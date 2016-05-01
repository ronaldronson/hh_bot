'use strict'

var validation = require('./validation')

function name($) {
  return $.user.first_name
}

function query(title) {
  return {
    q: title,
    error: 'Sorry, how can I find it? Try again...',
    validator: (input, fn) => {
      fn(!!input['text'])
    }
  }
}

function postcode(title) {
  return {
    q: title,
    error: 'Full UK postcode please',
    validator: (input, fn) => {
      fn(!!input['text'] && !!validation.postcode(input['text']))
    }
  }
}

module.exports = {
  main: $ => ({
    query: query('Hi ' + name($) + '! What are you hungry for?'),
    postcode: postcode('Give me your Postcode')
  }),
  postcode: $ => ({
    postcode: postcode('Ok, ' + name($) + ', what\'s your new Postcode?')
  }),
  query: $ => ({
    query: query('Well, ' + name($) + ', what do you want to eat now?')
  })
}
