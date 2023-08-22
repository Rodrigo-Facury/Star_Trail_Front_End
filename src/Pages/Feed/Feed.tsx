import './Feed.css'
import { Box, Center, Container, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import TrailCard from '../../Components/TrailCard'
import StarTrailHeader from '../../Components/StarTrailHeader'
import { FeedResponse, Trail } from '../../../types'
import { useEffect, useState } from 'react'
import StarTrailFooter from '../../Components/StarTrailFooter'

function Feed() {
  const [trails, setTrails] = useState<Trail[]>([])
  const [orderBy, setOrderBy] = useState<string>('createdAt')
  const [reload, setReload] = useState<boolean>(true)

  useEffect(() => {
    if (reload) {
      fetch(`${typeof import.meta.env.VITE_API_BASE_URL === 'string' ? import.meta.env.VITE_API_BASE_URL : ''}/trail?orderBy=${orderBy}`)
        .then((res) => res.json())
        .then(({ trails }: FeedResponse) => {
          setTrails(trails)
        })
        .catch((err) => console.error(err))

      setReload(false)
    }
  }, [orderBy, reload])

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
              onClick={() => {
                setOrderBy('createdAt')
                setReload(true)
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
              onClick={() => {
                setOrderBy('starsCount')
                setReload(true)
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
                      trailId={trail.id}
                      id={`recent-${trail.id}`}
                      title={trail.title}
                      topics={trail.Topics}
                      creator={trail.creator}
                      stars={trail.starsCount}
                      steps={trail.steps.sort((a, b) => a.position - b.position)}
                      peopleWhoStarred={trail.stars.map(({ userId }) => userId)}
                      setReload={setReload}
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
                      trailId={trail.id}
                      id={`popular-${trail.id}`}
                      title={trail.title}
                      topics={trail.Topics}
                      creator={trail.creator}
                      stars={trail.starsCount}
                      steps={trail.steps}
                      peopleWhoStarred={trail.stars.map(({ userId }) => userId)}
                      setReload={setReload}
                    />
                  ))}
                </Box>
              </Center>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
      <StarTrailFooter />
    </main>
  )
}

export default Feed
