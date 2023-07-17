import "./Login.css"
import logo from "../../assets/logo.png"
import { FormControl, FormHelperText, Input } from "@chakra-ui/react"
import PasswordInput from "../../Components/PasswordInput"

function Login() {
  return (
    <main id="login-page">
      <h1 id="title">Star Trail</h1>
      <h2 id="welcome">Entre e trace seu caminho!</h2>
      <img src={logo} alt="Logo da Star Trail" />
      <FormControl>
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
        />
        <PasswordInput />
        <FormHelperText color={"white"} fontFamily="Abhaya Libre, serif">Esqueceu a senha?</FormHelperText>
      </FormControl>
    </main>
  )
}

export default Login
