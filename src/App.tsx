import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './Pages/Login/Login'
import Feed from './Pages/Feed/Feed'
import CreateTrail from './Pages/CreateTrail/CreateTrail'
import EditTrail from './Pages/EditTrail/EditTrail'
import Profile from './Pages/Profile/Profile'
import Notifications from './Pages/Notifications/Notifications'
import Success from './Pages/Validation/Success/Success'
import AlreadyValidated from './Pages/Validation/AlreadyValidated/AlreadyValidated'
import Error from './Pages/Validation/Error/Error'
import { useEffect, useState } from 'react'
import secureLocalStorage from 'react-secure-storage'
import { User } from '../types'
import jwtDecode from 'jwt-decode'
import ConfirmEmailModal from './Components/ConfirmEmailModal'
import ReactDOM from 'react-dom';
import { ChakraProvider } from '@chakra-ui/react'
import PrivacyPolicy from './Pages/PrivacyPolicy/PrivacyPolicy'
import Ranking from './Pages/Ranking/Ranking'

function App() {
  const [reloadToken, setReloadToken] = useState(false)


  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const token: string | number | boolean | object | null = secureLocalStorage.getItem('st_token')

    if (token
      &&
      typeof token === 'string'
      &&
      window.location.pathname !== '/validation-success'
      &&
      window.location.pathname !== '/validation-error'
      &&
      window.location.pathname !== '/already-validated') {

      const tokenUser: User = jwtDecode(token)

      if (!tokenUser.validated) {
        const body = document.body

        const modalContainer = document.createElement('div');

        ReactDOM.render(<ChakraProvider>
          <ConfirmEmailModal />
        </ChakraProvider>, modalContainer);

        body.appendChild(modalContainer);
      }
    }
  }, [reloadToken])

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/privacy-policy' element={<PrivacyPolicy />} />
        <Route path='/ranking' element={<Ranking />} />
        <Route path='/login' element={<Login setReloadToken={setReloadToken} />} />
        <Route path='/validation-success' element={<Success />} />
        <Route path='/validation-error' element={<Error />} />
        <Route path='/already-validated' element={<AlreadyValidated />} />
        <Route path='/notifications' element={<Notifications />} />
        <Route path='/create-trail' element={<CreateTrail />} />
        <Route path='/edit-trail/:trailId' element={<EditTrail />} />
        <Route path='/profile/:username' element={<Profile />} />
        <Route path='/' element={<Feed />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
