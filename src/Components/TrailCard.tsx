import { Box, Flex, Heading, Image, Text } from '@chakra-ui/react'
import { User } from '../../types'

type TrailCardProps = {
  title: string;
  creator: User;
  stars: number;
}

function TrailCard({ title, creator, stars }: TrailCardProps) {
  return (
    <Box
      bg='white'
      borderRadius='md'
      boxShadow='md'
      p={4}
      mb={4}
    >
      <Heading as='h2' size='md' mb={2}>
        {title}
      </Heading>
      <Flex align='center'>
        <Image
          src={creator.profilePicturePath || 'https://random.imagecdn.app/40/40'}
          alt={`${creator.username}'s Profile Picture`}
          boxSize='40px'
          borderRadius='full'
          mr={2}
        />
        <Text>
          Criado por {creator.username} (Nível {creator.level})
        </Text>
      </Flex>
      <Flex align='center' mt={2}>
        <Text>
          {stars} Estrelas
        </Text>
      </Flex>
    </Box>
  )
}

export default TrailCard
