import { Button, FormControl, Input, FormErrorMessage, Alert, AlertIcon, UnorderedList, ListItem, Text } from '@chakra-ui/react'
import PasswordInput from './PasswordInput'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import secureLocalStorage from 'react-secure-storage'

interface UserInfo {
  email: string
  password: string
  confirmPassword?: string,
  firstName: string,
  lastName: string,
  username: string
}

interface IErrors {
  firstName?: {
    type?: string
  }
  lastName?: {
    type?: string
  }
  username?: {
    type?: string
  }
  email?: {
    type?: string
  }
  password?: {
    type?: string
  }
}

function SignUpForm() {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    username: ''
  })

  const [passwordsMatch, setPasswordsMatch] = useState(true)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [errors, setErrors] = useState<IErrors>({})
  const navigate = useNavigate()

  const handlePasswordChange = (password: string, confirmPassword: string | undefined) => {
    setPasswordsMatch(password === confirmPassword)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    if (name === 'username') {
      setErrors({})

      return setUserInfo((prevInfo) => ({
        ...prevInfo,
        [name]: value.toLowerCase(),
      }))
    }

    setUserInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }))

    if (name === 'password' || name === 'confirmPassword') {
      handlePasswordChange(value, name === 'confirmPassword' ? userInfo.password : userInfo.confirmPassword)
    }

    setErrors({})
  }

  const handleSubmit = () => {
    if (!userInfo.firstName) {
      setErrors((prev) => ({ ...prev, firstName: { type: 'required' } }))

      return;
    }

    const nameRegex = /^[A-Za-zÀ-ÿ]{2,30}$/

    const validFirstName = nameRegex.test(userInfo.firstName)

    if (!validFirstName) {
      setErrors((prev) => ({ ...prev, firstName: { type: 'pattern' } }))

      return;
    }

    if (!userInfo.lastName) {
      setErrors((prev) => ({ ...prev, lastName: { type: 'required' } }))

      return;
    }

    const validLastName = nameRegex.test(userInfo.lastName)

    if (!validLastName) {
      setErrors((prev) => ({ ...prev, lastName: { type: 'pattern' } }))

      return;
    }

    if (!userInfo.username) {
      setErrors((prev) => ({ ...prev, username: { type: 'required' } }))

      return;
    }

    const usernameRegex = /^[a-z0-9_-]{3,15}$/

    const validUsername = usernameRegex.test(userInfo.username)

    if (!validUsername) {
      setErrors((prev) => ({ ...prev, username: { type: 'pattern' } }))

      return;
    }


    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!userInfo.email) {
      setErrors((prev) => ({ ...prev, email: { type: 'required' } }))

      return;
    }

    const validEmail = emailRegex.test(userInfo.email)

    if (!validEmail) {
      setErrors((prev) => ({ ...prev, email: { type: 'pattern' } }))

      return;
    }

    if (!userInfo.password) {
      setErrors((prev) => ({ ...prev, password: { type: 'required' } }))

      return;
    }

    const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/

    const validPassword = passwordRegex.test(userInfo.password)

    if (!validPassword) {
      setErrors((prev) => ({ ...prev, password: { type: 'pattern' } }))

      return;
    }


    if (userInfo.password !== userInfo.confirmPassword) {
      setPasswordsMatch(false)
      return
    }

    const infoToSend = { ...userInfo }

    delete infoToSend.confirmPassword

    fetch(`${typeof import.meta.env.VITE_API_BASE_URL === 'string' ? import.meta.env.VITE_API_BASE_URL : ''}/user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(infoToSend)
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
      }}
    >
      <Input
        type='text'
        name='firstName'
        value={userInfo.firstName}
        onChange={handleChange}
        onKeyUp={handleKeyPress}
        placeholder='Nome'
        borderColor='#4461F2'
        color='white'
        _placeholder={{
          opacity: 1,
          color: 'white',
          fontFamily: 'Abhaya Libre, serif',
        }}
        sx={{
          marginBottom: '15px',
        }}
      />
      {errors?.firstName && <UnorderedList marginBottom='20px' color='red.300' textAlign='left' fontSize='12px'>
        <ListItem>Deve conter apenas letras maiúsculas (A-Z) e minúsculas (a-z), incluindo caracteres acentuados.</ListItem>
        <ListItem>Deve ter de 2 a 30 caracteres.</ListItem>
      </UnorderedList>}
      <Input
        type='text'
        name='lastName'
        value={userInfo.lastName}
        onChange={handleChange}
        onKeyUp={handleKeyPress}
        placeholder='Sobrenome'
        borderColor='#4461F2'
        color='white'
        _placeholder={{
          opacity: 1,
          color: 'white',
          fontFamily: 'Abhaya Libre, serif',
        }}
        sx={{
          marginBottom: '15px',
        }}
      />
      {errors?.lastName && <UnorderedList marginBottom='20px' color='red.300' textAlign='left' fontSize='12px'>
        <ListItem>Deve conter apenas letras maiúsculas (A-Z) e minúsculas (a-z), incluindo caracteres acentuados.</ListItem>
        <ListItem>Deve ter de 2 a 30 caracteres.</ListItem>
      </UnorderedList>}
      <Input
        type='text'
        name='username'
        value={userInfo.username}
        onChange={handleChange}
        onKeyUp={handleKeyPress}
        placeholder='Username'
        borderColor='#4461F2'
        title={
          `
- Deve conter apenas letras minúsculas (a-z), números (0-9), hífens (-) e underscores (_).
- Deve ter um comprimento mínimo de 3 caracteres.
- Deve ter um comprimento máximo de 15 caracteres.
`
        }
        color='white'
        _placeholder={{
          opacity: 1,
          color: 'white',
          fontFamily: 'Abhaya Libre, serif',
        }}
        sx={{
          marginBottom: '15px',
        }}
      />
      {errors?.username && <UnorderedList marginBottom='20px' color='red.300' textAlign='left' fontSize='12px'>
        <ListItem>Deve conter apenas letras minúsculas (a-z), números (0-9), hífens (-) e underscores (_).</ListItem>
        <ListItem>Deve ter de 2 a 15 caracteres.</ListItem>
      </UnorderedList>}
      <Input
        type='email'
        name='email'
        value={userInfo.email}
        onChange={handleChange}
        onKeyUp={handleKeyPress}
        placeholder='E-mail'
        borderColor='#4461F2'
        color='white'
        _placeholder={{
          opacity: 1,
          color: 'white',
          fontFamily: 'Abhaya Libre, serif',
        }}
        sx={{
          marginBottom: '15px',
        }}
      />
      {errors?.email && <Text color='red.300' fontSize='12px' textAlign='left' marginBottom='20px'>
        Digite um e-mail válido
      </Text>}
      <PasswordInput
        placeholder='Senha'
        name='password'
        title={`
- Deve conter pelo menos 8 caracteres.
- Deve conter pelo menos 1 letra maiúscula (A-Z).
- Deve conter pelo menos 1 letra minúscula (a-z).
- Deve conter pelo menos 1 número (0-9).
- Deve conter pelo menos 1 caractere especial (#?!@$ %^&*-).
`}
        value={userInfo.password}
        onChange={handleChange}
        onKeyUp={handleKeyPress}
        sx={{ marginBottom: '15px' }}
      />
      {errors?.password && <UnorderedList marginBottom='20px' color='red.300' textAlign='left' fontSize='12px'>
        <ListItem>Deve conter pelo menos 8 caracteres.</ListItem>
        <ListItem>Deve conter pelo menos 1 letra maiúscula (A-Z).</ListItem>
        <ListItem>Deve conter pelo menos 1 letra minúscula (a-z).</ListItem>
        <ListItem>Deve conter pelo menos 1 número (0-9).</ListItem>
        <ListItem>Deve conter pelo menos 1 caractere especial (#?!@$ %^&*-).</ListItem>
      </UnorderedList>}
      <FormControl isInvalid={!passwordsMatch}>
        <PasswordInput
          placeholder='Confirmar Senha'
          name='confirmPassword'
          title={`
- Deve conter pelo menos 8 caracteres.
- Deve conter pelo menos 1 letra maiúscula (A-Z).
- Deve conter pelo menos 1 letra minúscula (a-z).
- Deve conter pelo menos 1 número (0-9).
- Deve conter pelo menos 1 caractere especial (#?!@$ %^&*-).
`}
          value={userInfo.confirmPassword}
          onChange={handleChange}
          onKeyUp={handleKeyPress}
        />
        {!passwordsMatch && (
          <FormErrorMessage color='red.500'>
            Senhas não coincidem
          </FormErrorMessage>
        )}
      </FormControl>
      <Button
        onClick={handleSubmit}
        sx={{
          backgroundColor: '#4461F2',
          color: 'white',
          fontFamily: 'Abhaya Libre, serif',
          marginTop: '35px',
        }}
      >
        Cadastrar
      </Button>
      {errorMessage && (
        <Alert status="error" position='absolute' bottom='0px' fontSize='13.5px' width='max-content'>
          <AlertIcon />
          {errorMessage}
        </Alert>
      )}
    </FormControl>
  )
}

export default SignUpForm
