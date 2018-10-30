// inspired from https://ui.reach.tech/window-size

import React from 'react'
import debounce from 'debounce'

export default class WindowSize extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      width: document.body.clientWidth,
      height: window.innerHeight
    }

    this.resize = debounce(this.resize, 200)
  }

  componentDidMount () {
    window.addEventListener("resize", this.resize)
  }

  componentWillUnmount () {
    window.removeEventListener("resize", this.resize)
  }

  resize = () => {
    this.setState({
      width: document.body.clientWidth,
      height: window.innerHeight
    })
  }

  render () {
    return this.props.children(this.state)
  }
}
