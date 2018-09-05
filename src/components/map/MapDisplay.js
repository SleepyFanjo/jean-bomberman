import React from 'react'
import styled from 'styled-components'

export default class MapDisplay extends React.Component {
  render () {
    const {width, height} = this.props
    return (
      <div>Width: {width}, height: {height}</div>
    )
  }
}
