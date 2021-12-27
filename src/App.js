import './App.css'
import { BrowserRouter, Route } from 'react-router-dom'
import Header from './components/Header'
import HomePage from './Pages/HomePage'
import CoinPage from './Pages/CoinPage'


function App() {

  const classes ={
    App:{
      backgroundColor:'#14161a',
      color:"white",
      minHeight:'100vh',
      minWidth:'250px'
    }
  }
  return (
    <BrowserRouter>
      <div style={classes.App}>
        <Header />
        <Route exact path="/" component={HomePage} />
        <Route exact path="/coins/:id" component={CoinPage} />
      </div>
    </BrowserRouter>
  )
}

export default App
