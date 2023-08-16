import { Box, Collapse, Flex, Heading, Image, Text } from '@chakra-ui/react'
import { Step, User } from '../../types'
import { statusIcons } from '../helpers/statusIcons'
import star from '../assets/star.png'
import './TrailCard.css'
import { useState } from 'react'
import { ArrowDownIcon } from '@chakra-ui/icons'

type TrailCardProps = {
  title: string
  creator: User
  stars: number
  steps: Step[]
}

function TrailCard({ title, creator, stars, steps }: TrailCardProps) {
  const [expanded, setExpanded] = useState<boolean>(false)

  function toggleExpand() {
    setExpanded(!expanded)
  }

  function addStar() {
    console.log('add')
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
    >
      <Flex align='center' marginBottom='15px'>
        <Image
          src={creator.profilePicturePath || 'https://random.imagecdn.app/40/40'}
          alt={`${creator.username}'s Profile Picture`}
          boxSize='40px'
          borderRadius='full'
          mr={2}
        />
        <Text>
          {creator.username} {statusIcons[creator?.level]}
        </Text>
      </Flex>
      <Heading as='h2' size='md' mb={2}>
        {title}
      </Heading>

      <Flex
        mt={2}
        align='end'
        justify='space-between'
        cursor='pointer'
        onClick={toggleExpand}
      >
        <Flex
          id='stars-container'
          align='center'
          mt={2}
          padding='4px'
          borderRadius='8px'
          width='max-content !important'
          cursor='pointer'
          onClick={addStar}
        >
          <Text color='white' fontSize='14px'>
            {stars}
          </Text>
          <img id='star' src={star} alt='estrelas' />
        </Flex>
        <Text ml={2} color='white' fontSize='14px'>
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
