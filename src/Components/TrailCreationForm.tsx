import { useEffect, useState } from 'react'
import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Textarea,
} from '@chakra-ui/react'
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from 'react-beautiful-dnd'
import secureLocalStorage from 'react-secure-storage'
import { useNavigate } from 'react-router-dom'
import TopicInput from './TopicInput'
import { Trail } from '../../types'

interface Step {
  id: string
  description: string
  stepId?: number
}

interface Topic {
  name: string
}

type TrailCreationFormProps = {
  trailId: number
}

function TrailCreationForm({ trailId }: TrailCreationFormProps) {
  const [title, setTitle] = useState<string>('')
  const [steps, setSteps] = useState<Step[]>([{ id: 'step-0', description: ''}])
  const token: string | number | boolean | object | null = secureLocalStorage.getItem('st_token')
  const [selectedTopics, setSelectedTopics] = useState<string[]>([])
  const [topics, setTopics] = useState<Topic[]>([])
  const navigate = useNavigate()

  const generateId = () => `step-${steps.length}`

  const handleCreateTrail = () => {
    const trailData = {
      title,
      steps: steps.map((step, index) => ({ description: step.description, position: index + 1 })),
      topics: selectedTopics
    }

    if (typeof token !== 'string') {
      return
    }

    fetch(`${typeof import.meta.env.VITE_API_BASE_URL === 'string' ? import.meta.env.VITE_API_BASE_URL : ''}/trail`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify(trailData),
    })
      .then((res) => {
        if (res.ok) {
          console.log('Trilha criada com sucesso!')
          navigate('/')
        } else {
          console.log('Erro ao criar trilha')
        }
      })
      .catch((err) => console.error(err))
  }

  const handleEditTrail = () => {
    const trailData = {
      title,
      steps: steps.map((step, index) => ({ description: step.description, position: index + 1, id: step.stepId })),
      topics: selectedTopics
    }

    if (typeof token !== 'string') {
      return
    }

    fetch(`${typeof import.meta.env.VITE_API_BASE_URL === 'string' ? import.meta.env.VITE_API_BASE_URL : ''}/trail/${trailId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify(trailData),
    })
      .then((res) => {
        if (res.ok) {
          console.log('Trilha editada com sucesso!')
          navigate('/')
        } else {
          console.log('Erro ao editar trilha')
        }
      })
      .catch((err) => console.error(err))
  }

  const handleStepChange = (id: string, newDescription: string) => {
    const newSteps = steps.map((step) =>
      step.id === id ? { ...step, description: newDescription } : step
    )
    setSteps(newSteps)
  }

  const handleAddStep = () => {
    const newStep: Step = { id: generateId(), description: '' }
    setSteps([...steps, newStep])
  }

  const handleRemoveStep = (id: string) => {
    const newSteps = steps.filter((step) => step.id !== id)
    setSteps(newSteps)
  }

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return
    }

    const reorderedSteps = [...steps]
    const [reorderedStep] = reorderedSteps.splice(result.source.index, 1)
    reorderedSteps.splice(result.destination.index, 0, reorderedStep)

    setSteps(reorderedSteps)
  }

  useEffect(() => {
    fetch(`${typeof import.meta.env.VITE_API_BASE_URL === 'string' ? import.meta.env.VITE_API_BASE_URL : ''}/topic`)
      .then((res) => res.json())
      .then(({ topics }: { topics: Topic[] }) => {
        setTopics(topics)
      })
      .catch((err) => console.error(err))
  }, [])

  useEffect(() => {
    fetch(`${typeof import.meta.env.VITE_API_BASE_URL === 'string' ? import.meta.env.VITE_API_BASE_URL : ''}/trail/${trailId}`)
      .then((res) => res.json())
      .then(({ trail }: { trail: Trail }) => {
        setTitle(trail.title)
        setSteps(trail.steps.sort((a, b) => a.position - b.position).map(({ description, id }, i) => ({ id: `step-${i}`, description, stepId: id })))
        setSelectedTopics(trail.Topics.map(({ name }) => name))
      })
      .catch((err) => console.error(err))
  }, [trailId])

  return (
    <Container maxWidth='55%'>
      <Box mt={6}>
        <FormControl mb={4}>
          <FormLabel>Title</FormLabel>
          <Input
            placeholder='Adicione um título à trilha'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            color='white'
          />
        </FormControl>
        <FormControl marginTop='35px'>
          <TopicInput topics={topics} setSelectedTopics={setSelectedTopics} selectedTopics={selectedTopics} />
        </FormControl>
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId='droppable-steps' direction='vertical'>
            {(provided) => (
              <Box mt={4} ref={provided.innerRef} {...provided.droppableProps}>
                {steps.map((step, index) => (
                  <Draggable key={step.id} draggableId={step.id} index={index}>
                    {(provided) => (
                      <Box
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        key={step.id}
                        mt={4}
                      >
                        <FormControl margin='30px 0px'>
                          <FormLabel color='white'>Passo {index + 1}</FormLabel>
                          <Textarea
                            placeholder={`Descrição do Passo ${index + 1}`}
                            value={step.description}
                            onChange={(e) => handleStepChange(step.id, e.target.value)}
                            color='white'
                          />
                          <Button
                            mt={2}
                            colorScheme='red'
                            size='sm'
                            onClick={() => handleRemoveStep(step.id)}
                          >
                            Remover Passo
                          </Button>
                        </FormControl>
                      </Box>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </Box>
            )}
          </Droppable>
        </DragDropContext>
        <Container margin='15px 0px' padding='0px'>
          <Button mt={4} colorScheme='purple' onClick={handleAddStep}>
            Adicionar Passo
          </Button>
        </Container>
        <Flex justifyContent='flex-end'>
          {
            trailId
              ?
              <Button mt={4} colorScheme='whatsapp' onClick={handleEditTrail}>
                Editar
              </Button>
              :
              <Button mt={4} colorScheme='whatsapp' onClick={handleCreateTrail}>
                Criar
              </Button>
          }
        </Flex>
      </Box>
    </Container>
  )
}

export default TrailCreationForm
