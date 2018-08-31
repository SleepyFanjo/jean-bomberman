import React from 'react'
import { GameContext } from './game-context'

import SeedManager from './SeedManager'
import GameLoader from '../shared/GameLoader'

export default class GameManager extends React.Component {
  render () {
    return (
      <GameContext.Consumer>
        {
          game => (
            <React.Fragment>
              <SeedManager {...game}  />
              <GameLoader open={!!game.map} />
              {
                game.map
                ? <div>map loaded</div>
                : null
              }
            </React.Fragment>
          )
        }
      </GameContext.Consumer>
    )
  }
}
