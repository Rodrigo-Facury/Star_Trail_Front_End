import {
  Alert,
  AlertIcon,
  Button,
  FormControl,
  FormHelperText,
  Input
} from '@chakra-ui/react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PasswordInput from './PasswordInput'
import secureLocalStorage from 'react-secure-storage'

interface LoginInfo {
  emailOrUsername: string
  password: string
}

function LoginForm() {
  const navigate = useNavigate()
  const [loginInfo, setLoginInfo] = useState<LoginInfo>({
    emailOrUsername: '',
    password: ''
  })
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setLoginInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value
    }))
  }

  const handleSubmit = () => {
    fetch('http://localhost:3001/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginInfo)
    })
      .then(async (res) => {
        if (res.ok) {
          return res.json()
        } else {
          return res.json().then((data: { message: string }) => {
            setErrorMessage(data.message)
            setTimeout(() => {
              setErrorMessage(null)
            }, 2000)
            throw new Error(data.message)
          })
        }
      })
      .then((data: { token: string }) => {
        secureLocalStorage.setItem('st_token', data.token)
        navigate('/')
      })
      .catch((err) => {
        console.log(err)
      })
  }
  return (
    <FormControl
      sx={{
        width: '300px',
        display: 'flex',
        flexDirection: 'column',
        alignSelf: 'center'
      }}
    >
      <Input
        type='text'
        name='emailOrUsername'
        value={loginInfo.emailOrUsername}
        placeholder='E-mail ou Username'
        borderColor='#4461F2'
        color='white'
        _placeholder={{
          opacity: 1,
          color: 'white',
          fontFamily: 'Abhaya Libre, serif'
        }}
        sx={{
          marginBottom: '15px'
        }}
        onChange={handleChange}
      />
      <PasswordInput
      value={loginInfo.password}
        placeholder='Senha'
        name='password'
        onChange={handleChange}
      />
      <FormHelperText
        onClick={() => navigate('/recover-password')}
        color={'white'}
        fontFamily='Abhaya Libre, serif'
        sx={{
          alignSelf: 'flex-end',
          cursor: 'pointer'
        }}
      >
        Esqueceu a senha?
      </FormHelperText>
      <Button
        sx={{
          backgroundColor: '#4461F2',
          color: 'white',
          fontFamily: 'Abhaya Libre, serif',
          marginTop: '25px'
        }}
        onClick={handleSubmit}
      >
        Entrar
      </Button>
      {errorMessage && (
        <Alert status='error' position='absolute' bottom='0px' fontSize='13.5px' width='max-content'>
          <AlertIcon />
          {errorMessage}
        </Alert>
      )}
    </FormControl>
  )
}

export default LoginForm
