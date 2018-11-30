import React from 'react'
import styled from 'styled-components'

import { GameContext } from '../game/game-context'
import Button from '../shared/Button'

const ButtonContainer = styled.div`
  display: inline-block;
  margin: 0 8px;
  vertical-align: top;
`

const ButtonGroupContainer = styled.div`
  display: inline-block;
  vertical-align: top;
`

export default class ReadyStateHandler extends React.Component {
  render () {
    return (
      <GameContext.Consumer>
        {
          game => (
            <div className='ready-state'>
              <div className='ready-header'>
                <span>{ game.count }</span> players in the room<br />
                Waiting for everyone to be ready
                <ButtonGroupContainer>
                  <ButtonContainer>
                    <Button primary disabled={game.ready} onClick={game.actions.setReady}>
                      { game.ready ? 'You are ready !' : 'Ready ?' }
                    </Button>
                  </ButtonContainer>
                  <ButtonContainer>
                    <Button danger disabled={!game.ready} onClick={game.actions.setNotReady}>
                      Cancel
                    </Button>
                  </ButtonContainer>
                </ButtonGroupContainer>
              </div>
            </div>
          )
        }
      </GameContext.Consumer>
    )
  }
}
