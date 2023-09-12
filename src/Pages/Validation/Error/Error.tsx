import { Alert, AlertIcon, Box, Button, Center, Flex, Input, Text } from '@chakra-ui/react'
import StarTrailFooter from '../../../Components/StarTrailFooter'
import './Error.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Error() {
  const [email, setEmail] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const navigate = useNavigate()

  function handleSubmit() {
    fetch(`${typeof import.meta.env.VITE_API_BASE_URL === 'string' ? import.meta.env.VITE_API_BASE_URL : ''}/resend-validation-email/${email}`)
      .then((res) => {
        if (res.ok) {
          return res.json()
        } else {
          setErrorMessage('Erro ao reenviar e-mail de confirmação')

          setTimeout(() => {
            setErrorMessage('')
          }, 2000)
        }
      })
      .then((okRes) => {
        console.log(okRes)
      })
      .catch((err) => console.error(err))
  }

  return (
    <main id='error-validation-page'>
      <Flex padding='20px' onClick={() => navigate('/')}>
        <h1 id='font-logo-validation'>Star Trail</h1>
      </Flex>
      <Box
        flexGrow='1'
        display='flex'
        justifyContent='center'
        alignItems='center'
      >
        <Center
          bg='#F4F6FC'
          p='8'
          borderRadius='lg'
          boxShadow='lg'
          flexDirection='column'
          textAlign='center'
          maxWidth='90%'
        >
          <Text fontSize='3xl' fontWeight='bold' color='whatsapp'>
            Endereço de e-mail não encontrado
          </Text>
          <Text fontSize='xl' mt='4'>
            Tente reenviar o e-mail de confirmação.
          </Text>
          <Input
            backgroundColor='blackAlpha.300'
            marginTop='20px'
            placeholder='E-mail'
            type='e-mail'
            onChange={(e) => setEmail(e.target.value)}
            onKeyUp={({ key }) => {
              if (key === 'Enter') {
                handleSubmit()
              }
            }}
          />
          <Button
            mt='6'
            colorScheme='whatsapp'
            onClick={handleSubmit}
          >
            Reenviar
          </Button>
        </Center>
      </Box>
      {errorMessage && (
        <Alert status='error' position='absolute' bottom='150px' right='15px' fontSize='13.5px' width='max-content'>
          <AlertIcon />
          {errorMessage}
        </Alert>
      )}
      <StarTrailFooter />
    </main>
  )
}

export default Error
