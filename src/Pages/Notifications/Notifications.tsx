import { Divider, Flex, Text } from '@chakra-ui/react'
import StarTrailFooter from '../../Components/StarTrailFooter'
import StarTrailHeader from '../../Components/StarTrailHeader'
import './Notifications.css'
import { useEffect, useState } from 'react'
import secureLocalStorage from 'react-secure-storage'
import parseDate from '../../helpers/parseDate'
import { useNavigate } from 'react-router-dom'

function Notifications() {
  const [notifications, setNotifications] = useState<{
    id: string,
    message: string,
    createdAt: string,
    seen: boolean,
    goto?: string
  }[] | undefined>()
  const [reload, setReload] = useState<boolean>(true)

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const token: string | number | boolean | object | null = secureLocalStorage.getItem('st_token')
  const navigate = useNavigate()

  useEffect(() => {
    if (typeof token === 'string' && typeof import.meta.env.VITE_API_BASE_URL === 'string') {
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
    if (reload) {
      setReload(false)
    }
  }, [reload, token])

  return (
    <main id='notifications-page'>
      <StarTrailHeader />
      <Flex id='notifications-container' direction='column' alignSelf='center' flexGrow='1' width='60vw' marginTop='20px'>
        {
          notifications?.map(({ id, message, createdAt, seen, goto }) => (
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
                        setReload(true)
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
              <Text color='white' marginBottom='5px'>{message}</Text>
              { seen && <Divider /> }
            </Flex>
          ))
        }
      </Flex>
      <StarTrailFooter />
    </main>
  )
}

export default Notifications
