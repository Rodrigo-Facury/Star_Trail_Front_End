import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import { ChangeEventHandler, KeyboardEventHandler, useState } from 'react'

interface PasswordInputProps {
  placeholder: string,
  sx?: object,
  name: string,
  value?: string,
  title?: string,
  onChange: ChangeEventHandler<HTMLInputElement> | undefined,
  onKeyUp: KeyboardEventHandler<HTMLInputElement>
}

function PasswordInput({ onKeyUp, onChange, name, placeholder, sx, value, title }: PasswordInputProps) {
  const [show, setShow] = useState(false)
  const handleClick = () => setShow(!show)

  return (
    <InputGroup size='md'>
      <Input
        onChange={onChange}
        onKeyUp={onKeyUp}
        name={name}
        value={value}
        title={title}
        pr='4.5rem'
        type={show ? 'text' : 'password'}
        placeholder={placeholder}
        borderColor='#4461F2'
        color='white'
        _placeholder={{
          opacity: 1,
          color: 'white',
          fontFamily: 'Abhaya Libre, serif'
        }}
        sx={sx}
      />
      <InputRightElement width='4.5rem'>
        {
          show
            ?
            <ViewOffIcon onClick={handleClick} color='white' cursor='pointer' />
            :
            <ViewIcon onClick={handleClick} color='white' cursor='pointer' />
        }
      </InputRightElement>
    </InputGroup>
  )
}

export default PasswordInput
