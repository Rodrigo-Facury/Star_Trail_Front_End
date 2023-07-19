import { Button, FormControl, FormHelperText, Input } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"
import PasswordInput from "./PasswordInput";

function SignUpForm() {
  const navigate = useNavigate();

  return (
    <FormControl
      sx={{
        width: "300px",
        display: "flex",
        flexDirection: "column"
      }}
    >
      <Input
        type="email"
        placeholder="E-mail"
        borderColor="#4461F2"
        color="white"
        _placeholder={{
          opacity: 1,
          color: "white",
          fontFamily: "Abhaya Libre, serif"
        }}
        sx={{
          marginBottom: "15px"
        }}
      />
      <PasswordInput placeholder="Senha" sx={{ marginBottom: "15px" }} />
      <PasswordInput placeholder="Confirmar Senha" />
      <Button
        sx={{
          backgroundColor: "#4461F2",
          color: "white",
          fontFamily: "Abhaya Libre, serif",
          marginTop: '35px'
        }}
      >
        Cadastrar
      </Button>
    </FormControl>
  )
}

export default SignUpForm
