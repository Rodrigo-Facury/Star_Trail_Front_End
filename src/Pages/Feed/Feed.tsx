import './Feed.css'
import { Box, Center, Container, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import TrailCard from '../../Components/TrailCard'
import StarTrailHeader from '../../Components/StarTrailHeader'
import { FeedResponse, Trail } from '../../../types'
import { useEffect, useState } from 'react'

function Feed() {
  const [trails, setTrails] = useState<Trail[]>([])
  const [orderBy, setOrderBy] = useState<string>('createdAt')

  useEffect(() => {
    fetch(`http://localhost:3001/trail?orderBy=${orderBy}`)
      .then((res) => res.json())
      .then(({ trails }: FeedResponse) => setTrails(trails))
      .catch((err) => console.error(err))
  }, [orderBy])

  return (
    <main id='feed-page'>
      <StarTrailHeader />
      <Container minWidth='60vw'>
        <Tabs align='start'>
          <TabList
            sx={{
              color: 'white',
              borderBottom: 'none',
              fontFamily: 'Barlow, sans-serif',
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
              onClick={() => setOrderBy('createdAt')}
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
              onClick={() => setOrderBy('starsCount')}
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
                      stars={trail.starsCount}
                      steps={trail.steps}
                    />
                  ))}
                </Box>
              </Center>
            </TabPanel>
            <TabPanel>
              <Center>
                <Box mt={6} w='100%'>
                  {trails.map((trail) => (
                    <TrailCard
                      key={trail.id}
                      title={trail.title}
                      creator={trail.creator}
                      stars={trail.starsCount}
                      steps={trail.steps}
                    />
                  ))}
                </Box>
              </Center>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
    </main>
  )
}

export default Feed
