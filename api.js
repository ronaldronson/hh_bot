'use strict'

const request = require('request')
const parser = require('xml-parser')

function transformRestName(str) {
  return (str || '')
    .toLocaleLowerCase()
    .replace(/@/g, 'at')
    .replace(/ /g, '-')
}

function normalizeSearch(str) {
  return (str || '')
    .toLocaleLowerCase()
    .trim()
    .split(' ').shift()
}

function parseXml(xml) {
  const rest = parser(xml).root
    .children[1] // result
    .children[2] // restaurants
    .children
     // filter sponsored
    .filter(rest => !rest.children.filter(prop => prop.attributes.type === 'sponsor').shift())
    .pop() // take first restaurant

  if (!rest) {
    // no rest found
    console.log('no rest found')
    return false
  }

  // console.log(rest)

  const attr = rest.children
    .filter(prop => prop.attributes.type === 'name').pop()

  console.log('find rest: ', attr.content || '[empty value]')
  return transformRestName(attr.content) || false
}

function loadXml(url, done) {
  console.log('req url: ', url)
  request({uri: normalizeSearch(url)}, function(err, response, body) {
    done(parseXml(body))
  })
}

module.exports.loadXml = loadXml
