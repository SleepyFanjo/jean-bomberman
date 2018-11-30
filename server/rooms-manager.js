const actions = require('../action-constants')
const buildSerializedMap = require('./map-generator')

let rooms = []

const sendJSONMessage = (message, user) => {
  user.sendUTF(JSON.stringify(message))
}

const initNewUser = (user) => {
  return {
    connection: user,
    ready: false
  }
}

// Send updated info to every player in the room
const roomClock = (room) => {
  if (!room.users.length) {
    clearInterval(room.interval)

    return
  }

  room.users.forEach(user => {
    sendJSONMessage({type: actions.DATA_MAP, map: room.map}, user.connection)
    sendJSONMessage({type: actions.DATA_PLAYER_COUNT, count: room.users.length}, user.connection)
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

  leaveRoom(user)

  room = {
    id: seed,
    users: [initNewUser(user)],
    map: null,
    gameStarted: false
  }

  // Start a room clock and save a reference to it in the room to stop it when no player remains
  room.interval = setInterval(() => roomClock(room), 8000)

  sendJSONMessage({type: actions.DATA_ROOM_ID, seed: seed}, user)
  sendJSONMessage({type: actions.DATA_GAME_STARTED, started: room.gameStarted}, user)

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

  if (room.users.length >= 4 || everyoneReady(room.users)) {
    sendJSONMessage({type: actions.MESSAGE_ROOM_FULL}, user)
    return
  }

  leaveRoom(user)

  if (!room) {
    createRoom(seed, user)

    return
  }

  room.users.push(initNewUser(user))
}

const leaveRoom = (user) => {
  room = rooms.find(r => r.users.find(u => u.connection === user))
  if (room) {
    room.users = room.users.filter(u => u.connection !== user)
  }
}

const setPlayerReady = (ready, user, room) => {
  user.ready = ready

  if (everyoneReady(room.users)) {
    room.gameStarted = true
    room.users.forEach(u => {
      sendJSONMessage({type: actions.DATA_GAME_STARTED, started: room.gameStarted}, u.connection)
    })
  }
}

const everyoneReady = (users) => {
  return !users.some((user) => !user.ready)
}

// Action handler to update rooms when a user sends a message
const handleMessage = (action, user) => {
  switch (action.type) {
    case actions.CLIENT_CREATE_ROOM:
      createRoom(null, user)
      break
    case actions.CLIENT_JOIN_ROOM:
      joinRoom(action.seed, user)
      break
    default:
      handleRoomMessage(action, user)
      break
  }
}

const handleRoomMessage = (action, connection) => {
  let user
  const room = rooms.find(r => {
    user = r.users.find(u => u.connection === connection)

    return user
  })

  if (!room) {
    return
  }

  switch (action.type) {
    case actions.CLIENT_PLAYER_READY:
      setPlayerReady(action.ready, user, room)
      break
    default:
      break
  }
}

module.exports = {
  handleMessage: handleMessage,
  leaveRoom: leaveRoom
}
