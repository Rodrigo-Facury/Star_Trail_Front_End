import { useParams } from 'react-router-dom'
import StarTrailFooter from '../../Components/StarTrailFooter'
import StarTrailHeader from '../../Components/StarTrailHeader'
import './Profile.css'
import { useEffect, useState } from 'react'
import { User } from '../../../types'
import { Flex, Heading, Image, Text, Button, Input, FormLabel, Card, CardHeader, CardBody, Textarea } from '@chakra-ui/react'
import secureLocalStorage from 'react-secure-storage'
import jwtDecode from 'jwt-decode'
import { EditIcon } from '@chakra-ui/icons'
import { statusIcons } from '../../helpers/statusIcons'

function Profile() {
  const [user, setUser] = useState<User | undefined>()
  const [me, setMe] = useState<User | undefined>()
  const [reload, setReload] = useState<boolean>(true)
  const [isEditing, setIsEditing] = useState(false)
  const [editedUser, setEditedUser] = useState<User>({ id: 0, firstName: '', lastName: '', username: '', profilePicturePath: '', level: 0 })
  const [newProfilePicture, setNewProfilePicture] = useState<File | null>(null)

  const { username } = useParams()
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const token: string | number | boolean | object | null = secureLocalStorage.getItem('st_token')


  useEffect(() => {
    if (token && typeof token === 'string' && reload) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment
      const tokenUser: User = jwtDecode(token)

      setMe(tokenUser)
    }

    setReload(false)
  }, [setMe, token, user, reload])

  useEffect(() => {
    if (username) {
      fetch(`${typeof import.meta.env.VITE_API_BASE_URL === 'string' ? import.meta.env.VITE_API_BASE_URL : ''}/user/username-exact/${username}`)
        .then((res) => res.json())
        .then(({ user: resUser }: { user: User }) => {
          setUser(resUser)
          setEditedUser(resUser)
        })
        .catch((err) => console.error(err))
    }

    if (reload) {
      setReload(false)
    }
  }, [username, reload, me])

  useEffect(() => {
    if (username) {
      fetch(`${typeof import.meta.env.VITE_API_BASE_URL === 'string' ? import.meta.env.VITE_API_BASE_URL : ''}/user/username-exact/${username}`)
        .then((res) => res.json())
        .then(({ user: resUser }: { user: User }) => {
          setUser(resUser)
          setEditedUser(resUser)
        })
        .catch((err) => console.error(err))
    }
  }, [username])

  const handleEditToggle = () => {
    setIsEditing(!isEditing)
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target

    setEditedUser((prevUser: User) => ({
      ...prevUser,
      [name]: value,
    }))
  }


  const handleProfilePictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files && event.target.files[0]
    setNewProfilePicture(selectedFile)
  }

  const handleSaveChanges = () => {
    if (editedUser) {
      const formData = new FormData()
      formData.append('firstName', editedUser.firstName || '')
      formData.append('lastName', editedUser.lastName || '')
      formData.append('aboutMe', editedUser.aboutMe || '')

      if (newProfilePicture) {
        formData.append('profilePicturePath', newProfilePicture)
      }

      if (typeof token === 'string') {
        fetch(`${typeof import.meta.env.VITE_API_BASE_URL === 'string' ? import.meta.env.VITE_API_BASE_URL : ''}/user`, {
          method: 'PUT',
          headers: {
            'Accept': 'application/json',
            Authorization: token,
          },
          body: formData,
        })
          .then((res) => {
            if (res.ok) {
              console.log('Usuário editado com sucesso!')

              return res.json()
            } else {
              console.log('Erro ao editar usuário')
            }
          })
          .then(({ newToken }: { newToken: string }) => {
            secureLocalStorage.setItem('st_token', newToken)
            setReload(true)
          })
          .catch((err) => console.error(err))
      }
    }

    setIsEditing(false)
  }

  function follow() {
    if (typeof token === 'string' && typeof import.meta.env.VITE_API_BASE_URL === 'string' && user) {
      fetch(`${import.meta.env.VITE_API_BASE_URL}/user/follow/${user.id}`, {
        method: 'POST',
        headers: {
          Authorization: token,
        }
      })
        .then((res) => {
          if (res.ok) {
            console.log('Usuário seguido com sucesso!')

            return res.json()
          } else {
            console.log('Erro ao seguir usuário')
          }
        })
        .then((data: { newToken: string }) => {
          secureLocalStorage.setItem('st_token', data.newToken)

          setReload(true)
        })
        .catch((err) => console.error(err))
    }
  }

  function unfollow() {
    if (typeof token === 'string' && typeof import.meta.env.VITE_API_BASE_URL === 'string' && user) {
      fetch(`${import.meta.env.VITE_API_BASE_URL}/user/unfollow/${user.id}`, {
        method: 'POST',
        headers: {
          Authorization: token,
        }
      })
        .then((res) => {
          if (res.ok) {
            console.log('Seguida removida com sucesso!')

            return res.json()
          } else {
            console.log('Erro ao remover seguida usuário')
          }
        })
        .then((data: { newToken: string }) => {
          secureLocalStorage.setItem('st_token', data.newToken)

          setReload(true)
        })
        .catch((err) => console.error(err))
    }
  }

  return (
    <main id='profile-page'>
      <StarTrailHeader />
      {
        user
        &&
        <Flex flexGrow='1' id='profile-container'>
          <Flex alignItems='center' flexDirection='column' margin='auto' id='user-info'>
            {
              isEditing
                ?
                <FormLabel htmlFor='profile-picture-input'>
                  <Image
                    src={newProfilePicture ? URL.createObjectURL(newProfilePicture) : user.profilePicturePath}
                    objectFit='cover'
                    boxSize='150px'
                    borderRadius='50%'
                    cursor='pointer'
                  />
                  <Input
                    id='profile-picture-input'
                    type='file'
                    accept='image/*'
                    style={{ display: 'none' }}
                    onChange={handleProfilePictureChange}
                  />
                </FormLabel>
                :
                <Image
                  src={user.profilePicturePath}
                  objectFit='cover'
                  boxSize='150px'
                  borderRadius='50%'
                />
            }
            <Flex color='whiteAlpha.900' flexDirection='column'>
              {
                isEditing
                  ?
                  <Flex flexDirection='column'>
                    <FormLabel htmlFor='firstName'>
                      Nome
                      <Input id='firstName' name='firstName' value={editedUser?.firstName} onChange={handleInputChange} />
                    </FormLabel>
                    <FormLabel htmlFor='lastName'>
                      Sobrenome
                      <Input id='lastName' name='lastName' value={editedUser?.lastName} onChange={handleInputChange} />
                    </FormLabel>
                  </Flex>
                  :
                  <Heading fontSize='3xl' marginTop='8px'>{user.firstName} {user.lastName}</Heading>
              }
              <Text fontSize='20px'>{user.username} <span>{statusIcons[user.level]}</span> { user.isWinner && <Text display='inline' color='whatsapp.400'>$$</Text> }</Text>
              {
                user.username === me?.username
                  ?
                  isEditing
                    ?
                    (
                      <Flex marginTop='25px' alignSelf='flex-end'>
                        <Button colorScheme='gray' onClick={handleEditToggle}>Cancelar</Button>
                        <Button colorScheme='whatsapp' marginLeft='10px' onClick={handleSaveChanges}>Salvar</Button>
                      </Flex>
                    )
                    :
                    <Button marginTop='15px' colorScheme='purple' onClick={handleEditToggle}>Editar</Button>
                  :
                  me?.peopleIFollow?.includes(user.id)
                    ?
                    <Button marginTop='15px' colorScheme='purple' onClick={unfollow}>
                      <span className="material-symbols-outlined">
                        person_remove
                      </span>
                      <Text marginLeft='5px'>Deixar de seguir</Text>
                    </Button>
                    :
                    <Button marginTop='15px' colorScheme='whatsapp' onClick={follow}>
                      <span className='material-symbols-outlined'>
                        person_add
                      </span>
                      <Text marginLeft='5px'>Seguir</Text>
                    </Button>
              }
            </Flex>
          </Flex>
          <Flex margin='auto'>
            <Card variant='filled' marginTop='25px' bgColor='#3f3f3f' color='white' width='50vw' maxWidth='650px' id='about-me'>
              <CardHeader>
                <Heading size='sm'>Sobre mim</Heading>
              </CardHeader>
              <CardBody display='flex' paddingTop='0px'>
                {
                  user.username === me?.username
                    ?
                    isEditing
                      ?
                      <Flex flexDirection='column' width='100%'>
                        <Textarea width='100%' id='aboutMe' name='aboutMe' value={editedUser?.aboutMe} onChange={handleInputChange} />
                        <Button
                          colorScheme='whatsapp'
                          onClick={handleSaveChanges}
                          alignSelf='flex-end'
                          marginTop='15px'
                        >
                          Salvar
                        </Button>
                      </Flex>
                      :
                      <Flex flexDirection='column' width='100%'>
                        <Text whiteSpace='pre-line'>{user.aboutMe}</Text>
                        <Button
                          colorScheme='purple'
                          onClick={handleEditToggle}
                          margin='auto'
                          marginTop='10px'
                        >
                          <EditIcon marginRight='5px' />
                          Alterar descrição
                        </Button>
                      </Flex>
                    :
                    <Text whiteSpace='pre-line'>{user.aboutMe}</Text>
                }
              </CardBody>
            </Card>
          </Flex>
        </Flex>
      }
      <StarTrailFooter />
    </main>
  )
}

export default Profile
