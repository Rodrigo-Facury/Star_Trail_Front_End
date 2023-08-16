import { useEffect, useState } from 'react'
import jwtDecode from 'jwt-decode'
import './StarTrailHeader.css'
import secureLocalStorage from 'react-secure-storage'
import { User } from '../../types'
import { Button, Container, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { statusIcons } from '../helpers/statusIcons'

function StarTrailHeader() {
  const [user, setUser] = useState<User | undefined>()
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

  return (
    <header className="star-trail-header">
      <div className="star-trail-logo" onClick={() => navigate('/')}>
        <h1>Star Trail</h1>
      </div>
      <Container margin='0px' width='fit-content'>
        <Button marginRight='10px' colorScheme='whatsapp' padding='15px' fontFamily='barlow, sans-serif' fontSize='18px' onClick={() => {
          if (user) {
            navigate('/create-trail')
          } else {
            navigate('/login')
          }
        }}>
          Criar Trilha
        </Button>
        {
          user
            ?
            <Menu>
              <MenuButton as={Button} colorScheme="teal" variant="outline" padding='20px 15px'>
                <div id='menu-title'>
                  <div className="user-avatar">
                    <img src={user?.profilePicturePath || 'https://random.imagecdn.app/40/40'} alt="Avatar do Usuário" />
                  </div>
                  <h2>{user?.username} {statusIcons[user?.level]}</h2>
                </div>
              </MenuButton>
              <MenuList>
                <MenuItem onClick={() => navigate('/profile')}>Meu Perfil</MenuItem>
                <MenuItem onClick={() => navigate('/my-trails')}>Minhas Trilhas</MenuItem>
                <MenuItem onClick={() => navigate('/trails-i-follow')}>Trilhas Que Sigo</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </MenuList>
            </Menu>
            :
            <div>
              <Button colorScheme="teal" variant="outline" padding='15px' onClick={() => navigate('/login')}>
                Login ou Cadastro
              </Button>
            </div>
        }
      </Container>
    </header>
  )
}

export default StarTrailHeader
