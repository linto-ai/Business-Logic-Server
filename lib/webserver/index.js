'use strict'

const debug = require('debug')('linto-red:webserver')
const express = require('express')

const EventEmitter = require('eventemitter3')
const RedManager = require(process.cwd() + '/lib/node-red')


class WebServer extends EventEmitter {
  constructor() {
    super()
    this.app = express()
    this.app.use('/', express.static('public'))
    this.app.use(express.json())

    require('./routes')(this)
    return this.init()
  }

  async init() {
    await new RedManager(this.app)
    return this
  }
}
module.exports = new WebServer()
