import './Feed.css'
import { Box, Center, Container, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import TrailCard from '../../Components/TrailCard'
import StarTrailHeader from '../../Components/StarTrailHeader'

function Feed() {
  const trails = [
    { id: 1, title: 'Trilha 1', creator: { id: 1, firstName: 'Primeiro', lastName: 'Usuário', username: 'usuario1', profilePicturePath: null, level: 0 }, stars: 10 },
    { id: 2, title: 'Trilha 2', creator: { id: 2, firstName: 'Segundo', lastName: 'Usuário', username: 'usuario2', profilePicturePath: null, level: 0 }, stars: 15 },
  ]

  return (
    <main id='feed-page'>
      <StarTrailHeader />
      <Container>
        <Tabs align='end'>
          <TabList
            sx={{
              color: 'white',
              borderBottom: 'none',
              fontFamily: 'Abhaya Libre, serif',
              marginTop: '25px'
            }}
          >
            <Tab
              sx={{
                color: 'white',
                borderBottomColor: 'transparent',
              }}
              _selected={{
                borderBottomColor: '#9FAFFF'
              }}
            >
              Mais Recentes
            </Tab>
            <Tab
              sx={{
                color: 'white',
                borderBottomColor: 'transparent',
              }}
              _selected={{
                borderBottomColor: '#9FAFFF'
              }}
            >
              Mais Populares
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Center>
                <Box mt={6} w='100%'>
                  {trails.map((trail) => (
                    <TrailCard
                      key={trail.id}
                      title={trail.title}
                      creator={trail.creator}
                      stars={trail.stars}
                    />
                  ))}
                </Box>
              </Center>
            </TabPanel>
            <TabPanel>
              {/* Exiba aqui as trilhas mais populares */}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
    </main>
  )
}

export default Feed
