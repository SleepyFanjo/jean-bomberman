import React from 'react'
import styled from 'styled-components'

import theme from '../../theme'

const getColorFromProps = (props) => (
  props.primary
  ? theme.primary[props.variant]
  : props.secondary
  ? theme.secondary[props.variant]
  : theme.primary.normal
)

const StyledButton = styled.button`
  background-color: ${props => (
    props.bordered
    ? 'transparent'
    : getColorFromProps(props)
  )};
  color: ${props => (
    props.bordered || props.variant === 'light' || props.variant === 'lighter'
    ? getColorFromProps(props)
    : '#fff'
  )};
  border: ${props => (
    props.bordered
    ? '2px solid ' + getColorFromProps(props)
    : 'none'
  )};
  border-radius: 15px;
  height: 56px;
  line-height: 56px;
  padding: 0 8px;
  outline: none;
`

const Button = (props) => {
  return (
    <StyledButton
      {...props}
    >
      {props.children}
    </StyledButton>
  )
}

Button.defaultProps = {
  variant: 'normal',
  primary: true
}

export default Button
