'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // BASE_API: '"https://easy-mock.com/mock/5a72c1ecc76727050336e0bc/mdm/"',
  BASE_API: '"http://10.88.9.22:31100/data-service/data/v1/"',
  // BASE_API: '"http://localhost:9010/data/v1/"',
})
