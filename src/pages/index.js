import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout/Layout'
import GameStateManager from '../components/game/GameStateManager'

const IndexPage = () => (
  <Layout>
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <GameStateManager />
  </Layout>
)

export default IndexPage
