import axios from 'axios'
import React, { useState, useEffect } from 'react'
import AliceCarousel from 'react-alice-carousel'
import NumberFormat from 'react-number-format'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { trendingCoins } from '../../config/api'

const Carousel = (props) => {
  console.log(props.currency)
  const [data, setData] = useState([])

  const classes = {
    carousel: {
      height: '50%',
      display: 'flex',
      alignItems: 'center',
      width:'70vw'
    },
    carouselItem: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      cursor: 'pointer',
      textTransform: 'uppercase',
      color: 'white',
    },
  }


  const getList = async () => {
    const lists = await axios.get(trendingCoins(props.currency))
    setData(lists.data)
  }
  useEffect(() => {
    getList()
  }, [props.currency])

  const items = data.map((coin) => {
    let profit = coin.price_change_percentage_24h >= 0 // boolean value
    return (
      <Link style={classes.carouselItem} to={`/coins/${coin.id}`}>
        <img
          src={coin?.image}
          alt={coin.name}
          height="80"
          style={{ marginBottom: 10 }}
        />

        <span>
          {coin?.symbol}
          &nbsp;
          <span
            style={{
              color: profit > 0 ? 'rgb(14, 203, 129)' : 'red',
              fontWeight: 500,
            }}
          >
            {profit && '+'}
            {coin.price_change_percentage_24h?.toFixed(2)}%
          </span>
        </span>
        <span style={{ fontSize: '23px', fontWeight: 500 }}>
          {
            <NumberFormat
            thousandsGroupStyle="thousand"
            value={coin.current_price}
            prefix={props.symbol}
            decimalSeparator="."
            displayType="text"
            type="text"
            thousandSeparator={true}
          />
          }
        </span>
      </Link>
    )
  })
  const responsive = {
    0: {
      items: 1,
    },
    512: {
      items: 3,
    },
    1024: {
      items: 4,
    },
  }
  return (
    <div style={classes.carousel}>
      <AliceCarousel
        mouseTracking
        infinite={true}
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        items={items}
        autoPlay
      />
    </div>
  )
}

const mapStateToProps = ({ currency, symbol }) => {
  return { currency, symbol }
}
export default connect(mapStateToProps)(Carousel)
