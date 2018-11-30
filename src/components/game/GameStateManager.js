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
      map: undefined,
      ready: false,
      count: 1
    }
  }

  componentDidMount () {
    ws.client.onmessage = function(e) {
      if (typeof e.data === 'string') {
        const action = JSON.parse(e.data)

        console.log(action)
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
      case actions.DATA_GAME_STARTED:
        this.handleGameStarted(action.started)
        break
      case actions.DATA_PLAYER_COUNT:
        this.updatePlayerCount(action.count)
        break
      default:
        break
    }
  }

  updatePlayerCount = (count) => {
    this.setState({
      count: count
    })
  }

  handleGameStarted = (started) => {
    this.setState({
      started: started
    })
  }

  handleMapReceived = (action) => {
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

  setReady = () => {
    this.setState({
      ready: true
    })
  }

  setNotReady = () => {
    this.setState({
      ready: false
    })
  }

  render () {
    return (
      <GameContext.Provider
        value={{
          ...this.state,
          actions: {
            renewSeed: this.renewSeed,
            resetSeed: this.resetSeed,
            setReady: this.setReady,
            setNotReady: this.setNotReady
          }
        }}
      >
        <GameManager />
      </GameContext.Provider>
    )
  }
}
