import { w3cwebsocket as WS } from 'websocket'
import * as actions from '../../action-constants'

const client = new WS('ws://localhost:8080/', 'echo-protocol')

let hasOpened = false
let awaiting = []

client.onerror = function () {
  console.log('Connection Error')
}

client.onopen = function () {
  hasOpened = true
  console.log('WebSocket Client Connected')

  if (awaiting.length > 0) {
    awaiting.forEach((message) => {
      if (client.readyState === client.OPEN) {
        client.send(message.data)

        message.resolve()
      } else {
        message.reject()
      }
    })
  }
}

client.onclose = function() {
  console.log('echo-protocol Client Closed')
}

const sendRawData = (data) => {
  if (!hasOpened) {
    const promise = new Promise((resolve, reject) => {
      awaiting.push({
        data: data,
        resolve: resolve,
        reject: reject
      })
    })

    return promise
  }

  if (client.readyState === client.OPEN) {
    client.send(data)

    return Promise.resolve()
  }

  return Promise.reject()
}

const sendJSONData = (data) => {
  sendRawData(JSON.stringify(data))
}

// Actions
const joinRoom = (seed) => {
  sendJSONData({type: actions.CLIENT_JOIN_ROOM, seed: seed})
}

const createRoom = () => {
  sendJSONData({type: actions.CLIENT_CREATE_ROOM})
}

const setReady = (ready) => {
  sendJSONData({type: actions.CLIENT_PLAYER_READY, ready: ready})
}

export default {
  client: client,
  sendRawData,
  sendJSONData,
  joinRoom,
  createRoom,
  setReady
}
