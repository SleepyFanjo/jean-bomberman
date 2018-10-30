import tiles from '../components/map/tiles'

class Entity {
  constructor () {
    this.block = null
    this.destructible = null
    this.zIndex = 0
    this.tile = tiles.BaseTile
  }
}

class Air extends Entity {
  constructor () {
    super()
    this.block = false
    this.destructible = false
    this.tile = tiles.AirTile
  }
}

class Block extends Entity {
  constructor () {
    super()
    this.block = true
    this.destructible = false
    this.tile = tiles.BlockTile
  }
}

class Brick extends Entity {
  constructor () {
    super()
    this.block = true
    this.destructible = Air
    this.tile = tiles.BrickTile
  }
}

class Player extends Entity {
  constructor () {
    super()
    this.block = false
    this.destructible = Air
    this.zIndex = 10
  }
}

export default {
  Entity, Air, Block, Brick, Player
}
