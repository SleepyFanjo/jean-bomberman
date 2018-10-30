import styled from 'styled-components'

const BaseTile = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  zIndex: ${props => props.index};
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

export default {
  BaseTile, AirTile, BlockTile, BrickTile
}
