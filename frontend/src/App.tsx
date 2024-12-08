import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Signup } from './pages/Signup'
import { Signin } from './pages/Signin'
import {Weather} from './pages/Weather'
import ProtectedRoute from './components/ProtectedRoute'
import './App.css'
import { WeatherHistory } from './pages/WeatherHistory'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Signup/>} />
          <Route path='/signup' element={<Signup/>} />
          <Route path='/signin' element={<Signin/>} />
          <Route path='/weather' element={<ProtectedRoute><Weather/></ProtectedRoute>} />
          <Route path='/weatherhistory' element={<ProtectedRoute><WeatherHistory/></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
