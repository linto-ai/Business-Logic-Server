const debug = require('debug')('linto-red:config')
const dotenv = require('dotenv')
const fs = require('fs')

function ifHas(element, defaultValue) {
  if (!element) return defaultValue
  return element
}

function configureDefaults() {
  try {
    dotenv.config()
    const envdefault = dotenv.parse(fs.readFileSync('.envdefault'))

    // Node environment
    process.env.LINTO_STACK_NODE_ENV = ifHas(process.env.NODE_ENV, envdefault.NODE_ENV)
    // Server RED properties

    process.env.LINTO_STACK_BLS_HTTP_PORT = ifHas(process.env.LINTO_STACK_BLS_HTTP_PORT, 80)
    process.env.LINTO_STACK_BLS_SERVICE_UI_PATH = ifHas(process.env.LINTO_STACK_BLS_SERVICE_UI_PATH, envdefault.LINTO_STACK_BLS_SERVICE_UI_PATH)
    process.env.LINTO_STACK_BLS_SERVICE_API_PATH = ifHas(process.env.LINTO_STACK_BLS_SERVICE_API_PATH, envdefault.LINTO_STACK_BLS_SERVICE_API_PATH)

    process.env.LINTO_STACK_BLS_USE_LOGIN = ifHas(process.env.LINTO_STACK_BLS_USE_LOGIN, envdefault.LINTO_STACK_BLS_USE_LOGIN)
    process.env.LINTO_STACK_BLS_USER = ifHas(process.env.LINTO_STACK_BLS_USER, envdefault.LINTO_STACK_BLS_USER)
    process.env.LINTO_STACK_BLS_PASSWORD = ifHas(process.env.LINTO_STACK_BLS_PASSWORD, envdefault.LINTO_STACK_BLS_PASSWORD)

    // Admin properties
    process.env.LINTO_STACK_ADMIN_URI = ifHas(process.env.LINTO_STACK_ADMIN_URI, envdefault.LINTO_STACK_ADMIN_URI)
  } catch (e) {
    console.error(debug.namespace, e)
    process.exit(1)
  }
}
module.exports = configureDefaults()
