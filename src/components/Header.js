import {
  AppBar,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Toolbar,
  Typography,
} from '@mui/material'
import { ThemeProvider,createTheme } from '@mui/material/styles';
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux';
import { selectCurrency,selectSymbol } from '../actions'


const classes = {
  Logo: {
    flexGrow: 1,
    color: 'gold',
    fontFamily: 'Montserrat',
    fontWeight: '700',
    cursor: 'pointer',
  },
}
 function Header(props) {
  const history = useHistory()
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  const handleSelect = (e)=>{
    const currency = e.target.value
    props.selectCurrency(currency)
    if(currency==='INR'){
      props.selectSymbol('₹');
    }
    else{
      props.selectSymbol('$');
    }
  }
  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar position="sticky" sx={{backgroundColor:'black'}}>
        <Toolbar>
          <Typography
            onClick={() => history.push('/')}
            variant="h6"
            component="div"
            sx={classes.Logo}
          >
            Crypto Knight
          </Typography>

          <Select
            value={props.currency}
            sx={{ m:'14px' }}
            onChange={handleSelect}
          >
            <MenuItem value="INR">INR</MenuItem>
            <MenuItem value="USD">USD</MenuItem>
          </Select>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  )
}

const mapStateToProps = state =>{ 
  return { currency: state.currency} 
}

export default connect(mapStateToProps,{selectCurrency,selectSymbol})(Header)