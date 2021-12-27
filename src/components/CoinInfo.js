import { CircularProgress } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { createTheme, ThemeProvider } from '@mui/system'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import { connect } from 'react-redux'
import { HistoricalChart } from '../config/api'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
} from 'chart.js'
import { chartDays } from '../config/days'
import SelectButton from './SelectButton'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
)

function CoinInfo({ currency, coin }) {
  const [historicData, setHistoricData] = useState()
  const [days, setDays] = useState(1)
  const fetchHistoricData = async () => {
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency))
    console.log(data.prices)
    setHistoricData(data.prices)
  }

  useEffect(() => {
    fetchHistoricData()
  }, [currency, days])

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: '#fff',
      },

      mode: 'dark',
    },
  })

  const useStyles = makeStyles((theme) => ({
    container: {
      width: '75%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 25,
      padding: 40,
      '@media (max-width:1280px)': {
        width: '100%',
        marginTop: 0,
        padding: 20,
        paddingTop: 0,
      },
    },
    button: {
      display: 'flex',
      justifyContent: 'space-around',
      width: '100%',
      marginTop: '29px',
      '@media (max-width:580px)': {
        flexDirection:'column',
        textAlign:'center'
      },
    },
  }))

  const classes = useStyles()

  const options = {
    elements: {
      point: {
        radius: 1,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  }
  return (
    <ThemeProvider theme={darkTheme}>
      <div className={classes.container}>
        {!historicData ? (
          <CircularProgress
            style={{ color: 'gold' }}
            size={250}
            thickness={1}
          />
        ) : (
          <>
            <Line
              options={options}
              data={{
                labels: historicData?.map((coin) => {
                  let date = new Date(coin[0])
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`
                  return days === 1 ? time : date.toLocaleDateString()
                }),
                datasets: [
                  {
                    data: historicData?.map((coin) => {
                      return coin[1]
                    }),
                    borderColor: 'gold',
                    label: `Price ( Past ${days} Days ) in ${currency}`,
                  },
                ],
              }}
            />
            <div className={classes.button}>
              {chartDays.map((day) => {
                return (
                  <SelectButton
                    key={day.value}
                    onClick={() => setDays(day.value)}
                    selected={day.value === days}
                  >
                    {day.label}
                  </SelectButton>
                )
              })}
            </div>
          </>
        )}
      </div>
    </ThemeProvider>
  )
}

const mapStateToProps = ({ currency }) => {
  return { currency }
}

export default connect(mapStateToProps)(CoinInfo)
