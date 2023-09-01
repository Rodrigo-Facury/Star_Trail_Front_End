import { Badge, Box, Button, Collapse, Flex, Heading, IconButton, Image, Menu, MenuButton, MenuItem, MenuList, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from '@chakra-ui/react'
import { Step, Trail, User } from '../../types'
import { statusIcons } from '../helpers/statusIcons'
import star from '../assets/star.png'
import './TrailCard.css'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { ArrowDownIcon, EditIcon } from '@chakra-ui/icons'
import secureLocalStorage from 'react-secure-storage'
import jwtDecode from 'jwt-decode'
import { useNavigate } from 'react-router-dom'

type TrailCardProps = {
  title: string
  topics: { name: string }[]
  creator: User
  trails: Trail[]
  stars: number
  steps: Step[]
  peopleWhoStarred: number[],
  id: string
  trailId: number
  setTrails: Dispatch<SetStateAction<Trail[]>>
}

function TrailCard({ title, topics, creator, trails, stars, steps, peopleWhoStarred, id, trailId, setTrails }: TrailCardProps) {
  const [expanded, setExpanded] = useState<boolean>(false)
  const [user, setUser] = useState<User | undefined>()
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const token: string | number | boolean | object | null = secureLocalStorage.getItem('st_token')
  const [showModal, setShowModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    if (token && typeof token === 'string') {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment
      const tokenUser: User = jwtDecode(token)

      setUser(tokenUser)
    }
  }, [setUser, token])

  const openModal = () => {
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
  }

  const openDeleteModal = () => {
    setShowDeleteModal(true)
  }

  const closeDeleteModal = () => {
    setShowDeleteModal(false)
  }

  function toggleExpand() {
    setExpanded(!expanded)
  }

  function handleDelete() {
    if (typeof token !== 'string') {
      return
    }

    fetch(`${typeof import.meta.env.VITE_API_BASE_URL === 'string' ? import.meta.env.VITE_API_BASE_URL : ''}/trail/${trailId}`, {
      method: 'DELETE',
      headers: {
        Authorization: token,
      },
    })
      .then((res) => {
        if (res.ok) {
          console.log('Trilha deletada com sucesso!')
          const updatedTrails = trails.filter((trail) => trail.id !== trailId)

          setTrails(updatedTrails)
          closeDeleteModal()
        } else {
          console.log(res)
        }
      })
      .catch((err) => console.error(err))

  }


  function addOrRemoveStar() {
    if (typeof token !== 'string') {
      return
    }

    fetch(`${typeof import.meta.env.VITE_API_BASE_URL === 'string' ? import.meta.env.VITE_API_BASE_URL : ''}/trail/star/${trailId}`, {
      method: 'POST',
      headers: {
        Authorization: token
      }
    })
      .then((res) => {
        if (res.ok && user) {
          const updatedTrails = trails.map(trail => {
            if (trail.id === trailId) {
              return {
                ...trail,
                starsCount: trail.stars.map(({ userId }) => userId).includes(user.id)
                  ?
                  Number(trail.starsCount) - 1
                  :
                  Number(trail.starsCount) + 1,
                stars: trail.stars.map(({ userId }) => userId).includes(user.id)
                  ?
                  trail.stars.filter((star) => star.userId !== user.id)
                  :
                  [...trail.stars, { userId: user.id }],
              };
            }
            return trail;
          });

          setTrails(updatedTrails);
        } else {
          console.log(res)
        }
      })
      .catch((err) => console.error(err))
  }

  return (
    <Box
      bg='#333333'
      borderRadius='md'
      boxShadow='md'
      p={4}
      mb={4}
      fontFamily='Barlow, sans-serif'
      color='white'
      key={id}
    >
      <Flex justifyContent='space-between'>
        <Flex align='center' marginBottom='15px' cursor='pointer' onClick={() => navigate(`/profile/${creator.username}`)}>
          <Image
            src={creator.profilePicturePath}
            alt={`${creator.username}'s Profile Picture`}
            boxSize='40px'
            borderRadius='full'
            objectFit='cover'
            mr={2}
          />
          <Text>
            {creator.username} {statusIcons[creator?.level]}
          </Text>
        </Flex>
        {user && user.id === creator.id && (
          <Menu>
            <MenuButton as={IconButton} icon={<EditIcon />} variant='ghost' colorScheme='whatsapp' />
            <MenuList>
              <MenuItem color='#1E1E1E' onClick={() => navigate(`/edit-trail/${trailId}`)}>Editar</MenuItem>
              <MenuItem color='red.500' onClick={openDeleteModal}>Deletar</MenuItem>
            </MenuList>
          </Menu>
        )}
        <Modal isOpen={showDeleteModal} onClose={closeDeleteModal}>
          <ModalOverlay />
          <ModalContent alignSelf='center'>
            <ModalHeader>Confirmar Deleção</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              Tem certeza que deseja deletar esta trilha?
            </ModalBody>
            <ModalFooter>
              <Button colorScheme='gray' mr={3} onClick={closeDeleteModal}>
                Cancelar
              </Button>
              <Button colorScheme='red' onClick={handleDelete}>
                Deletar
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Flex>
      <Heading as='h2' size='md' mb={2}>
        {title}
      </Heading>
      <Flex margin='10px 0px'>
        {topics.slice(0, 3).map((topic, index) => (
          <Badge key={index} colorScheme='whatsapp' mr={1}>
            {topic.name}
          </Badge>
        ))}
        {topics.length > 3 && (
          <Badge
            cursor='pointer'
            onClick={openModal}
            colorScheme='whiteAlpha'
          >
            +
            {topics.slice(3).length}
          </Badge>
        )}
      </Flex>
      <Modal isOpen={showModal} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent alignSelf='center'>
          <ModalCloseButton />
          <ModalBody>
            {topics.map((topic, index) => (
              <Badge key={index} colorScheme='messenger' mr={1}>
                {topic.name}
              </Badge>
            ))}
          </ModalBody>
        </ModalContent>
      </Modal>
      <Flex
        mt={2}
        align='end'
        justify='space-between'
      >
        <Flex
          id={`stars-container-${id}`}
          className={user && peopleWhoStarred.includes(user.id) ? 'marked-stars-container' : ''}
          align='center'
          mt={2}
          padding='4px'
          borderRadius='8px'
          width='max-content !important'
          cursor='pointer'
          onClick={addOrRemoveStar}
        >
          <Text color='white' fontSize='14px'>
            {stars}
          </Text>
          <img id='star' src={star} alt='estrelas' />
        </Flex>
        <Text ml={2} color='white' fontSize='14px' cursor='pointer' onClick={toggleExpand}>
          <ArrowDownIcon
            sx={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)', fontSize: '16px', marginRight: '3px' }}
          />
          {expanded ? 'Fechar' : 'Mostrar Passos'}
        </Text>
      </Flex>
      <Collapse in={expanded} animateOpacity>
        {steps.map((step) => (
          <Box key={step.id} mt={2} ml={4}>
            <Text fontSize='14px' color='white'>
              {step.description}
            </Text>
          </Box>
        ))}
      </Collapse>
    </Box>
  )
}

export default TrailCard
