import { Button, FormControl, Input, FormErrorMessage, Alert, AlertIcon, UnorderedList, ListItem, Text, Checkbox, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Link, Flex } from '@chakra-ui/react'
import PasswordInput from './PasswordInput'
import { Dispatch, SetStateAction, useState } from 'react'
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

function SignUpForm({ setReloadToken }: { setReloadToken: Dispatch<SetStateAction<boolean>> }) {
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
  const [agreedToTerms, setAgreedToTerms] = useState<boolean>(false)
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)

  const onClose = () => setIsOpen(false)
  const openModal = () => setIsOpen(true)

  const handlePasswordChange = (password: string, confirmPassword: string | undefined) => {
    setPasswordsMatch(password === confirmPassword)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    if (name === 'username' || name === 'email') {
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
    if (!agreedToTerms) {
      setErrorMessage('Você deve concordar com os termos para prosseguir')

      setTimeout(() => {
        setErrorMessage(null)
      }, 2000)

      return
    }

    if (!userInfo.firstName) {
      setErrors((prev) => ({ ...prev, firstName: { type: 'required' } }))

      return
    }

    const nameRegex = /^[A-Za-zÀ-ÿ]{2,30}$/

    const validFirstName = nameRegex.test(userInfo.firstName)

    if (!validFirstName) {
      setErrors((prev) => ({ ...prev, firstName: { type: 'pattern' } }))

      return
    }

    if (!userInfo.lastName) {
      setErrors((prev) => ({ ...prev, lastName: { type: 'required' } }))

      return
    }

    const validLastName = nameRegex.test(userInfo.lastName)

    if (!validLastName) {
      setErrors((prev) => ({ ...prev, lastName: { type: 'pattern' } }))

      return
    }

    if (!userInfo.username) {
      setErrors((prev) => ({ ...prev, username: { type: 'required' } }))

      return
    }

    const usernameRegex = /^[a-z0-9_-]{3,15}$/

    const validUsername = usernameRegex.test(userInfo.username)

    if (!validUsername) {
      setErrors((prev) => ({ ...prev, username: { type: 'pattern' } }))

      return
    }


    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!userInfo.email) {
      setErrors((prev) => ({ ...prev, email: { type: 'required' } }))

      return
    }

    const validEmail = emailRegex.test(userInfo.email)

    if (!validEmail) {
      setErrors((prev) => ({ ...prev, email: { type: 'pattern' } }))

      return
    }

    if (!userInfo.password) {
      setErrors((prev) => ({ ...prev, password: { type: 'required' } }))

      return
    }

    const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/

    const validPassword = passwordRegex.test(userInfo.password)

    if (!validPassword) {
      setErrors((prev) => ({ ...prev, password: { type: 'pattern' } }))

      return
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
        setReloadToken((prev) => !prev)
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
      <Flex alignItems='center' marginTop='20px'>
        <Checkbox
          isChecked={agreedToTerms}
          onChange={(e) => setAgreedToTerms(e.target.checked)}
        >
        </Checkbox>
        <Text fontSize='12px' color='white' marginLeft='5px'>
          Concordo com os <Link color='whatsapp.500' onClick={openModal}>Termos de Serviço</Link>
        </Text>
      </Flex>
      <Button
        onClick={handleSubmit}
        sx={{
          backgroundColor: '#4461F2',
          color: 'white',
          fontFamily: 'Abhaya Libre, serif',
          marginTop: '25px',
        }}
      >
        Cadastrar
      </Button>
      {errorMessage && (
        <Alert status='error' position='absolute' bottom='0px' fontSize='13.5px' width='max-content' maxWidth='100%'>
          <AlertIcon />
          {errorMessage}
        </Alert>
      )}

      <Modal isOpen={isOpen} onClose={onClose} size='lg'>
        <ModalOverlay />
        <ModalContent width='600px' maxWidth='90%'>
          <ModalHeader>Termos de Serviço da Star Trail</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontSize="lg" fontWeight="bold" mb="4">Termos de Serviço da Star Trail</Text>
            <Text fontSize="md">
              Bem-vindo aos Termos de Serviço da Star Trail! Estes termos regem o uso da plataforma Star Trail, uma rede social dedicada a compartilhar e descobrir trilhas de aprendizagem. Ao acessar ou utilizar os serviços oferecidos pela Star Trail, você concorda com estes termos.
            </Text>

            <Text fontSize="lg" fontWeight="bold" mt="4">1. Aceitação dos Termos</Text>
            <Text fontSize="md">
              Ao acessar ou usar a Star Trail, você concorda com estes Termos de Serviço e com nossa Política de Privacidade. Se você não concordar com esses termos, por favor, não use nossos serviços.
            </Text>

            <Text fontSize="lg" fontWeight="bold" mt="4">2. Uso da Plataforma</Text>
            <Text fontSize="md">
              <strong>2.1.</strong> Você deve ter pelo menos 13 anos de idade para usar a Star Trail. Se você tiver menos de 13 anos, não está autorizado a usar nossos serviços.
            </Text>
            <Text fontSize="md">
              <strong>2.2.</strong> Você é responsável por todas as atividades realizadas na sua conta da Star Trail. Mantenha suas credenciais de login em segurança e não compartilhe sua senha com terceiros.
            </Text>

            <Text fontSize="lg" fontWeight="bold" mt="4">3. Conteúdo do Usuário</Text>
            <Text fontSize="md">
              <strong>3.1.</strong> Ao compartilhar conteúdo na Star Trail, você declara que possui os direitos necessários para fazê-lo e concorda em respeitar os direitos de propriedade intelectual de terceiros.
            </Text>
            <Text fontSize="md">
              <strong>3.2.</strong> Você é o único responsável pelo conteúdo que compartilha na plataforma, incluindo trilhas de aprendizagem, comentários, mensagens e qualquer outra forma de comunicação.
            </Text>
            <Text fontSize="md">
              <strong>3.3.</strong> Não é permitido compartilhar conteúdo que viole leis, regulamentos ou estes termos, incluindo conteúdo difamatório, obsceno, fraudulento ou que promova ódio, violência ou discriminação.
            </Text>

            <Text fontSize="lg" fontWeight="bold" mt="4">4. Privacidade</Text>
            <Text fontSize="md">
              <strong>4.1.</strong> Coletamos e usamos informações de acordo com nossa Política de Privacidade. Ao usar a Star Trail, você concorda com a coleta e uso de suas informações, conforme descrito na política de privacidade.
            </Text>

            <Text fontSize="lg" fontWeight="bold" mt="4">5. Encerramento da Conta</Text>
            <Text fontSize="md">
              <strong>5.1.</strong> A Star Trail se reserva o direito de encerrar ou suspender sua conta e acesso à plataforma a qualquer momento, se violar estes termos ou se sua conduta prejudicar a experiência de outros usuários.
            </Text>

            <Text fontSize="lg" fontWeight="bold" mt="4">6. Modificações nos Termos de Serviço</Text>
            <Text fontSize="md">
              <strong>6.1.</strong> A Star Trail se reserva o direito de modificar estes termos a qualquer momento. As alterações serão notificadas aos usuários por meio da plataforma ou por outros meios adequados. O uso continuado dos serviços após a modificação constitui aceitação das alterações.
            </Text>

            <Text fontSize="lg" fontWeight="bold" mt="4">7. Isenção de Garantias e Responsabilidade</Text>
            <Text fontSize="md">
              <strong>7.1.</strong> A Star Trail não garante que a plataforma estará sempre disponível ou isenta de erros. Os serviços são fornecidos "no estado em que se encontram" e "conforme disponíveis".
            </Text>
            <Text fontSize="md">
              <strong>7.2.</strong> A Star Trail não é responsável por qualquer dano direto, indireto, incidental, especial ou consequente decorrente do uso ou incapacidade de usar a plataforma.
            </Text>

            <Text fontSize="lg" fontWeight="bold" mt="4">8. Lei Aplicável</Text>
            <Text fontSize="md">
              <strong>8.1.</strong> Estes termos são regidos pelas leis do país ou jurisdição em que a Star Trail está sediada.
            </Text>

            <Text fontSize="lg" fontWeight="bold" mt="4">9. Contato</Text>
            <Text fontSize="md">
              <strong>9.1.</strong> Se tiver dúvidas ou preocupações sobre estes termos, entre em contato conosco através do e-mail <strong>rodrigo@startrail.com.br</strong>.
            </Text>

            <Text fontSize="md" mt="4">
              Agradecemos por escolher a Star Trail para compartilhar e explorar trilhas de aprendizagem. Esperamos que tenha uma experiência enriquecedora na nossa plataforma!
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='whatsapp' onClick={() => {
              setAgreedToTerms(true)
              onClose()
            }}>
              Concordo
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </FormControl>
  )
}

export default SignUpForm
