import {
  Alert,
  AlertIcon,
  Button,
  Flex,
  FormControl,
  FormHelperText,
  Input,
  ListItem,
  Text,
  UnorderedList
} from '@chakra-ui/react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PasswordInput from './PasswordInput'
import secureLocalStorage from 'react-secure-storage'

interface LoginInfo {
  emailOrUsername: string
  password: string
}

interface IErrors {
  emailOrUsername?: {
    type?: string
  }
  password?: {
    type?: string
  }
}

function LoginForm() {
  const navigate = useNavigate()
  const [loginInfo, setLoginInfo] = useState<LoginInfo>({
    emailOrUsername: '',
    password: ''
  })
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [errors, setErrors] = useState<IErrors>({})

  const handleSubmit = () => {
    if (!loginInfo.emailOrUsername) {
      setErrors((prev) => ({ ...prev, emailOrUsername: { type: 'required' } }))

      return;
    }

    const usernameRegex = /^[a-z0-9_-]{3,15}$/

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/


    const validEmailOrUsername = usernameRegex.test(loginInfo.emailOrUsername) || emailRegex.test(loginInfo.emailOrUsername)

    if (!validEmailOrUsername) {
      setErrors((prev) => ({ ...prev, emailOrUsername: { type: 'pattern' } }))

      return;
    }

    if (!loginInfo.password) {
      setErrors((prev) => ({ ...prev, password: { type: 'required' } }))

      return;
    }

    const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/

    const validPassword = passwordRegex.test(loginInfo.password)

    if (!validPassword) {
      setErrors((prev) => ({ ...prev, password: { type: 'pattern' } }))

      return;
    }

    fetch(`${typeof import.meta.env.VITE_API_BASE_URL === 'string' ? import.meta.env.VITE_API_BASE_URL : ''}/user/login`, {
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    if (name === 'emailOrUsername') {
      setErrors({})

      return setLoginInfo((prevInfo) => ({
        ...prevInfo,
        [name]: value.toLowerCase(),
      }))
    }

    setLoginInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value
    }))

    setErrors({})
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit()
    }
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
        onKeyUp={handleKeyPress}
      />
      {errors?.emailOrUsername && <Flex flexDirection='column'>
        <Text color='red.300' fontSize='12px' textAlign='left' marginBottom='5px'>
          Digite um e-mail válido ou um username no seguinte formato:
        </Text>
        <UnorderedList marginBottom='20px' color='red.300' textAlign='left' fontSize='12px'>
          <ListItem>Deve conter apenas letras minúsculas (a-z), números (0-9), hífens (-) e underscores (_).</ListItem>
          <ListItem>Deve ter de 2 a 15 caracteres.</ListItem>
        </UnorderedList>
      </Flex>}
      <PasswordInput
        value={loginInfo.password}
        placeholder='Senha'
        name='password'
        onChange={handleChange}
        onKeyUp={handleKeyPress}
      />
      {errors?.password && <UnorderedList marginTop='15px' color='red.300' textAlign='left' fontSize='12px'>
        <ListItem>Deve conter pelo menos 8 caracteres.</ListItem>
        <ListItem>Deve conter pelo menos 1 letra maiúscula (A-Z).</ListItem>
        <ListItem>Deve conter pelo menos 1 letra minúscula (a-z).</ListItem>
        <ListItem>Deve conter pelo menos 1 número (0-9).</ListItem>
        <ListItem>Deve conter pelo menos 1 caractere especial (#?!@$ %^&*-).</ListItem>
      </UnorderedList>}
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
