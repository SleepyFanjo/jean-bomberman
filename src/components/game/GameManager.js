import React from 'react'
import { GameContext } from './game-context'

import SeedManager from './SeedManager'
import GameLoader from '../shared/GameLoader'

export default class GameManager extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      open: true
    }

    window.setTimeout(() => {
      this.setState({
        open: false
      })
    }, 10000)
  }
  render () {
    return (
      <GameContext.Consumer>
        {
          game => (
            <React.Fragment>
              <SeedManager {...game}  />
              <GameLoader open={this.state.open} />
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
