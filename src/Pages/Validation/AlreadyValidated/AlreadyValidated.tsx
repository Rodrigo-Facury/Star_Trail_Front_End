import { Box, Button, Center, Flex, Text } from '@chakra-ui/react'
import StarTrailFooter from '../../../Components/StarTrailFooter'
import './AlreadyValidated.css'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

function AlreadyValidated() {
  const navigate = useNavigate()
  function createRandomStar() {
    const star = document.createElement('div')
    star.className = 'star'
    star.style.left = `${Math.random() * 100}vw`
    star.style.top = `${Math.random() * 100}vh`
    return star
  }

  const numStars = 500
  const body = document.body

  useEffect(() => {
    const existingStarsContainer = document.getElementById('star-container')

    if (existingStarsContainer) {
      body.removeChild(existingStarsContainer)
    }

    const starContainer = document.createElement('div')
    starContainer.style.position = 'fixed'
    starContainer.style.top = '0'
    starContainer.style.left = '0'
    starContainer.style.width = '100%'
    starContainer.style.height = '100%'
    starContainer.style.backgroundColor = 'transparent'
    starContainer.id = 'star-container'

    for (let i = 0; i < numStars; i += 1) {
      const star = createRandomStar()
      starContainer.appendChild(star)
    }

    for (let i = 0; i < numStars; i += 1) {
      const star = createRandomStar()
      starContainer.appendChild(star)
    }


    if (window.location.pathname === '/already-validated') {
      body.appendChild(starContainer)
    }
  }, [body])

  return (
    <main id='success-validation-page'>
      <Flex padding='20px'>
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
            E-mail já validado
          </Text>
          <Text fontSize='xl' mt='4'>
            Seu endereço de e-mail já havia sido validado!
          </Text>
          <Button
            mt='6'
            colorScheme='whatsapp'
            zIndex='1'
            onClick={() => {
              const starsContainer = document.getElementById('star-container')

              if (starsContainer) {
                body.removeChild(starsContainer)
              }

              navigate('/login')
            }}
          >
            Voltar para Login
          </Button>
        </Center>
      </Box>
      <StarTrailFooter />
    </main>
  )
}

export default AlreadyValidated
