const debug = require('debug')('linto-red:node-red')
const http = require('http')
const bcrypt = require('bcryptjs')

let redSettings = require('./settings/settings.js')
let RED = require('node-red')

function ifHas(element, defaultValue) {
  if (!element) return defaultValue
  return element
}

class RedManager {
  constructor(webServer) {
    return this.init(webServer)
  }

  async init(express) {
    let server = http.createServer(express)

    if (process.env.LINTO_STACK_BLS_HTTP_PORT)
      if (process.env.LINTO_STACK_BLS_USE_LOGIN === 'false') {
        delete redSettings.adminAuth
      } else {
        const hashPassword = bcrypt.hashSync(process.env.LINTO_STACK_BLS_PASSWORD, 8)
        
        redSettings.adminAuth = {
          type: 'credentials',
          users: [{
            username: process.env.LINTO_STACK_BLS_USER,
            password: hashPassword,
            permissions: '*',
          }],
        }
      }

    RED.init(server, redSettings)

    express.use(ifHas(process.env.LINTO_STACK_BLS_SERVICE_UI_PATH, redSettings.httpAdminRoot), RED.httpAdmin)
    express.use(ifHas(process.env.LINTO_STACK_BLS_SERVICE_API_PATH, redSettings.httpNodeRoot), RED.httpNode)

    server.listen(ifHas(process.env.LINTO_STACK_BLS_HTTP_PORT, redSettings.uiPort))

    const events = RED.events
    events.once('nodes-started', () => {
      if (redSettings.disableList) {
        for (let i in RED.nodes.getNodeList()) {
          if (redSettings.disableList.indexOf(RED.nodes.getNodeList()[i].name) > -1) {
            RED.nodes.disableNode(RED.nodes.getNodeList()[i].id)
          }
        }
      }
    })
    await RED.start()
  }
}

module.exports = RedManager
