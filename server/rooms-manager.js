const actions = require('../action-constants')
const buildSerializedMap = require('./map-generator')

let rooms = []

const sendJSONMessage = (message, user) => {
  user.sendUTF(JSON.stringify(message))
}

// Send updated info to every player in the room
const roomClock = (room) => {
  if (!room.users.length) {
    console.log('closing room')
    clearInterval(room.interval)

    return
  }

  console.log('users', room.id, room.users.length)

  room.users.forEach(user => {
    sendJSONMessage({type: actions.DATA_MAP, map: room.map}, user)
    sendJSONMessage({type: actions.DATA_PLAYER_COUNT, count: room.users.length}, user)
  })
}

// Create a new room, add the player in it and start the game clock for this room
const createRoom = (seed, user) => {
  seed = seed || Math.floor(Math.random() * 1000000) + 1

  // Look for an already existing room
  let room = rooms.find(r => r.id === seed)

  if (room) {
    joinRoom(seed, user)

    return
  }

  room = {
    id: seed,
    users: [user],
    map: null,
  }

  // Start a room clock and save a reference to it in the room to stop it when no player remains
  room.interval = setInterval(() => roomClock(room), 1000)

  sendJSONMessage({type: actions.DATA_ROOM_ID, seed: seed}, user)

  buildSerializedMap(seed)
  .then((map) => {
    room.map = map
    rooms.push(room)
  })
}


// Make the user leave whatever room he was in and put him in the new room
const joinRoom = (seed, user) => {
  let room = rooms.find(r => {
    return r.id === seed
  })

  leaveRoom(user)

  if (!room) {
    createRoom(seed, user)

    return
  }

  room.users.push(user)
  console.log('joining room', room.id, room.users.length)
}

const leaveRoom = (user) => {
  room = rooms.find(r => r.users.find(u => u === user))
  if (room) {
    room.users = room.users.filter(u => u !== user)
  }
}


// Action handler to update rooms when a user sends a message
const handleMessage = (action, user) => {
  console.log('message received', action)
  switch (action.type) {
    case actions.CLIENT_CREATE_ROOM:
      createRoom(null, user)
      break
    case actions.CLIENT_JOIN_ROOM:
      joinRoom(action.seed, user)
      break
    default:
      break
  }
}

module.exports = {
  handleMessage: handleMessage,
  leaveRoom: leaveRoom
}
