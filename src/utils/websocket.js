import { w3cwebsocket as WS } from 'websocket'

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

  const sendNumber = () => {
    if (client.readyState === client.OPEN) {
      const number = Math.round(Math.random() * 0xFFFFFF)
      client.send(number.toString())
    }
  }
  sendNumber()
}

client.onclose = function() {
  console.log('echo-protocol Client Closed')
}

client.onmessage = function(e) {
  console.log(e)
  if (typeof e.data === 'string') {
    console.log("Received: '" + e.data + "'")
  }
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

export default {
  client: client,
  sendRawData
}
