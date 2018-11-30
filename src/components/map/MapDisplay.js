import React from 'react'
import styled from 'styled-components'

import * as settings from '../../settings'
import tiles from './tiles'
import { types } from '../../entities'

import ReadyStateHandler from './ReadyStateHandler'

/*
 * Here we make map responsive using js and computing the size on window resize event (debounced)
 * instead of just using css % and viewport units
 * to make items position and movements easier to manage (for collision detection, etc)
 *
 * @TODO: It might be possible to use css for responsiveness
 */

const MapWrapper = styled.div`
  height: ${props => props.height}px;
  width: ${props => props.width}px;
  display: flex;
  align-items: center;
  justify-content: center;
`

// add 2 to size to account for the 1px border
const MapContainer = styled.div`
  position: relative;
  width: ${props => props.width + 2}px;
  height: ${props => props.height + 2}px;
  border: 1px solid #000;
`

const Line = styled.div`
  height: ${props => props.height}px;
`

const TileGroup = styled.div`
  height: ${props => props.size}px;
  width: ${props => props.size}px;
  display: inline-block;
  position: relative;
`

export default class MapDisplay extends React.Component {
  /*
   * Compute map container size, accounting for screen size and map aspect ratio
   * This ensure that map displays entirely on every screen
   */
  getMapContainerSize (windowWidth, windowHeight) {
    let mapWidth = 0.9 * windowWidth
    let mapHeight = mapWidth * settings.MAP_HEIGHT / settings.MAP_WIDTH

    // If aspect ratio and window width makes map height too big (window height + a little space for game info) , scale map based on height instead
    if (mapHeight > windowHeight - 100) {
      mapHeight = windowHeight - 100
      mapWidth = mapHeight * settings.MAP_WIDTH / settings.MAP_HEIGHT
    }

    return {mapWidth, mapHeight}
  }

  getTile (entity) {
    switch (entity.type) {
      case types.AIR_TYPE:
        return tiles.AirTile
      case types.BRICK_TYPE:
        return tiles.BrickTile
      case types.BLOCK_TYPE:
        return tiles.BlockTile
      default:
        return tiles.AirTile
    }
  }

  render () {
    const {width, height, gameMap, started} = this.props
    const { mapWidth, mapHeight } = this.getMapContainerSize(width, height)
    const tileSize = mapHeight / settings.MAP_HEIGHT

    return (
      <MapWrapper width={width} height={height}>
        <MapContainer width={mapWidth} height={mapHeight}>
          {
            !started
            ? <ReadyStateHandler />
            : null
          }
          {
            gameMap.map((line, y) => {
              return (
                <Line height={tileSize} key={y}>
                {
                  line.map((tileGroup, x) => {
                    return (
                      <TileGroup size={tileSize} key={x}>
                        {
                          tileGroup.map((entity, index) => {
                            const Tile = this.getTile(entity)
                            return (
                              <Tile key={index} index={index} />
                            )
                          })
                        }
                      </TileGroup>
                    )
                  })
                }
                </Line>
              )
            })
          }
        </MapContainer>
      </MapWrapper>
    )
  }
}
