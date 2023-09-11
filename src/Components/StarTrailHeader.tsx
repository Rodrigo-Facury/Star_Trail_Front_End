import { useCallback, useEffect, useState } from 'react'
import jwtDecode from 'jwt-decode'
import './StarTrailHeader.css'
import secureLocalStorage from 'react-secure-storage'
import { Topic, Trail, User } from '../../types'
import {
  Box,
  Button,
  Container,
  Flex,
  Icon,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Radio,
  RadioGroup,
  Stack,
  Text
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { statusIcons } from '../helpers/statusIcons'
import {
  AddIcon,
  BellIcon,
  SearchIcon
} from '@chakra-ui/icons'
import logo from '../assets/star.png'
import parseDate from '../helpers/parseDate'

function StarTrailHeader() {
  const [user, setUser] = useState<User | undefined>()
  const [users, setUsers] = useState<User[] | undefined>()
  const [trails, setTrails] = useState<Trail[] | undefined>()
  const [topics, setTopics] = useState<Topic[] | undefined>()
  const [searchEntity, setSearchEntity] = useState<string>('people')
  const [searchString, setSearchString] = useState<string>('')
  const [notifications, setNotifications] = useState<{
    id: string,
    message: string,
    createdAt: string,
    seen: boolean,
    goto?: string
  }[] | undefined>()
  const navigate = useNavigate()
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const token: string | number | boolean | object | null = secureLocalStorage.getItem('st_token')

  useEffect(() => {
    if (token && typeof token === 'string') {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment
      const tokenUser: User = jwtDecode(token)

      if (tokenUser.exp && tokenUser.exp * 1000 < Date.now()) {
        secureLocalStorage.removeItem('st_token')

        return
      }

      setUser(tokenUser)
    }
  }, [setUser, token])

  const handleLogout = () => {
    secureLocalStorage.removeItem('st_token')
    setUser(undefined)
  }

  const handleSearch = () => {
    if (!searchString) {
      setTrails(undefined)
      setUsers(undefined)
      setTopics(undefined)

      return;
    }

    if (searchEntity === 'people') {
      fetch(`${typeof import.meta.env.VITE_API_BASE_URL === 'string' ? import.meta.env.VITE_API_BASE_URL : ''}/user/username/${searchString}`)
        .then(async (res) => {
          if (res.ok) {
            return res.json()
          }
        })
        .then((data: { users: User[] }) => {
          setUsers(data.users)
        })
        .catch((err) => {
          console.log(err)
        })
    } else if (searchEntity === 'topics') {
      fetch(`${typeof import.meta.env.VITE_API_BASE_URL === 'string' ? import.meta.env.VITE_API_BASE_URL : ''}/topic/${searchString}`)
        .then(async (res) => {
          if (res.ok) {
            return res.json()
          }
        })
        .then((data: { topicsWithTrailCount: Topic[] }) => {
          setTopics(data.topicsWithTrailCount)
        })
        .catch((err) => {
          console.log(err)
        })
    } else if (searchEntity === 'trails') {
      fetch(`${typeof import.meta.env.VITE_API_BASE_URL === 'string' ? import.meta.env.VITE_API_BASE_URL : ''}/trail/title/${searchString}`)
        .then(async (res) => {
          if (res.ok) {
            return res.json()
          }
        })
        .then((data: { trails: Trail[] }) => {
          setTrails(data.trails)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  function getNotifications() {
    if (typeof token === 'string' && typeof import.meta.env.VITE_API_BASE_URL === 'string' && user) {
      fetch(`${import.meta.env.VITE_API_BASE_URL}/user/notifications`, {
        method: 'GET',
        headers: {
          Authorization: token,
        }
      })
        .then((res) => {
          if (res.ok) {
            console.log('Notificações recuperadas com sucesso!')

            return res.json()
          } else {
            console.log('Erro ao recuperar notificações')
          }
        })
        .then((data: {
          notifications: {
            id: string,
            message: string,
            createdAt: string,
            seen: boolean,
            goto?: string
          }[]
        }) => {
          setNotifications(data.notifications)
        })
        .catch((err) => console.error(err))
    }
  }

  const notificationsCallback = useCallback(getNotifications, [token, user])

  useEffect(() => {
    notificationsCallback()
  }, [notificationsCallback])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target

    return setSearchString(value)
  }

  const handleRadioChange = (nextVaule: string) => {
    return setSearchEntity(nextVaule)
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <header className='star-trail-header'>
      <div className='star-trail-logo' onClick={() => navigate('/')}>
        <h1 id='font-logo'>Star Trail</h1>
        <Image id='image-logo' src={logo} boxSize='38px' display='none' />
      </div>
      <Flex margin='0px' width='fit-content' padding='0px'>
        <Popover>
          <PopoverTrigger>
            <Flex alignItems='center' marginRight='20px' cursor='pointer'>
              <SearchIcon color='gray.400' fontSize='30px' />
            </Flex>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverBody backgroundColor='blackAlpha.800'>
              <Box margin='5px 0px 15px 0px'>
                <InputGroup>
                  <InputLeftElement pointerEvents='none'>
                    <Icon as={SearchIcon} color='gray.400' />
                  </InputLeftElement>
                  <Input type='text' color='white' placeholder='Pesquisar' onKeyUp={handleKeyPress} onChange={handleInputChange} />
                </InputGroup>
              </Box>
              <RadioGroup defaultValue='people' color='white' onChange={handleRadioChange}>
                <Stack spacing={5} direction='row'>
                  <Radio value='people'>
                    Pessoas
                  </Radio>
                  <Radio value='topics'>
                    Temas
                  </Radio>
                  <Radio value='trails'>
                    Trilhas
                  </Radio>
                </Stack>
              </RadioGroup>
              {
                users && searchEntity === 'people'
                &&
                <Container marginTop='20px'>
                  {
                    users.map(({ username, profilePicturePath }) => (
                      <Flex
                        cursor='pointer'
                        key={username}
                        marginTop='10px'
                        justifyContent='space-between'
                        onClick={() => navigate(`/profile/${username}`)}
                        alignItems='center'
                      >
                        <div className='user-avatar'>
                          <Image src={profilePicturePath} alt='Avatar do Usuário' />
                        </div>
                        <Text color='white'>{username}</Text>
                      </Flex>
                    ))
                  }
                </Container>
              }

              {
                topics && searchEntity === 'topics'
                &&
                <Container marginTop='20px'>
                  {
                    topics.map(({ name, trailCount, id }) => (
                      <Flex
                        cursor='pointer'
                        key={name}
                        marginTop='10px'
                        justifyContent='space-between'
                        alignItems='center'
                        onClick={() => navigate(`/?topicId=${id ? id : '1'}`)}
                      >
                        <Text color='white'>{name}</Text>
                        <Text color='teal' fontSize='13px' textDecoration='underline'>{trailCount} trilhas</Text>
                      </Flex>
                    ))
                  }
                </Container>
              }

              {
                trails && searchEntity === 'trails'
                &&
                <Container marginTop='20px'>
                  {
                    trails.map(({ id, title }) => (
                      <Text
                        key={id}
                        cursor='pointer'
                        color='white'
                        marginTop='20px'
                        onClick={() => navigate(`/?trailId=${id ? id : '1'}`)}
                      >
                        {title}
                      </Text>
                    ))
                  }
                </Container>
              }
            </PopoverBody>
          </PopoverContent>
        </Popover>
        <Button
          id='create-trail-button'
          marginRight='15px'
          colorScheme='whatsapp'
          padding='15px'
          fontFamily='barlow, sans-serif'
          fontSize='18px'
          onClick={() => {
            if (user) {
              navigate('/create-trail')
            } else {
              navigate('/login')
            }
          }}
        >
          <span id='create-trail-text'>Criar Trilha</span>
          <AddIcon id='add-icon' display='none' />
        </Button>
        {
          user
          &&
          <Popover>
            <PopoverTrigger>
              <Flex alignItems='center' marginRight='15px' boxSize='40px' cursor='pointer' onClick={getNotifications}>
                <BellIcon color='gray.400' fontSize='40px' />
                {
                  notifications && notifications?.filter(({ seen }) => !seen).length > 0
                  &&
                  <Text
                    bgColor='red'
                    color='white'
                    fontWeight='600'
                    fontSize='12px'
                    borderRadius='2px'
                    padding='2px'
                    position='relative'
                    right='16px'
                    bottom='10px'
                  >
                    {notifications?.filter(({ seen }) => !seen).length}
                  </Text>
                }
              </Flex>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverBody backgroundColor='blackAlpha.800' padding='0px'>
                {
                  notifications?.slice(0, 4).map(({ id, message, createdAt, seen, goto }) => (
                    <Flex
                      key={id}
                      direction='column'
                      cursor='pointer'
                      padding='10px'
                      bgColor={seen ? 'transparent' : 'teal.900'}
                      onClick={() => {
                        if (token && typeof token === 'string') {
                          fetch(`${typeof import.meta.env.VITE_API_BASE_URL === 'string' ? import.meta.env.VITE_API_BASE_URL : ''}/user/see-notification/${id}`, {
                            method: 'PUT',
                            headers: {
                              Authorization: token
                            }
                          })
                            .then((res) => {
                              if (res.ok) {
                                getNotifications()
                              }
                            })
                            .catch((err) => {
                              console.log(err)
                            })
                        }

                        if (goto) {
                          navigate(goto)
                        }


                      }}
                    >
                      <Text color='whatsapp.500' fontSize='12px' alignSelf='flex-end' margin='5px 0px'>{parseDate(createdAt)}</Text>
                      <Text color='white'>{message}</Text>
                    </Flex>
                  ))
                }
                <Flex width='100%' justifyContent='center' padding='5px' cursor='pointer' onClick={() => navigate('/notifications')}>
                  <Text color='whatsapp.500' textAlign='center'>Ver todas</Text>
                </Flex>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        }
        {
          user
            ?
            <Menu>
              <MenuButton className='avatar-container' as={Button} colorScheme='teal' variant='outline' padding='20px 15px'>
                <div id='menu-title'>
                  <div className='user-avatar'>
                    <Image src={user?.profilePicturePath} alt='Avatar do Usuário' />
                  </div>
                  <Flex alignItems='center'>
                    <Text id='username' marginRight='5px'>{user?.username}</Text>
                    {statusIcons[user?.level]}
                  </Flex>
                </div>
              </MenuButton>
              <MenuList>
                <MenuItem onClick={() => navigate(`/profile/${user.username}`)}>Meu Perfil</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </MenuList>
            </Menu>
            :
            <Button colorScheme='teal' variant='outline' padding='15px' onClick={() => navigate('/login')}>
              Login
            </Button>
        }
      </Flex>
    </header>
  )
}

export default StarTrailHeader
