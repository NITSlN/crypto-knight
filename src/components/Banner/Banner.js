import { Container, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
import Carousel from './Carousel'

export default function Banner() {
  const useStyles = makeStyles({
    banner: {
      background:
        'url(https://images.unsplash.com/photo-1547127796-06bb04e4b315?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80) fixed center bottom',
    },
    bannerContent: {
      height: '60vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-around',
      alignItems: 'center',
    },
    tagline: {
      display: 'flex',
      height: '40%',
      flexDirection: 'column',
      justifyContent: 'center',
      textAlign: 'center',
      color: 'grey',
    },
    heading: {
      fontWeight: 'bold',
      fontFamily: 'Montserrat',
      color: 'white',
      '@media (max-width:500px)': {
        fontSize: '33px',
      },
    },
  })
  const classes = useStyles()
  return (
    <div className={classes.banner}>
      <Container className={classes.bannerContent}>
        <div className={classes.tagline}>
          <Typography
            variant="h2"
            className={classes.heading}
            textAlign="center"
          >
            Crypto Knight
          </Typography>
          <br />
          <Typography
            variant="subtitle1"
            sx={{ color: 'grey', fontFamily: 'Montserrat' }}
            textAlign="center"
          >
            Get all the information regarding your favourite Crypto
          </Typography>
        </div>
        <Carousel />
      </Container>
    </div>
  )
}
