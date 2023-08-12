import { Button, FormControl, Input, FormErrorMessage, Alert, AlertIcon } from '@chakra-ui/react'
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
  const [allFieldsFilled, setAllFieldsFilled] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const navigate = useNavigate()

  const handlePasswordChange = (password: string, confirmPassword: string | undefined) => {
    setPasswordsMatch(password === confirmPassword)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUserInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }))

    if (name === 'password' || name === 'confirmPassword') {
      handlePasswordChange(value, name === 'confirmPassword' ? userInfo.password : userInfo.confirmPassword)
    }

    const areAllFieldsFilled =
      userInfo.firstName !== '' &&
      userInfo.lastName !== '' &&
      userInfo.username !== '' &&
      userInfo.email !== '' &&
      userInfo.password !== '' &&
      userInfo.confirmPassword !== ''

    setAllFieldsFilled(areAllFieldsFilled)
  }

  const handleSubmit = () => {
    const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/

    if (!passwordRegex.test(userInfo.password)) {
      setErrorMessage('Senha em formato incorreto')
      setTimeout(() => {
        setErrorMessage(null)
      }, 2000)

      return
    }

    if (userInfo.password !== userInfo.confirmPassword) {
      setPasswordsMatch(false)
      return
    }

    const infoToSend = { ...userInfo }

    delete infoToSend.confirmPassword

    fetch('http://localhost:3001/user', {
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
      <Input
        type='text'
        name='lastName'
        value={userInfo.lastName}
        onChange={handleChange}
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
      <Input
        type='text'
        name='username'
        value={userInfo.username}
        onChange={handleChange}
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
      <Input
        type='email'
        name='email'
        value={userInfo.email}
        onChange={handleChange}
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
        sx={{ marginBottom: '15px' }}
      />
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
        isDisabled={!passwordsMatch || !allFieldsFilled}
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
