import { useState } from 'react';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  Textarea,
} from '@chakra-ui/react';
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from 'react-beautiful-dnd';

interface Step {
  id: string;
  description: string;
}

function TrailCreationForm() {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [steps, setSteps] = useState<Step[]>([{ id: 'step-0', description: '' }]);

  const generateId = () => `step-${steps.length}`;

  const handleCreateTrail = () => {
    const trailData = {
      title,
      description,
      steps: steps.map((step) => step.description).filter(Boolean),
    };

    fetch('http://localhost:3001/trail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(trailData),
    })
      .then((res) => {
        if (res.ok) {
          console.log('Trilha criada com sucesso!');
        } else {
          console.log('Erro ao criar trilha');
        }
      })
      .catch((err) => console.error(err));
  };

  const handleStepChange = (id: string, newDescription: string) => {
    const newSteps = steps.map((step) =>
      step.id === id ? { ...step, description: newDescription } : step
    );
    setSteps(newSteps);
  };

  const handleAddStep = () => {
    const newStep: Step = { id: generateId(), description: '' };
    setSteps([...steps, newStep]);
  };

  const handleRemoveStep = (id: string) => {
    const newSteps = steps.filter((step) => step.id !== id);
    setSteps(newSteps);
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const reorderedSteps = [...steps];
    const [reorderedStep] = reorderedSteps.splice(result.source.index, 1);
    reorderedSteps.splice(result.destination.index, 0, reorderedStep);

    setSteps(reorderedSteps);
  };

  return (
    <Container maxWidth="55%">
      <Box mt={6}>
        <FormControl mb={4}>
          <FormLabel>Title</FormLabel>
          <Input
            placeholder="Adicione um título à trilha"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            color='white'
          />
        </FormControl>
        <FormControl>
          <FormLabel>Description</FormLabel>
          <Textarea
            placeholder="Crie uma descrição"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            color='white'
          />
        </FormControl>
        <Button mt={4} colorScheme="blue" onClick={handleAddStep}>
          Adicionar Passo
        </Button>
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="droppable-steps" direction="vertical">
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
                        <FormControl>
                          <FormLabel color='white'>Passo {index + 1}</FormLabel>
                          <Textarea
                            placeholder={`Descrição do Passo ${index + 1}`}
                            value={step.description}
                            onChange={(e) => handleStepChange(step.id, e.target.value)}
                            color='white'
                          />
                          <Button
                            mt={2}
                            colorScheme="red"
                            size="sm"
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
        <Button mt={4} colorScheme="blue" onClick={handleCreateTrail}>
          Criar
        </Button>
      </Box>
    </Container>
  );
}

export default TrailCreationForm;
