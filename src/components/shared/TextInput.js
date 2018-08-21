import React from 'react'
import styled from 'styled-components'

import theme from '../theme'

const Input = styled.input`
  &:focus, &:active {
    border-bottom: 2px solid ${theme.primaryColor};
  };

  border: none;
  width: 100%;
  height: 56px;
  line-height: 56px;
  padding-left: 3px;
  outline: none;
`

export default class TextInput extends React.Component {
  handleChange = (event) => {
    this.props.onChange && this.props.onChange(event, event.target.value)
  }

  render () {
    return (
      <div>
        <Input type='text' {...this.props} placeholder={this.props.label} onChange={this.handleChange} />
      </div>
    )
  }
}
