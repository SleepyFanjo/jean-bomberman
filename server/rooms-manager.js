const actions = require('../action-constants')
const GameMap = require('./map-generator')
const uuidv1 = require('uuid/v1')

let rooms = []

const sendJSONMessage = (message, user) => {
  user.sendUTF(JSON.stringify(message))
}

const initNewUser = (user) => {
  return {
    uid: uuidv1(),
    connection: user,
    ready: false,
    keyPressed: null
  }
}

// Send updated info to every player in the room
const roomClock = (room) => {
  if (!room.users.length) {
    clearInterval(room.interval)

    return
  }

  // Update client info only if necessary
  if (!room.map.hasChanged) {
    return
  }

  const serializedMap = room.map.serialize()

  room.users.forEach(user => {
    sendJSONMessage({type: actions.DATA_MAP, map: serializedMap}, user.connection)
  })

  room.update = false
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

  const userData = initNewUser(user)

  room = {
    id: seed,
    users: [userData],
    map: null,
    gameStarted: false
  }

  sendJSONMessage({type: actions.DATA_ROOM_ID, seed: seed}, user)
  sendJSONMessage({type: actions.DATA_PLAYER_COUNT, count: 1}, user)
  sendJSONMessage({type: actions.DATA_PLAYER_ID, id: userData.uid}, user)
  sendJSONMessage({type: actions.DATA_GAME_STARTED, started: room.gameStarted}, user)

  const map = new GameMap(seed, room)

  map.buildMap(seed)
  .then(() => {
    room.map = map
    rooms.push(room)
    sendJSONMessage({type: actions.DATA_MAP, map: room.map.serialize()}, user)
  })
}


// Make the user leave whatever room he was in and put him in the new room
const joinRoom = (seed, user) => {
  let room = rooms.find(r => {
    return r.id === seed
  })

  if (room.users.length >= 4 || everyoneReady(room.users)) {
    sendJSONMessage({type: actions.MESSAGE_ROOM_FULL}, user)
    const room = findUserRoom(user)
    if (room) {
      sendJSONMessage({type: actions.DATA_ROOM_ID, seed: room.id}, user)
    }
    return
  }

  leaveRoom(user)

  if (!room) {
    createRoom(seed, user)

    return
  }

  const userData = initNewUser(user)

  room.users.push(userData)
  room.users.forEach(u => {
    sendJSONMessage({type: actions.DATA_PLAYER_COUNT, count: room.users.length}, u.connection)
  })
  sendJSONMessage({type: actions.DATA_ROOM_ID, seed: room.id}, user)
  sendJSONMessage({type: actions.DATA_PLAYER_ID, id: userData.uid}, user)
  sendJSONMessage({type: actions.DATA_MAP, map: room.map.serialize()}, user)
}

const leaveRoom = (user) => {
  room = findUserRoom(user)
  if (room) {
    room.users = room.users.filter(u => u.connection !== user)
  }
}

const setPlayerReady = (ready, user, room) => {
  user.ready = ready

  if (everyoneReady(room.users)) {
    room.gameStarted = true
    room.map.addPlayersOnMap()

    const serializedMap = room.map.serialize()

    // Start a room clock and save a reference to it in the room to stop it when no player remains
    room.interval = setInterval(() => roomClock(room), 5000)
    room.users.forEach(u => {
      sendJSONMessage({type: actions.DATA_MAP, map: serializedMap}, u.connection)
      sendJSONMessage({type: actions.DATA_GAME_STARTED, started: room.gameStarted}, u.connection)
    })
  }
}

const everyoneReady = (users) => {
  return !users.some((user) => !user.ready)
}

const findUserRoom = (connection) => {
  return rooms.find(r => r.users.find(u => u.connection === connection))
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
