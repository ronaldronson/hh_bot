'use strict'

const request = require('request')
const headers = require('./config').headers
const parser = require('xml-parser')

const transformRestName = str =>
  (str || '')
    .toLocaleLowerCase()
    .replace(/@/g, 'at')
    .replace(/ /g, '-')

const normalizeSearch = str =>
  (str || '')
    .toLocaleLowerCase()
    .trim()
    .split(' ').shift()

const filterType = type =>
  prop => prop.attributes.type === type

const filterSponsored = rest =>
  !rest.children.filter(filterType('sponsor')).shift()

function parseXml(xml) {
  try {
    const rest = parser(xml).root
      .children[1] // result
      .children[3] // restaurants
      .children
      .filter(filterSponsored) // filter sponsored
      .pop() // take first restaurant

    if (!rest) {
      // no rest found
      console.log('no rest found')
      return false
    }

    const attr = rest.children.filter(filterType('name')).pop()

    console.log('find rest: ', attr.content || '[empty value]')
    return transformRestName(attr.content) || false
  } catch (e) {
    console.log('error ', e)
    return false
  }
}

module.exports.loadXml = (url, done) => {
  console.log('req url: ', url)
  request({
    uri: normalizeSearch(url),
    headers: headers},
    function(err, response, body) {
      done(parseXml(body))
  })
}
