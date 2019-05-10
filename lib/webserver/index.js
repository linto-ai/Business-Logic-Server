/*
 * Copyright (c) 2018 Linagora.
 *
 * This file is part of Business-Logic-Server
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */
'use strict'

const debug = require('debug')('linto-red:webserver')
const express = require('express')
const http = require('http')
const EventEmitter = require('eventemitter3')
const RedManager = require(process.cwd() + '/lib/node-red')

class WebServer extends EventEmitter {
  constructor() {
    super()
    this.app = express()
    require('./routes')(this)
    this.app.use('/', express.static('public'))
    return this.init()
  }

  async init() {
    await new RedManager(this.app)
    return this
  }
}
module.exports = new WebServer()
