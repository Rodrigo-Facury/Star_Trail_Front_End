import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './Pages/Login/Login'
import Feed from './Pages/Feed/Feed'
import CreateTrail from './Pages/CreateTrail/CreateTrail'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/create-trail' element={<CreateTrail />} />
        <Route path='/' element={<Feed />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
