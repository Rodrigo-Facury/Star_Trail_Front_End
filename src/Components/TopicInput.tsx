import {
  Input,
  List,
  ListItem,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  Flex,
  Badge,
  IconButton,
} from '@chakra-ui/react'
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import { AddIcon, CloseIcon } from '@chakra-ui/icons';

interface Topic {
  name: string;
}

type TopicInputProps = {
  topics: Topic[]
  selectedTopics: string[]
  setSelectedTopics: Dispatch<SetStateAction<string[]>>
}

function TopicInput({ topics, setSelectedTopics, selectedTopics }: TopicInputProps) {
  const SUGGESTIONS = topics.filter(({ name }) => !selectedTopics.includes(name)).map(({ name }) => name)
  const initialFocusRef = useRef(null)

  const [inputValue, setInputValue] = useState<string>('')
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([])

  useEffect(() => {
    setFilteredSuggestions(SUGGESTIONS.filter(suggestion => suggestion.toLowerCase().includes(inputValue.toLowerCase())))
  }, [inputValue, SUGGESTIONS])

  return (
    <div>
      <Flex>
        <Input
          placeholder='Temas'
          onChange={e => setInputValue(e.target.value)}
          ref={initialFocusRef}
          onKeyUp={({ key }) => {
            if (key === 'Enter') {
              setSelectedTopics((prev) => [...prev, inputValue])
              setInputValue('')
              setFilteredSuggestions([])
            }
          }}
          value={inputValue}
          color='white'
        />
        <IconButton
          colorScheme='purple'
          aria-label="Adicionar"
          icon={<AddIcon />}
          onClick={() => {
            setSelectedTopics((prev) => [...prev, inputValue])
            setInputValue('')
            setFilteredSuggestions([])
          }}
        />
      </Flex>
      <Popover
        isOpen={filteredSuggestions.length > 0 && inputValue.length > 0}
        initialFocusRef={initialFocusRef}
      >
        <PopoverTrigger>
          <div />
        </PopoverTrigger>
        <PopoverContent>
          <PopoverBody>
            <List>
              {filteredSuggestions.map((suggestion, index) => (
                <ListItem
                  cursor='pointer'
                  key={index}
                  onClick={() => {
                    setInputValue('')
                    setFilteredSuggestions([])
                    setSelectedTopics((prev) => [...prev, suggestion])
                  }}
                >
                  {suggestion}
                </ListItem>
              ))}
            </List>
          </PopoverBody>
        </PopoverContent>
      </Popover>
      {selectedTopics[0] && (
        <Flex flexWrap='wrap'>
          {
            selectedTopics.map((topic, i) => (
              <Flex key={i} alignItems='center' margin='10px 7px'>
                <Badge colorScheme='gray' marginRight='5px'>{topic}</Badge>
                <CloseIcon color='red' height='15px' cursor='pointer' onClick={() => setSelectedTopics((prev) => prev.filter((selected) => selected !== topic))} />
              </Flex>
            ))
          }
        </Flex>
      )}
    </div>
  )
}

export default TopicInput
