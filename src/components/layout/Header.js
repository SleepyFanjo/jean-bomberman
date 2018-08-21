import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

import theme from '../theme'
import jambonBeurre from '../../images/jambon-beurre.png'

const StrippedHeader = styled.div`
  background: linear-gradient(
    90deg,
    ${theme.primaryColor},
    ${theme.primaryColor} 33.333%,
    white 33.333%,
    white 66.666%,
    ${theme.secondaryColor} 66.666%
  );
`

const StrippedMatchTextContainer = styled.div`
  margin: 0 auto;
  padding: 1.45rem 1.0875rem;
  background-image: linear-gradient(
    90deg,
    white,
    white 33.333%,
    ${theme.primaryColor} 33.333%,
    ${theme.primaryColor} 66.666%,
    white 66.666%);
  background-clip: text;
  -webkit-background-clip: text;
  text-align: center;
`

const NoMarginH1 = styled.h1`
    margin: 0
`

const ImageContainer = styled.div`
    text-align: center;
`

const Image = styled.img`
    width: 20%;
    max-width: 200px;
    margin-top: 10px;
    margin-bottom: 10px;
`

const Header = ({ siteTitle }) => (
  <React.Fragment>
    <StrippedHeader>
      <StrippedMatchTextContainer>
        <NoMarginH1>
          <Link
            to="/"
            style={{
              color: 'transparent',
              textDecoration: 'none',
            }}
          >
            {siteTitle}
          </Link>
        </NoMarginH1>
      </StrippedMatchTextContainer>
    </StrippedHeader>
    <ImageContainer>
      <Image src={jambonBeurre} />
    </ImageContainer>
  </React.Fragment>
)

export default Header
