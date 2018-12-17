const settings = require('../src/settings')
const entities = require('../src/entities')
const { distance } = require('../src/utils/math')
const { randomizerInit } = require('./randomizer')

const chooseARandomBlock = (randomizer, choices) => choices[Math.floor(randomizer() * choices.length)]

class GameMap {
  constructor (seed, room) {
    this.seed = seed
    this.room = room
    this.randomizer = randomizerInit(seed)

    this.ENTITY_CHOICE = [
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

    this.determinedBlockRules = [
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

    this.mapData = undefined
  }

  buildMap () {
    return Promise.resolve()
    .then(() => {
      const emptyMap = Array.apply(null, Array(settings.MAP_HEIGHT))
      .map((row, y) => {
        return Array.apply(null, Array(settings.MAP_WIDTH))
        .map((cell, x) => {
          const determined = this.determinedBlockRules.find(ruleObj => ruleObj.rule(x, y))
          const block = determined ? determined.block : chooseARandomBlock(this.randomizer, this.ENTITY_CHOICE)

          return [new block()]
        })
      })

      return emptyMap
    })
    .then((mapData) => {
      this.mapData = mapData
    })
  }

  serialize () {
    return this.mapData.map((row, y) => {
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

  addPlayersOnMap () {
    let i = 0
    const corners = [{x: 0, y: 0}, {x: 0, y: settings.MAP_HEIGHT - 1}, {x: settings.MAP_WIDTH - 1, y: 0}, {x: settings.MAP_WIDTH - 1, y: settings.MAP_HEIGHT - 1}]

    this.room.users.forEach(u => {
      const corner = corners[i]
      i++

      this.mapData[corner.y][corner.x].push(new entities.Player(u.uid))
    })
  }
}

module.exports = GameMap
