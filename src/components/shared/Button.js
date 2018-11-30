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
  border-radius: 5px;
  height: 56px;
  line-height: 56px;
  padding: 0 8px;
  outline: none;
  text-transform: uppercase;
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12);
  &:hover {
    cursor: pointer;
  }
`

const Button = React.memo((props) => {
  return (
    <StyledButton
      {...props}
    >
      {props.children}
    </StyledButton>
  )
})

Button.defaultProps = {
  variant: 'normal'
}

export default Button
