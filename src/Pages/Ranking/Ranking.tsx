import { useEffect, useState } from 'react'
import { Box, Table, Thead, Tbody, Tr, Th, Td, Img, Flex, Text, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Link } from '@chakra-ui/react'
import { RankingData, RankingResponse } from '../../../types'
import './Ranking.css'
import StarTrailHeader from '../../Components/StarTrailHeader'
import { useNavigate } from 'react-router-dom'
import StarTrailFooter from '../../Components/StarTrailFooter'
import CountdownClock from '../../Components/CountdownClock'

function Ranking() {
  const [rankingData, setRankingData] = useState<RankingData[] | []>([])
  const [stopFeed, setStopFeed] = useState<boolean>(false)
  const [firstRequest, setFirstRequest] = useState<boolean>(true)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [reload, setReload] = useState<boolean>(true)
  const [isOpen, setIsOpen] = useState(false)

  const onClose = () => setIsOpen(false)
  const openModal = () => setIsOpen(true)

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

  const explanationText = 'A pessoa dona da trilha mais curtida à 00:00 do dia 01/01/2024 ganhará US$50. Em caso de empate, o valor será dividido entre os ganhadores.'

  return (
    <Box className='ranking-page' p={4} display='flex' flexDirection='column' justifyContent='space-between' padding='0px'>
      <StarTrailHeader />
      <Flex flexDirection='column' flexGrow='1'>
        <Text fontSize="lg" mb={4} color='white' alignSelf='center' width='800px' maxWidth='85vw' marginTop='35px'>
          {explanationText}
          <Text display='inline'> Confira o regulamento <Link display='inline' color='whatsapp.400' onClick={openModal}> clicando aqui.</Link></Text>
        </Text>
        <CountdownClock />
        <Table variant='striped' color='white' width='800px' maxWidth='85vw' colorScheme='whiteAlpha' alignSelf='center' marginTop='20px'>
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
                <Td onClick={() => navigate(`/?trailId=${entry.id}`)}>{entry.stars}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Flex>
      <StarTrailFooter />

      <Modal isOpen={isOpen} onClose={onClose} size='lg'>
        <ModalOverlay />
        <ModalContent width='600px' maxWidth='90%'>
          <ModalHeader>Regulamento da Competição de Popularidade de Trilhas - Star Trail</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontSize="md">
              <strong>1. Introdução</strong>
              <br />
              Este regulamento estabelece as regras e diretrizes para a competição de ranking das Trilhas Star Trail, onde os participantes competem para ganhar prêmios em dinheiro. A competição tem como objetivo incentivar a criação e compartilhamento de trilhas de qualidade dentro da plataforma Star Trail.
            </Text>

            <Text fontSize="lg" fontWeight="bold" mt="4">
              2. Período da Competição
            </Text>
            <Text fontSize="md">
              A competição terá início às 00:00 do dia 20/09/2023 - UTC-3 e se encerrará às 00:00 do dia 01/01/2024 - UTC-3, quando o resultado será homologado. Qualquer trilha criada e compartilhada dentro deste período será considerada elegível para a competição.
            </Text>

            <Text fontSize="lg" fontWeight="bold" mt="4">
              3. Elegibilidade
            </Text>

            <Text fontSize="md">
              A competição está aberta a todas as pessoas registradas na plataforma Star Trail. Exceto pessoas envolvidas diretamente na construção da plataforma.
            </Text>

            <Text fontSize="lg" fontWeight="bold" mt="4">
              4. Regras da Competição
            </Text>
            <Text fontSize="md" marginBottom='10px'>
              Durante o período da competição, os participantes podem criar e compartilhar trilhas na plataforma Star Trail.
            </Text>

            <Text fontSize="md" marginBottom='10px'>
              A trilha mais curtida às 00:00 do dia 01/01/2024 será declarada vencedora.
            </Text>

            <Text fontSize="md" marginBottom='10px'>
              Em caso de empate, o prêmio será igualmente dividido entre os ganhadores.
            </Text>

            <Text fontSize="md" marginBottom='10px'>
              É estritamente proibido o uso de métodos fraudulentos para aumentar as curtidas em uma trilha. Qualquer participante que for descoberto utilizando práticas desonestas será desqualificado e poderá ser banido da plataforma.
            </Text>

            <Text fontSize="md" marginBottom='10px'>
              O resultado da competição será final e não estará sujeito a contestações.
            </Text>

            <Text fontSize="lg" fontWeight="bold" mt="4">
              5. Prêmio
            </Text>

            <Text fontSize="md" marginBottom='10px'>
              O vencedor da competição receberá um prêmio em dinheiro no valor de $50 (cinquenta dólares).
            </Text>

            <Text fontSize="md" marginBottom='10px'>
              Em caso de empate, o prêmio será igualmente dividido entre os ganhadores.
            </Text>

            <Text fontSize="lg" fontWeight="bold" mt="4">
              6. Comunicação dos Vencedores
            </Text>

            <Text fontSize="md" marginBottom='10px'>
              Os vencedores serão anunciados no e-mail cadastrado na plataforma Star Trail em até 2 (dois) dias úteis após o encerramento da competição.
            </Text>

            <Text fontSize="md" marginBottom='10px'>
              Os prêmios serão entregues aos vencedores por meio dos métodos de pagamento informados via e-mail, quando solicitado.
            </Text>

            <Text fontSize="lg" fontWeight="bold" mt="4">
              7. Disposições Finais
            </Text>

            <Text fontSize="md" marginBottom='10px'>
              A administração da plataforma Star Trail se reserva o direito de alterar ou cancelar a competição a qualquer momento, por qualquer motivo, sem aviso prévio.
            </Text>

            <Text fontSize="md" marginBottom='10px'>
              Este regulamento está sujeito a alterações a critério da administração da plataforma Star Trail.
            </Text>

            <Text fontSize="md" marginBottom='10px'>
              Ao participar da competição, os participantes concordam em cumprir este regulamento e aceitam todas as decisões da administração da plataforma como finais e vinculativas.
            </Text>

            <Text fontSize="md" mt="4">
              Agradecemos por escolher a Star Trail para compartilhar e explorar trilhas de aprendizagem. Desejamos uma boa sorte a todas as pessoas participantes!
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='whatsapp' onClick={onClose}>
              Fechar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  )
}

export default Ranking
