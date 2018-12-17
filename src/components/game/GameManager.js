import React from 'react'
import { GameContext } from './game-context'

import SeedManager from './SeedManager'
import MapDisplay from '../map/MapDisplay'
import GameLoader from '../shared/GameLoader'
import WindowSize from '../shared/WindowSize'

export default class GameManager extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      animationEnd: false
    }
  }

  handleAnimationEnd = () => {
    this.setState({
      animationEnd: true
    })
  }

  handleAnimationRestart = () => {
    this.setState({
      animationEnd: false
    })
  }

  handleKeyDown = (event) => {
    console.log(event.altKey, event.charCode, event.ctrlKey, event.key, event.keyCode, event.shiftKey)
  }

  handleKeyUp = () => {

  }

  render () {
    return (
      <GameContext.Consumer>
        {
          game => (
            <React.Fragment>
              <SeedManager seed={game.seed} resetSeed={game.actions.resetSeed} renewSeed={game.actions.renewSeed}  />
              <GameLoader open={!game.map} onAnimationEnd={this.handleAnimationEnd} onAnimationRestart={this.handleAnimationRestart} />
              {
                game.map && this.state.animationEnd
                ? <WindowSize>
                  {
                    ({width, height}) => <MapDisplay onKeyDown={this.handleKeyDown} onKeyUp={this.handleKeyUp} playerId={game.playerId} started={game.started} gameMap={game.map} width={width} height={height} />
                  }
                </WindowSize>
                : null
              }
            </React.Fragment>
          )
        }
      </GameContext.Consumer>
    )
  }
}
