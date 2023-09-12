import { Alert, AlertIcon, Button, Flex, Input, Text } from '@chakra-ui/react'
import { useState } from 'react'
import secureLocalStorage from 'react-secure-storage'

function ConfirmEmailModal() {
  const [email, setEmail] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const token: string | number | boolean | object | null = secureLocalStorage.getItem('st_token')

  function handleSubmit() {
    fetch(`${typeof import.meta.env.VITE_API_BASE_URL === 'string' ? import.meta.env.VITE_API_BASE_URL : ''}/resend-validation-email/${email}`)
      .then((res) => {
        if (res.ok) {
          setSuccessMessage('E-mail reenviado com sucesso!')

          setTimeout(() => {
            setSuccessMessage('')
          }, 3000)

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

  function checkValidation() {
    if (token && typeof token === 'string') {
      fetch(`${typeof import.meta.env.VITE_API_BASE_URL === 'string' ? import.meta.env.VITE_API_BASE_URL : ''}/check-validation`, {
        headers: {
          Authorization: token
        }
      })
        .then((res) => {
          if (res.ok) {
            return res.json()
          } else {
            setErrorMessage('E-mail não validado')

            setTimeout(() => {
              setErrorMessage('')
            }, 2000)
          }

          throw new Error()
        })
        .then(({ token }: { token: string }) => {
          secureLocalStorage.setItem('st_token', token)
          window.location.reload()
        })
        .catch((err) => console.error(err))
    }
  }

  return (
    <Flex
      position='absolute'
      top='0px'
      left='0px'
      height='100vh'
      width='100vw'
      alignItems='center'
      justifyContent='center'
      bg='rgba(0, 128, 128, 0.05)'
      backdropFilter='blur(1px)'
      zIndex='100'
    >
      <Flex flexDir='column' bgColor='#F4F6FC' padding='25px' borderRadius='8px' maxWidth='90%'>
        <Text fontSize='3xl' fontWeight='bold' color='whatsapp'>
          Valide seu endereço de e-mail para prosseguir
        </Text>
        <Text fontSize='xl' mt='4'>
          Caso não tenha recebido, tente reenviar o e-mail de confirmação.
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
        <Flex alignSelf='center'>
          <Button
            mt='6'
            colorScheme='purple'
            onClick={checkValidation}
          >
            Já validei
          </Button>
          <Button
            mt='6'
            colorScheme='whatsapp'
            onClick={handleSubmit}
            marginLeft='25px'
          >
            Reenviar
          </Button>
        </Flex>
        {errorMessage && (
          <Alert status='error' position='absolute' bottom='150px' right='15px' fontSize='13.5px' width='max-content'>
            <AlertIcon />
            {errorMessage}
          </Alert>
        )}

        {successMessage && (
          <Alert status='success' position='absolute' bottom='150px' right='15px' fontSize='13.5px' width='max-content'>
            <AlertIcon />
            {successMessage}
          </Alert>
        )}
      </Flex>
    </Flex>
  )
}

export default ConfirmEmailModal
