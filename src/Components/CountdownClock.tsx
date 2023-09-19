import { useCallback, useEffect, useState } from 'react'
import {
  Box,
  Text,
  Flex,
  Center,
  ChakraProvider,
  extendTheme,
} from '@chakra-ui/react'

const theme = extendTheme({
  fonts: {
    heading: 'Montserrat, sans-serif',
    body: 'Montserrat, sans-serif',
  },
})

function CountdownClock() {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())

  function calculateTimeLeft() {
    const targetDate = new Date('2024-01-01T00:00:00-03:00')
    const now = new Date()
    const difference = targetDate.getTime() - now.getTime()

    if (difference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      }
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24))
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((difference % (1000 * 60)) / 1000)

    return {
      days,
      hours,
      minutes,
      seconds,
    }
  }

  const calculateCallback = useCallback(calculateTimeLeft, [])

  useEffect(() => {
    const interval = setInterval(() => {
      const timeLeft = calculateCallback()
      setTimeLeft(timeLeft)
    }, 1000)

    return () => clearInterval(interval)
  }, [calculateCallback])

  return (
    <ChakraProvider theme={theme}>
      <Center>
        <Box textAlign='center'>
          <Flex align='center' justify='center'>
            <Box p='3' m='2' bg='teal.500' color='white' borderRadius='md'>
              <Text fontSize='2xl' fontWeight='bold'>
                {timeLeft.days}
              </Text>
              <Text>Dias</Text>
            </Box>
            <Box p='3' m='2' bg='teal.500' color='white' borderRadius='md'>
              <Text fontSize='2xl' fontWeight='bold'>
                {timeLeft.hours}
              </Text>
              <Text>Horas</Text>
            </Box>
            <Box p='3' m='2' bg='teal.500' color='white' borderRadius='md'>
              <Text fontSize='2xl' fontWeight='bold'>
                {timeLeft.minutes}
              </Text>
              <Text>Minutos</Text>
            </Box>
            <Box p='3' m='2' bg='teal.500' color='white' borderRadius='md'>
              <Text fontSize='2xl' fontWeight='bold'>
                {timeLeft.seconds}
              </Text>
              <Text>Segundos</Text>
            </Box>
          </Flex>
        </Box>
      </Center>
    </ChakraProvider>
  )
}

export default CountdownClock
