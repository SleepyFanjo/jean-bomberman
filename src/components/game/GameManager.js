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
      open: true
    }

    window.setTimeout(() => {
      this.setState({
        open: false
      })
    }, 1000)
  }
  render () {
    return (
      <GameContext.Consumer>
        {
          game => (
            <React.Fragment>
              <SeedManager {...game}  />
              <GameLoader open={!game.map} />
              {
                game.map
                ? <WindowSize>
                  {
                    ({width, height}) => <MapDisplay map={game.map} width={width} height={height} />
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
