import { Button } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
function SelectButton({ children, onClick, selected }) {
  const useStyles = makeStyles({
    button: {
      border: '1px solid gold',
      borderRadius: 5,
      padding: 10,
      paddingLeft: 20,
      paddingRight: 20,
      fontFamily: 'Montserrat',
      cursor: 'pointer',
      backgroundColor: selected ? 'gold' : '',
      color: selected ? 'black' : '',
      fontWeight: selected ? 700 : 500,
      '&:hover': {
        backgroundColor: 'gold',
        color: 'black',
      },
      width: '22%',
      '@media (max-width:580px)': {
        width: '90%',
        marginBottom:'10px'
      },
    },
  })
  const classes = useStyles()
  return (
    <div className={classes.button} onClick={onClick}>
      {children}
    </div>
  )
}

export default SelectButton
