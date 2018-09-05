import React from 'react'
import styled, { keyframes } from 'styled-components'
import theme from '../../theme'

const WAITING = 'waiting'
const OUT = 'out'
const HIDE = 'hide'

const blueAnimation = keyframes`
  0% { transform: rotate(-135deg) scale(1.5, 1.5); }
  25% { transform: rotate(-135deg) scale(1.5, 1.5) skew(14deg, 0deg); }
  50% { transform: rotate(-135deg) scale(1.5, 1.5); }
  75% { transform: rotate(-125deg) scale(1.5, 1.5) skew(-14deg, 0deg); left: 33px; top: 18px; }
  100% { transform: rotate(-135deg) scale(1.5, 1.5); }
`

const whiteAnimation = keyframes`
  0% { transform: rotate(-135deg) scale(1.5, 1.5); }
  25% { transform: rotate(-135deg) scale(1.5, 1.5) skew(14deg, 0deg); }
  50% { transform: rotate(-135deg) scale(1.5, 1.5); }
  75% { transform: rotate(-125deg) scale(1.5, 1.5) skew(-14deg, 0deg); left: 19px; top: 14px; }
  100% { transform: rotate(-135deg) scale(1.5, 1.5); }
`

const redAnimation = keyframes`
0% { transform: rotate(-135deg) scale(1.5, 1.5); }
25% { transform: rotate(-135deg) scale(1.5, 1.5) skew(14deg, 0deg); }
50% { transform: rotate(-135deg) scale(1.5, 1.5); }
75% { transform: rotate(-125deg) scale(1.6, 1.5) skew(-14deg, 0deg); }
100% { transform: rotate(-135deg) scale(1.5, 1.5); }
`

const loadingTextKeyframes = keyframes`
  0%, 100% { width: 0; }
  50% { width: 100%; }
`

const wireWaitingKeyframes = keyframes`
  0% { transform: translateX(46px); }
  100% { transform: translateX(0px); }
`

const wireOutKeyframes = keyframes`
  0% { width: calc(100% - 262px); left: 62px; }
  100% { width: 0; left: calc(100% - 200px); }
`

const flameOutKeyframes = keyframes`
  0% { left: 0; }
  100% { left: calc(100% - 262px); }
`

const wireWaitingAnimation = `${wireWaitingKeyframes} 1s linear infinite`
const wireOutAnimation = `${wireOutKeyframes} .8s linear`
const flameOutAnimation = `${flameOutKeyframes} .8s linear`

const CenteredContainer = styled.div`
  width: 50%;
  max-width: 600px;
  height: 200px;
  margin: 60px auto;
  position: relative;
`

const Flame = styled.div`
  position: absolute;
  bottom: 0;
  border-bottom-right-radius: 50%;
  border-bottom-left-radius: 50%;
  border-top-left-radius: 50%;
`

const RedFlame = styled(Flame)`
  top: 10px;
  left: 5px;
  width: 50px;
  height: 50px;
  background: ${theme.secondaryColor};
  animation: ${redAnimation} 1.4s linear infinite;
`

const WhiteFlame = styled(Flame)`
  top: 15px;
  left: 18px;
  width: 40px;
  height: 40px;
  background: #fff;
  animation: ${whiteAnimation} 1.4s linear infinite;
`

const BlueFlame = styled(Flame)`
  top: 20px;
  left: 30px;
  width: 30px;
  height: 30px;
  background: ${theme.primaryColor};
  animation: ${blueAnimation} 1.4s linear infinite;
`

const FlameContainer = styled.div`
  position: absolute;
  left: 0;
  top: 65px;
  width: 70px;
  height: 70px;
  z-index: 2;
  animation: ${
    props => props.animation === OUT
    ? flameOutAnimation
    : 'none'
  };
`

const WireContainer = styled.div`
  position: absolute;
  left: 62px;
  top: 85px;
  width: calc(100% - 262px);
  height: 30px;
  background: brown;
  z-index: 1;
  overflow: hidden;
  animation: ${
    props => props.animation === OUT
    ? wireOutAnimation
    : 'none'
  }
`

const Wire = styled.div`
  position: absolute;
  left: -46px;
  right: 0px;
  top: 0;
  bottom: 0;
  z-index: -1;
  background: repeating-linear-gradient(-55deg,#d4b293 1px,#c79d7a 2px,#c79d7a 11px,#ffd4ad 12px,#ffd4ad 20px);
  animation: ${
    props => props.animation === WAITING
    ? wireWaitingAnimation
    : 'none'
  };
`
const BombContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 200px;
  height: 200px;
`
const BombHead = styled.div`
  height: 60px;
  width: 30px;
  position: absolute;
  left: -10px;
  background: black;
  top: 70px;
  border-radius: 5px;
  border: 4px solid #828282;
`
const BombCircle = styled.div`
  height: 100%;
  width: 100%;
  background: black;
  border: 8px solid #828282;
  border-radius: 50%;
`
const BombShadow = styled.div`
  height: 43%;
  width: 43%;
  position: absolute;
  background: white;
  top: 10px;
  border-radius: 50%;
  left: 36px;
`

const LoadingTextContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
`

const LoadingText = styled.div`
  position: relative;
  display: inline-block;
  font-size: 2em;
  line-height: 2em;
  color: #d4d4d4;

  &:before {
    content: 'Loading';
    position: absolute;
    overflow: hidden;
    white-space: nowrap;
    width: 0;
    color: ${theme.secondaryColor};
    animation: ${loadingTextKeyframes} 4s infinite
  }
`

export default class GameLoader extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      animation: WAITING
    }
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevProps.open === true && this.props.open === false) {
      this.setState({
        animation: OUT
      })

      setTimeout(() => {
        this.setState({
          animation: HIDE
        })
      }, 800)
    }
  }

  render () {
    if (this.state.animation === HIDE) {
      return null
    }
    return (
      <CenteredContainer>
        <FlameContainer animation={this.state.animation}>
          <RedFlame />
          <WhiteFlame />
          <BlueFlame />
        </FlameContainer>
        <WireContainer animation={this.state.animation}>
          <Wire animation={this.state.animation}/>
        </WireContainer>
        <BombContainer>
          <BombHead />
          <BombCircle>
            <BombShadow />
          </BombCircle>
        </BombContainer>
        <LoadingTextContainer><LoadingText>Loading</LoadingText></LoadingTextContainer>
      </CenteredContainer>
    )
  }
}
