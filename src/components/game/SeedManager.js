import React from 'react'
import styled from 'styled-components'

import theme from '../theme'
import TextInput from '../shared/TextInput'
import Button from '../shared/Button'

const SeedManagerContainer = styled.div`
  margin-bottom: 20px;
  padding: 20px;
  background-color: ${theme.primary.lighter}
`

const TextInputContainer = styled.div`
  display: inline-block;
  width: 100%;
  max-width: 180px;
  vertical-align: top;
`

const ButtonContainer = styled.div`
  display: inline-block;
  margin: 0 8px;
  vertical-align: top;
`

const ButtonGroupContainer = styled.div`
  display: inline-block;
  vertical-align: top;
`

export default class SeedManager extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      seed: undefined,
      prevSeed: props.seed
    }
  }

  static getDerivedStateFromProps = (props, state) => {
    if (props.seed !== state.prevSeed) {
      return {
        seed: undefined,
        prevSeed: props.seed
      }
    }

    return null
  }

  handleSeedChange = (event, value) => {
    this.setState({
      seed: value
    })
  }

  updateSeed = () => {
    if (this.state.seed && parseInt(this.state.seed)) {
      this.props.resetSeed(parseInt(this.state.seed))
    }
  }

  randomizeSeed = () => {
    this.props.renewSeed()
  }

  render () {
    return (
      <SeedManagerContainer>
        <TextInputContainer>
          <TextInput name='seed' value={this.state.seed === undefined ? this.props.seed : this.state.seed} onChange={this.handleSeedChange} label='Integer number seed' />
        </TextInputContainer>
        <ButtonGroupContainer>
          <ButtonContainer>
            <Button primary onClick={this.updateSeed}>
              Set seed
            </Button>
          </ButtonContainer>
          <ButtonContainer>
            <Button primary onClick={this.randomizeSeed}>
              New seed
            </Button>
          </ButtonContainer>
        </ButtonGroupContainer>
      </SeedManagerContainer>
    )
  }
}
