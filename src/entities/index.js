class Entity {
  constructor () {
    this.block = null
    this.destructible = null
    this.zIndex = 0
    this.type = AIR_TYPE
  }
}

class Air extends Entity {
  constructor () {
    super()
    this.block = false
    this.destructible = false
    this.type = AIR_TYPE
  }
}

class Block extends Entity {
  constructor () {
    super()
    this.block = true
    this.destructible = false
    this.type = BLOCK_TYPE
  }
}

class Brick extends Entity {
  constructor () {
    super()
    this.block = true
    this.destructible = true
    this.type = BRICK_TYPE
  }
}

class Player extends Entity {
  constructor (id) {
    super(id)
    this.id = id
    this.block = false
    this.destructible = true
    this.zIndex = 10
    this.type = PLAYER_TYPE
  }
}

const AIR_TYPE = 'Air'
const BRICK_TYPE = 'Brick'
const BLOCK_TYPE = 'Block'
const PLAYER_TYPE = 'Player'

const types = {
  AIR_TYPE,
  BRICK_TYPE,
  BLOCK_TYPE,
  PLAYER_TYPE
}

module.exports = {
  Entity, Air, Block, Brick, Player, types
}
