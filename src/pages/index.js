import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout/Layout'
import GameStateManager from '../components/game/GameStateManager'

const IndexPage = () => (
  <Layout>
    <GameStateManager />
  </Layout>
)

export default IndexPage
