import React from 'react'
import styled, { keyframes } from 'styled-components'
import theme from '../../theme'

const CenteredContainer = styled.div`
  width: 70px;
  height: 70px;
  margin: 60px auto;
  position: relative;
`

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

export default class GameLoader extends React.Component {
  render () {
    return (
      <CenteredContainer>
        <RedFlame />
        <WhiteFlame />
        <BlueFlame />
      </CenteredContainer>
    )
  }
}
