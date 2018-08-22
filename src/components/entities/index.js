class Entity {
  constructor () {
    this.block = null
    this.destructible = null
    this.zIndex = 0
  }
}

class Air extends Entity {
  constructor () {
    super()
    this.block = false
    this.destructible = false
  }
}

class Block extends Entity {
  constructor () {
    super()
    this.block = true
    this.destructible = false
  }
}

class Brick extends Entity {
  constructor () {
    super()
    this.block = true
    this.destructible = Air
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
