#!/usr/bin/env node

const actions = require('../action-constants')
const buildSerializedMap = require('./map-generator')

const WebSocketServer = require('websocket').server
const http = require('http')

let users = []

const server = http.createServer(function(request, response) {
  console.log((new Date()) + ' Received request for ' + request.url)
  response.writeHead(404)
  response.end()
})
server.listen(8080, function() {
  console.log((new Date()) + ' Server is listening on port 8080')
})

wsServer = new WebSocketServer({
  httpServer: server,
  // You should not use autoAcceptConnections for production
  // applications, as it defeats all standard cross-origin protection
  // facilities built into the protocol and the browser.  You should
  // *always* verify the connection's origin and decide whether or not
  // to accept it.
  autoAcceptConnections: false
})

function originIsAllowed(origin) {
  // put logic here to detect whether the specified origin is allowed.
  return true
}

wsServer.on('request', function(request) {
  if (!originIsAllowed(request.origin)) {
    // Make sure we only accept requests from an allowed origin
    request.reject()
    console.log((new Date()) + ' Connection from origin ' + request.origin + ' rejected.')
    return
  }

  const connection = request.accept('echo-protocol', request.origin)
  users.push(connection)
  console.log((new Date()) + ' Connection accepted.')
  connection.on('message', function(message) {
    if (message.type === 'utf8') {

      console.log('Received Message: ' + message.utf8Data)
      handleMessage(JSON.parse(message.utf8Data), connection)
    }
    else if (message.type === 'binary') {
      console.log('Received Binary Message of ' + message.binaryData.length + ' bytes')
    }
  })
  connection.on('close', function(reasonCode, description) {
    users = users.filter(user => user !== connection)
    console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.')
  })
})

const sendJSONMessage = (message, user) => {
  console.log('Sending message : ', message.type)
  user.sendUTF(JSON.stringify(message))
}

const createRoom = (user) => {
  const seed = Math.floor(Math.random() * 1000000) + 1

  sendJSONMessage({type: actions.DATA_ROOM_ID, seed: seed}, user)

  buildSerializedMap(seed)
  .then((map) => {
    sendJSONMessage({type: actions.DATA_MAP, map: map}, user)
  })
}

const handleMessage = (action, user) => {
  switch (action.type) {
    case actions.CLIENT_CREATE_ROOM:
      createRoom(user)
      break
    default:
      break
  }
}
