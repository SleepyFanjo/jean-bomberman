// inspired from https://ui.reach.tech/window-size

import React from 'react'
import debounce from 'debounce'

export default class WindowSize extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      width: window.innerWidth,
      height: window.innerHeight
    }

    this.resize = debounce(this.resize, 200)
  }

  componentDidMount () {
    this.listener = window.addEventListener("resize", this.resize)
  }

  componentWillUnmount () {
    window.removeEventListener(this.listener)
  }

  resize = () => {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight
    })
  }

  render () {
    return this.props.children(this.state)
  }
}
