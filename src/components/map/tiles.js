import styled, { keyframes } from 'styled-components'
import React from 'react'

import { orientations } from '../../entities'
import playerSprite from '../../images/player-sprite.png'

const BaseTile = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: ${props => props.index};
  display: flex;
  justify-content: center;
`

const AirTile = styled(BaseTile)`
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAMUlEQVQoU2NkQAW+DAwMm9HEwFxGqCBMAdEKsRmGYiKyAqymwqwmSyFW67GZONgUAgB7CgYLaxELLAAAAABJRU5ErkJggg==);
  background-color: green;
`

const BlockTile = styled(BaseTile)`
  background-color: #cacaca;
  box-shadow: inset 0px 0px 0px 8px #404040;
`

const BrickTile = styled(BaseTile)`
  background-color: silver;
  background-image: linear-gradient(335deg, #e09145 23px, transparent 23px),
    linear-gradient(155deg, #e1a265 23px, transparent 23px),
    linear-gradient(335deg, #e09145 23px, transparent 23px),
    linear-gradient(155deg, #e1a265 23px, transparent 23px);
  background-size: 58px 58px;
  background-position: 0px 2px, 4px 35px, 29px 31px, 34px 6px;
  box-shadow: inset -1px -1px 5px #6b3400;
`

const playerMoving = (props) => {
  return keyframes`
    100% {
      background-position: ${getXOrientationOffset(props.orientation) - 94}px ${getYOrientationOffset(props.orientation)}px;
    }
  `
}

const PlayerSprite = styled.div`
  position: relative;
  height: 32px;
  width: 20px;
  background: url(${playerSprite}) ${props => getXOrientationOffset(props.orientation)}px ${props => getYOrientationOffset(props.orientation)}px;
  transform: scale(${props => props.size / 32});
  transform-origin: top;

  &.moving {
    animation: ${playerMoving} 1s steps(5);
  }

  &::after {
    content: 'Me';
    position: absolute;
    font-size: 0.4rem;
    color: red;
    top: -16px;
    left: 24%;
  }
`

const getXOrientationOffset = (orientation) => {
  switch (orientation) {
    case orientations.UP:
    case orientations.DOWN:
      return 0
    case orientations.LEFT:
    case orientations.RIGHT:
      return 110
    default:
      return 0
  }
}

const getYOrientationOffset = (orientation) => {
  switch (orientation) {
    case orientations.DOWN:
    case orientations.RIGHT:
      return 0
    case orientations.UP:
    case orientations.LEFT:
      return 31
    default:
      return 0
  }
}

const PlayerTile = (player, playerId) => {
  return (props) => {
    return (
      <BaseTile index={props.index}>
        <PlayerSprite className='moving' isMe={player.id === playerId} orientation={player.orientation} size={props.size} />
      </BaseTile>
    )
  }
}

export default {
  BaseTile, AirTile, BlockTile, BrickTile, PlayerTile
}
