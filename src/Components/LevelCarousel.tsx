import { Box, Flex, Heading, Img, Text } from '@chakra-ui/react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import whiteDwarf from '../assets/1.png'
import brownDwarf from '../assets/2.png'
import redDwarf from '../assets/3.png'
import luminousBlue from '../assets/4.png'
import supernova from '../assets/5.png'
import { LockIcon } from '@chakra-ui/icons'

const data = [
  { id: 1, title: 'Anã Branca', description: 'Possui pelo menos uma trilha com mais de 5 curtidas', image: whiteDwarf },
  { id: 2, title: 'Anã Marrom', description: 'Possui pelo menos uma trilha com mais de 50 curtidas', image: brownDwarf },
  { id: 3, title: 'Anã Vermelha', description: 'Possui pelo menos cinco trilhas com mais de 100 curtidas cada', image: redDwarf },
  { id: 4, title: 'Azul Luminosa', description: 'Possui pelo menos dez trilhas com mais de 150 curtidas cada', image: luminousBlue },
  { id: 5, title: 'Supernova', description: 'Possui pelo menos vinte trilhas com mais de 200 curtidas cada', image: supernova },
]

function LevelCarousel({ userLevel }: { userLevel?: number }) {
  const settings = {
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  }

  return (
    <Box id='conquests' margin='35px 0px' width='80vw' alignSelf='center'>
      <Slider {...settings}>
        {data.map((item) => (
          <Flex key={item.id}>
            <Flex flexDirection='column' margin='auto' alignItems='center' backgroundColor='whiteAlpha.200' width='200px' borderRadius='13px'>
              {
                userLevel !== undefined
                  &&
                  userLevel < item.id
                  ?
                  <LockIcon position='absolute' boxSize='5%' height='100%' opacity='85%' color='#1E1E1E' />
                  :
                  null
              }
              <Img src={item.image} alt={item.title} boxSize='200px' borderTopRadius='13px' />
              <Heading zIndex={1} fontSize='2xl' mt={3} color='white'>{item.title}</Heading>
              <Text zIndex={1} textAlign='center' fontSize='1xl' mt={2} mb={2} color='white'>{item.description}</Text>
            </Flex>
          </Flex>
        ))}
      </Slider>
    </Box>
  )
}

export default LevelCarousel
