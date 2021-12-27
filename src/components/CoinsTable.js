import { createTheme, ThemeProvider } from '@mui/material/styles'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import {
  Container,
  LinearProgress,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material'
import { connect } from 'react-redux'
import NumberFormat from 'react-number-format'
import { amber } from '@mui/material/colors'

function CoinsTable({ currency, symbol }) {
  const [coins, setCoins] = useState([])
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const fetchCoins = async () => {
    setLoading(true)
    const { data } = await axios.get(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`,
    )
    setCoins(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchCoins()
  }, [currency])

  const history = useHistory()
  const classes = {
    row: {
      backgroundColor: '#16171a',
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: '#131111',
      },
      fontFamily: 'Montserrat',
    },
    ul: {
      '& .MuiPaginationItem-root': {
        color: '#fff',
      },
    },
  }
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: '#fff',
      },
      secondary: amber,
      mode: 'dark',
    },
  })

  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search),
    )
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <Container sx={{ textAlign: 'center', alignItems: 'center' }}>
        <Typography
          variant="h4"
          style={{ margin: 18, fontFamily: 'Montserrat' }}
        >
          Cryptocurrency Prices by Market Cap
        </Typography>
        <TextField
          label="Search your crypto..."
          variant="standard"
          color="primary"
          fullWidth
          onChange={(e) => setSearch(e.target.value)}
          sx={{ mb: 2 }}
        />
        {loading ? (
          <LinearProgress style={{ backgroundColor: 'gold' }} />
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow style={{ backgroundColor: '#edb83a' }}>
                  {['Coin', 'Price', '24h Change', 'Market Cap'].map((head) => (
                    <TableCell
                      style={{
                        color: 'black',
                        fontWeight: '700',
                        fontFamily: 'Montserrat',
                      }}
                      key={head}
                      align={head === 'Coin' ? '' : 'right'}
                    >
                      {head}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {handleSearch()
                  .slice(10 * (page - 1), 10 * page)
                  .map((row) => {
                    const profit = row.price_change_24h > 0
                    return (
                      <TableRow
                        onClick={() => history.push(`/coins/${row.id}`)}
                        sx={classes.row}
                        key={row.name}
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          style={{
                            display: 'flex',
                            gap: 15,
                          }}
                        >
                          <img
                            src={row.image}
                            alt={row.name}
                            height="50"
                            style={{ marginBottom: 10 }}
                          />
                          <div
                            style={{ display: 'flex', flexDirection: 'column' }}
                          >
                            <span style={{ fontSize: '22px' }}>
                              {row.symbol.toUpperCase()}
                            </span>
                            <span style={{ color: 'grey' }}>{row.name}</span>
                          </div>
                        </TableCell>
                        <TableCell align="right" style={{ fontSize: '18px' }}>
                          {
                            <NumberFormat
                              thousandsGroupStyle="thousand"
                              value={row.current_price}
                              prefix={symbol}
                              decimalSeparator="."
                              displayType="text"
                              type="text"
                              thousandSeparator={true}
                            />
                          }
                          {/* {symbol} {numberWithCommas(row.current_price)} */}
                        </TableCell>
                        <TableCell
                          align="right"
                          style={{
                            color: profit > 0 ? 'rgb(14, 203, 129)' : 'red',
                            fontWeight: 500,
                            fontSize: '18px',
                          }}
                        >
                          {profit && '+'}
                          {row.price_change_percentage_24h?.toFixed(2)}%
                        </TableCell>
                        <TableCell align="right"  >
                          {
                            <NumberFormat
                              thousandsGroupStyle="thousand"
                              value={row.market_cap}
                              prefix={symbol}
                              decimalSeparator="."
                              displayType="text"
                              type="text"
                              thousandSeparator={true}
                            />
                          }
                        </TableCell>
                      </TableRow>
                    )
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        )}
        <div style={{ textAlign: 'center' }}>
          <Pagination
            count={(handleSearch()?.length / 10).toFixed(0)}
            sx={{
              padding: 3,
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
            }}
            color={'secondary'}
            onChange={(_, value) => {
              setPage(value)
              window.scroll(0, 450)
            }}
          />
        </div>
      </Container>
    </ThemeProvider>
  )
}

const mapStateToProps = ({ currency, symbol }) => {
  return { currency, symbol }
}
export default connect(mapStateToProps)(CoinsTable)
