import React from 'react'

import { GameContext } from './game-context'
import GameManager from './GameManager'

import { randomizerInit } from './randomizer'

export default class GameStateManager extends React.Component {
  constructor (props) {
    super(props)

    const seed = Math.floor(Math.random() * 1000000) + 1

    this.state = {
      seed: seed,
      randomizer: randomizerInit(seed),
      resetSeed: this.resetSeed,
      renewSeed: this.renewSeed
    }
  }

  renewSeed = () => {
    const seed = Math.floor(Math.random() * 1000000) + 1

    this.resetSeed(seed)
  }

  resetSeed = (seed) => {
    this.setState({
      seed: seed,
      randomizer: randomizerInit(seed)
    })
  }

  render () {
    return (
      <GameContext.Provider value={this.state}>
        <GameManager />
      </GameContext.Provider>
    )
  }
}
