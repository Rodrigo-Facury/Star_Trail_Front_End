import { useState } from 'react'
import './StarTrailFooter.css'
import stacksVideo from '../assets/stacks.mp4'
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Link,
  Flex,
} from '@chakra-ui/react'
import { FaLinkedin, FaGithub } from 'react-icons/fa'
import star from '../assets/star.png'

function StarTrailFooter() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const openDialog = () => {
    setIsDialogOpen(true)
  }

  const closeDialog = () => {
    setIsDialogOpen(false)
  }

  return (
    <footer className='star-trail-footer'>
      Desenvolvido com <span className='heart'>❤️</span> utilizando
      <div className='content'>
        <div className='stacks'>
          <div className='video-container'>
            <video autoPlay loop muted width='60px'>
              <source src={stacksVideo} type='video/mp4' />
              Seu navegador não suporta o elemento de vídeo.
            </video>
          </div>
        </div>
      </div>
      <span className='by'>
        por{' '}
        <Button className='my-name' as='span' variant='link' colorScheme='whatsapp' onClick={openDialog} cursor='pointer'>
          @rodrigo_facury
        </Button>
      </span>
      <Modal isOpen={isDialogOpen} onClose={closeDialog}>
        <ModalOverlay />
        <ModalContent alignSelf='center'>
          <ModalHeader>Contatos</ModalHeader>
          <ModalBody>
            <Flex justifyContent='space-between'>
              <Link href='https://www.linkedin.com/in/rodrigo-facury' isExternal>
                <Button leftIcon={<FaLinkedin />} variant='outline' mb={3} colorScheme='linkedin'>
                  Visitar LinkedIn
                </Button>
              </Link>
              <Link href='https://github.com/rodrigo-facury' isExternal>
                <Button leftIcon={<FaGithub />} variant='outline' colorScheme='gray'>
                  Veja meu GitHub
                </Button>
              </Link>
            </Flex>
            <Flex justifyContent='center'>
              <Link href='/profile/rodrigo_facury'>
                <Button variant='outline' mt={3} colorScheme='yellow'>
                  <span id='star-trail-contact'><img id='star-icon' src={star} alt='Estrela da Star Trail' width='22' /> Perfil Star Trail</span>
                </Button>
              </Link>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button onClick={closeDialog}>Fechar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </footer>
  )
}

export default StarTrailFooter
