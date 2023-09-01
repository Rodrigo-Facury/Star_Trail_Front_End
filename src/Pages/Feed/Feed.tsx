import './Feed.css'
import { Box, Center, Container, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import TrailCard from '../../Components/TrailCard'
import StarTrailHeader from '../../Components/StarTrailHeader'
import { FeedResponse, Trail } from '../../../types'
import React, { useEffect, useState } from 'react'
import StarTrailFooter from '../../Components/StarTrailFooter'

function Feed() {
  const [trails, setTrails] = useState<Trail[]>([])
  const [orderBy, setOrderBy] = useState<string>('createdAt')
  const [reload, setReload] = useState<boolean>(true)
  const [stopFeed, setStopFeed] = useState<boolean>(false)
  const [firstRequest, setFirstRequest] = useState<boolean>(true)
  const [currentPage, setCurrentPage] = useState<number>(1)

  useEffect(() => {
    if (reload && !stopFeed) {
      fetch(`${typeof import.meta.env.VITE_API_BASE_URL === 'string' ? import.meta.env.VITE_API_BASE_URL : ''}/trail?orderBy=${orderBy}&page=${currentPage}`)
        .then((res) => res.json())
        .then(({ trails, nextPage, totalPages }: FeedResponse) => {

          if (firstRequest) {
            setTrails(trails)
            setFirstRequest(false)
          } else {
            setTrails((prevTrails) => [...prevTrails, ...trails])
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

  }, [orderBy, reload, currentPage, stopFeed, firstRequest])

  useEffect(() => {
    setStopFeed(false)
    setFirstRequest(true)
    setCurrentPage(1)
  }, [orderBy])

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
    <main id='feed-page'>
      <StarTrailHeader />
      <Container id='feed-container' maxWidth='700px' padding='0px' flexGrow='1' alignSelf='center'>
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
            <TabPanel padding='0px'>
              <Center>
                <Box mt={6} w='100%'>
                  {trails.map((trail, index) => (
                    <React.Fragment key={trail.id}>
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
                        setTrails={setTrails}
                        trails={trails}
                      />
                      {(index + 1) % 5 === 0 && index !== trails.length - 1 && (
                        <div className="ads-container">
                          <ins
                            className="adsbygoogle"
                            style={{ display: 'block' }}
                            data-ad-format="fluid"
                            data-ad-layout-key="-gu-1c+5a-1w-7f"
                            data-ad-client="ca-pub-7126972184814436"
                            data-ad-slot="3120459766"
                          ></ins>
                        </div>
                      )}
                    </React.Fragment>
                  ))}
                </Box>
              </Center>
            </TabPanel>
            <TabPanel padding='0px'>
              <Center>
                <Box mt={6} w='100%'>
                  {trails.map((trail, index) => (
                    <React.Fragment key={trail.id}>
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
                        setTrails={setTrails}
                        trails={trails}
                      />
                      {(index + 1) % 5 === 0 && index !== trails.length - 1 && (
                        <div className="ads-container">
                          <ins
                            className="adsbygoogle"
                            style={{ display: 'block' }}
                            data-ad-format="fluid"
                            data-ad-layout-key="-gu-1c+5a-1w-7f"
                            data-ad-client="ca-pub-7126972184814436"
                            data-ad-slot="3120459766"
                          ></ins>
                        </div>
                      )}
                    </React.Fragment>
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
