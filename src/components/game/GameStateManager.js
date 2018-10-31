import React from 'react'

import { GameContext } from './game-context'
import GameManager from './GameManager'

import ws from '../../utils/websocket'
import * as actions from '../../../action-constants'

export default class GameStateManager extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      seed: null,
      resetSeed: this.resetSeed,
      renewSeed: this.renewSeed,
      map: undefined
    }
  }

  componentDidMount () {
    ws.client.onmessage = function(e) {
      if (typeof e.data === 'string') {
        const action = JSON.parse(e.data)

        this.handleAction(action)
      }
    }.bind(this)

    ws.createRoom()
  }

  handleAction = (action) => {
    switch (action.type) {
      case actions.DATA_MAP:
        this.handleMapReceived(action)
        break
      case actions.DATA_ROOM_ID:
        this.handleSeedReceived(action)
        break
      default:
        break
    }
  }

  handleMapReceived = (action) => {
    console.log(action)
    this.setState({
      map: action.map
    })
  }

  handleSeedReceived = (action) => {
    this.setState({
      seed: action.seed
    })
  }

  renewSeed = () => {
    ws.createRoom()
  }

  resetSeed = (seed) => {
    ws.joinRoom(seed)
  }

  render () {
    return (
      <GameContext.Provider value={this.state}>
        <GameManager />
      </GameContext.Provider>
    )
  }
}
