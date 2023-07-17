import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons"
import { Input, InputGroup, InputRightElement } from "@chakra-ui/react"
import { useState } from "react"

function PasswordInput() {
  const [show, setShow] = useState(false)
  const handleClick = () => setShow(!show)

  return (
    <InputGroup size='md'>
      <Input
        pr='4.5rem'
        type={show ? 'text' : 'password'}
        placeholder='Senha'
        borderColor="#4461F2"
        color="white"
        _placeholder={{
          opacity: 1,
          color: "white",
          fontFamily: "Abhaya Libre, serif"
        }}
      />
      <InputRightElement width='4.5rem'>
        {
          show
            ?
            <ViewOffIcon onClick={handleClick} color="white" cursor="pointer" />
            :
            <ViewIcon onClick={handleClick} color="white" cursor="pointer" />
        }
      </InputRightElement>
    </InputGroup>
  )
}

export default PasswordInput
