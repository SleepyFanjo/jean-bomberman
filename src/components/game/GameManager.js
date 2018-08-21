import React from 'react'
import { GameContext } from './game-context'

import SeedManager from './SeedManager'

export default class GameManager extends React.Component {
  render () {
    return (
      <GameContext.Consumer>
        {
          game => (
            <SeedManager {...game}  />
          )
        }
      </GameContext.Consumer>
    )
  }
}
