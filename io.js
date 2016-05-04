'use strict'

const mem = {}

module.exports = {
  set: ($, req) => {
    mem[$.user.id] = mem[$.user.id] || {}
    Object.keys(req).forEach(name => {
      mem[$.user.id][name] = req[name]
    })
    console.log(mem)
  },
  get: $ => mem[$.user.id]
}
