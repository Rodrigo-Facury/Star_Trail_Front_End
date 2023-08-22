import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './Pages/Login/Login'
import Feed from './Pages/Feed/Feed'
import CreateTrail from './Pages/CreateTrail/CreateTrail'
import EditTrail from './Pages/EditTrail/EditTrail'
import Profile from './Pages/Profile/Profile'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/create-trail' element={<CreateTrail />} />
        <Route path='/edit-trail/:trailId' element={<EditTrail />} />
        <Route path='/profile/:username' element={<Profile />} />
        <Route path='/' element={<Feed />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
