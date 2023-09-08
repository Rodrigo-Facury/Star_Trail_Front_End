import { useEffect, useState } from 'react'
import jwtDecode from 'jwt-decode'
import './StarTrailHeader.css'
import secureLocalStorage from 'react-secure-storage'
import { Topic, Trail, User } from '../../types'
import { Box, Button, Container, Flex, Icon, Image, Input, InputGroup, InputLeftElement, Menu, MenuButton, MenuItem, MenuList, Popover, PopoverArrow, PopoverBody, PopoverContent, PopoverTrigger, Radio, RadioGroup, Stack, Text } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { statusIcons } from '../helpers/statusIcons'
import { AddIcon, SearchIcon } from '@chakra-ui/icons'
import logo from '../assets/star.png'

function StarTrailHeader() {
  const [user, setUser] = useState<User | undefined>()
  const [users, setUsers] = useState<User[] | undefined>()
  const [trails, setTrails] = useState<Trail[] | undefined>()
  const [topics, setTopics] = useState<Topic[] | undefined>()
  const [searchEntity, setSearchEntity] = useState<string>('people')
  const [searchString, setSearchString] = useState<string>('')
  const navigate = useNavigate()

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const token: string | number | boolean | object | null = secureLocalStorage.getItem('st_token')

    if (token && typeof token === 'string') {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment
      const tokenUser: User = jwtDecode(token)

      setUser(tokenUser)
    }
  }, [setUser])

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
            <Flex alignItems='center' marginRight='15px' cursor='pointer'>
              <SearchIcon color='gray.400' boxSize='25px' />
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
