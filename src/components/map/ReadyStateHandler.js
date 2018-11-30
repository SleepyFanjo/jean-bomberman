import React from 'react'
import styled from 'styled-components'

import theme from '../../theme'
import { GameContext } from '../game/game-context'
import Button from '../shared/Button'

const Mask = styled.div`
  position: absolute;
  z-index: 10;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  background-color: rgba(0, 0, 0, 0.3);
  align-items: center;
  justify-content: center;
`

const ReadyDiv = styled.div`
  background: white;
  padding: 20px;

  & > span {
    color: ${theme.primaryColor};
    font-size: 2rem;
  }
`

const ButtonContainer = styled.div`
  display: inline-block;
  margin: 0 16px 0 0;
  vertical-align: top;
`

const ButtonGroupContainer = styled.div`
  margin-top: 20px;
  vertical-align: top;
`

export default class ReadyStateHandler extends React.Component {
  render () {
    return (
      <GameContext.Consumer>
        {
          game => (
            <Mask>
              <ReadyDiv>
                <span>{ game.count }</span> players in the room<br />
                Waiting for everyone to be ready
                <ButtonGroupContainer>
                  <ButtonContainer>
                    <Button primary disabled={game.ready} onClick={game.actions.setReady}>
                      { game.ready ? 'You are ready !' : 'Ready ?' }
                    </Button>
                  </ButtonContainer>
                  <ButtonContainer>
                    <Button secondary disabled={!game.ready} onClick={game.actions.setNotReady}>
                      Cancel
                    </Button>
                  </ButtonContainer>
                </ButtonGroupContainer>
              </ReadyDiv>
            </Mask>
          )
        }
      </GameContext.Consumer>
    )
  }
}
