import { useEffect, useState } from 'react'
import { Box, Table, Thead, Tbody, Tr, Th, Td, Img, Flex, Text } from '@chakra-ui/react'
import { RankingData, RankingResponse } from '../../../types'
import './Ranking.css'
import StarTrailHeader from '../../Components/StarTrailHeader'
import { useNavigate } from 'react-router-dom'

function Ranking() {
  const [rankingData, setRankingData] = useState<RankingData[] | []>([])
  const [stopFeed, setStopFeed] = useState<boolean>(false)
  const [firstRequest, setFirstRequest] = useState<boolean>(true)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [reload, setReload] = useState<boolean>(true)

  const navigate = useNavigate()

  useEffect(() => {
    if (reload && !stopFeed) {
      fetch(`${typeof import.meta.env.VITE_API_BASE_URL === 'string' ? import.meta.env.VITE_API_BASE_URL : ''}/trail/ranking?page=${currentPage}`)
        .then((res) => res.json())
        .then(({ trails, nextPage, totalPages }: RankingResponse) => {
          if (firstRequest) {
            setRankingData(trails)
            setFirstRequest(false)
          } else {
            setRankingData((prevTrails) => [...prevTrails, ...trails])
          }

          if (nextPage <= totalPages) {
            setCurrentPage(nextPage)
          } else {
            setStopFeed(true)
          }
        })
        .catch((err) => console.error(err))

      setReload(false)
    }

  }, [firstRequest, stopFeed, currentPage, reload])

  function handleScroll() {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement

    if (scrollHeight - scrollTop === clientHeight) {
      setReload(true)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <Box className='ranking-page' p={4} display='flex' flexDirection='column' padding='0px'>
      <StarTrailHeader />
      <Table variant='striped' color='white' width='800px' maxWidth='85vw' colorScheme='whiteAlpha' alignSelf='center' marginTop='35px'>
        <Thead>
          <Tr>
            <Th color='white' padding='12px'>Posição</Th>
            <Th color='white'>Usuário</Th>
            <Th color='white' className='disappear-mobile'>Trilha</Th>
            <Th color='white'>Estrelas</Th>
          </Tr>
        </Thead>
        <Tbody>
          {rankingData.map((entry) => (
            <Tr key={entry.id}>
              <Td padding='10px'>{entry.position}</Td>
              <Td cursor='pointer' onClick={() => navigate(`/profile/${entry.username}`)}>
                <Flex alignItems='center'>
                  <Img
                    src={entry.profilePicturePath}
                    borderRadius='50%'
                    width='30px'
                    height='30px'
                    objectFit='cover'
                    marginRight='15px'
                  /> {entry.username}
                </Flex>
              </Td>
              <Td className='disappear-mobile' cursor='pointer' onClick={() => navigate(`/?trailId=${entry.id}`)}>
                <Text title={entry.title} isTruncated maxWidth='150px'>
                  {entry.title}
                </Text>
              </Td>
              <Td>{entry.stars}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  )
}

export default Ranking
