const settings = require('../src/settings')
const entities = require('../src/entities')
const { distance } = require('../src/utils/math')
const { randomizerInit } = require('./randomizer')

const ENTITY_CHOICE = [
  entities.Brick,
  entities.Brick,
  entities.Brick,
  entities.Brick,
  entities.Brick,
  entities.Brick,
  entities.Brick,
  entities.Brick,
  entities.Air,
  entities.Air
]

const determinedBlockRules = [
  {
    rule: (x, y) => {
      const corners = [{x: 0, y: 0}, {x: 0, y: settings.MAP_HEIGHT - 1}, {x: settings.MAP_WIDTH - 1, y: 0}, {x: settings.MAP_WIDTH - 1, y: settings.MAP_HEIGHT - 1}]
      return !!corners.find(point => (point.x === x && point.y === y) || distance(point, {x, y}) <= 1) // Check if it is a corner or close enough to a corner
    },
    block: entities.Air
  }, // Generate air in every corner
  {
    rule: (x, y) => (x % 2 !== 0 && y % 2 !== 0),
    block: entities.Block
  } // Generate a block on every odd cell
  // else randomly choose between air and brick
]

const chooseARandomBlock = (randomizer, choices) => choices[Math.floor(randomizer() * choices.length)]

// return a new map base on seed parameter
const buildMap = (seed) => {
  const randomizer = randomizerInit(seed)
  return Promise.resolve()
  .then(() => {
    const emptyMap = Array.apply(null, Array(settings.MAP_HEIGHT))
    .map((row, y) => {
      return Array.apply(null, Array(settings.MAP_WIDTH))
      .map((cell, x) => {
        const determined = determinedBlockRules.find(ruleObj => ruleObj.rule(x, y))
        const block = determined ? determined.block : chooseARandomBlock(randomizer, ENTITY_CHOICE)

        return [new block()]
      })
    })

    return emptyMap
  })
}

const serializeMap = (map) => {
  return map.map((row, y) => {
    return row.map((cell) => {
      return cell.map((entity) => {
        return {
          type: entity.type,
          id: entity.id,
          orientation: entity.orientation
        }
      })
    })
  })
}

const addPlayersOnMap = (room) => {
  let i = 0
  const corners = [{x: 0, y: 0}, {x: 0, y: settings.MAP_HEIGHT - 1}, {x: settings.MAP_WIDTH - 1, y: 0}, {x: settings.MAP_WIDTH - 1, y: settings.MAP_HEIGHT - 1}]

  room.users.forEach(u => {
    const corner = corners[i]
    i++

    room.map[corner.y][corner.x].push(new entities.Player(u.uid))
  })

  return room.map
}

module.exports = {
  buildMap,
  serializeMap,
  addPlayersOnMap
}
