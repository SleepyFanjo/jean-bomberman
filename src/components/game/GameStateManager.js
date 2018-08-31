import React from 'react'

import { GameContext } from './game-context'
import GameManager from './GameManager'

import makeCancelable from '../../utils/makeCancelable'
import { randomizerInit } from '../../utils/randomizer'
import buildMap from '../map/map-generator'

export default class GameStateManager extends React.Component {
  constructor (props) {
    super(props)

    const seed = Math.floor(Math.random() * 1000000) + 1

    this.state = {
      seed: seed,
      randomizer: randomizerInit(seed),
      resetSeed: this.resetSeed,
      renewSeed: this.renewSeed,
      map: undefined
    }
  }

  componentDidMount () {
    this.mapPromise = makeCancelable(
      buildMap(this.state.randomizer)
      .then((map) => {
        this.setState({
          map
        })
      })
    )
  }

  componentWillUnmount () {
    this.mapPromise.cancel()
  }

  renewSeed = () => {
    const seed = Math.floor(Math.random() * 1000000) + 1

    this.resetSeed(seed)
  }

  resetSeed = (seed) => {
    const randomizer = randomizerInit(seed)
    this.setState({
      seed: seed,
      randomizer: randomizer,
      map: undefined,
    })

    this.mapPromise = makeCancelable(
      buildMap(randomizer)
      .then((map) => {
        this.setState({
          map
        })
      })
    )
  }

  render () {
    return (
      <GameContext.Provider value={this.state}>
        <GameManager />
      </GameContext.Provider>
    )
  }
}
