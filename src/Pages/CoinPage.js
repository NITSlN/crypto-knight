import React, { useState, useEffect } from 'react'
import axios from 'axios'

import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import { SingleCoin } from '../config/api'
import { LinearProgress, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import CoinInfo from '../components/CoinInfo'
import ReactHtmlParser from 'react-html-parser'
import NumberFormat from 'react-number-format'
const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    '@media (max-width: 1280px)': {
      flexDirection: 'column',
      alignItems: 'center',
    },
  },
  heading: {
    display: 'flex',
    alignItems: 'center',
    fontFamily: 'Montserrat',
    marginBottom: '20px',
  },
  sidebar: {
    borderRight: '2px solid grey',
    width: '35vw',
    '@media (max-width: 1280px)': {
      width: '100%',
    },
    marginTop: '25px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  description: {
    fontFamily: 'Montserrat',
    textAlign: 'justify',
    padding: 25,
    paddingBottom: 15,
  },

  marketData: {
    alignSelf: 'start',
    padding: 25,
    paddingTop: 10,
    width: '100%',
    '@media (max-width: 1280px)': {
      display: 'flex',
      justifyContent: 'space-around',
    },
    '@media (max-width: 920px)': {
      flexDirection: 'column',
      alignItems: 'center',
    },
    '@media (max-width: 600px)': {
      alignItems: 'start',
    },
  },
}))

function CoinPage({ currency, symbol }) {
  const { id } = useParams()
  const [coin, setCoin] = useState()
  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id))
    setCoin(data)
  }

  useEffect(() => {
    fetchCoin()
  }, [])

  const classes = useStyles()

  if (!coin) return <LinearProgress style={{ backgroundColor: 'gold' }} />

  return (
    <div className={classes.container}>
      <div className={classes.sidebar}>
        <img
          src={coin?.image.large}
          alt={coin?.name}
          height="200"
          style={{ marginBottom: 20 }}
        />
        <Typography variant="h3" fontWeight={700} className={classes.heading}>
          {coin?.name}
        </Typography>
        <Typography className={classes.description}>
          {ReactHtmlParser(coin?.description.en.split('. ')[0])}.
        </Typography>

        <div className={classes.marketData}>
          <span style={{ display: 'flex' }}>
            <Typography variant="h5" className={classes.heading}>
              Rank:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: 'Montserrat',
              }}
            >
              {coin?.market_cap_rank}
            </Typography>
          </span>
          <span style={{ display: 'flex' }}>
            <Typography variant="h5" className={classes.heading}>
              Coin Price:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: 'Montserrat',
              }}
            >
              {symbol}{' '}
              {
                <NumberFormat
                  thousandsGroupStyle="thousand"
                  value={
                    coin?.market_data.current_price[currency.toLowerCase()]
                  }
                  decimalSeparator="."
                  displayType="text"
                  type="text"
                  thousandSeparator={true}
                />
              }
            </Typography>
          </span>
          <span
            style={{
              display: 'flex',
              '@media (max-width:1280px)': { flexDirection: 'column' },
            }}
          >
            <Typography variant="h5" className={classes.heading}>
              Market Cap:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: 'Montserrat',
              }}
            >
              {symbol}{' '}
              {
                <NumberFormat
                  thousandsGroupStyle="thousand"
                  value={coin?.market_data.market_cap[currency.toLowerCase()]
                    .toString()
                    .slice(0, -6)}
                  decimalSeparator="."
                  displayType="text"
                  type="text"
                  thousandSeparator={true}
                />
              }{' '}
              M
            </Typography>
          </span>
        </div>
      </div>
      {/* chart */}
      <CoinInfo coin={coin} />
    </div>
  )
}

const mapStateToProps = ({ currency, symbol }) => {
  return { currency, symbol }
}

export default connect(mapStateToProps)(CoinPage)
