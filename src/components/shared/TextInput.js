import React from 'react'

export default class TextInput extends React.Component {
  handleChange = (event) => {
    this.props.onChange && this.props.onChange(event, event.target.value)
  }

  render () {
    return (
      <div>
        <input type='text' {...this.props} placeholder={this.props.label} onChange={this.handleChange} />
      </div>
    )
  }
}
