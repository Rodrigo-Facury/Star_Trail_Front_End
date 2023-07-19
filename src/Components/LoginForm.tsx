import {
  // Avatar,
  // Box,
  Button,
  // Flex,
  FormControl,
  FormHelperText,
  Input,
  // Text,
  // Wrap,
  // WrapItem
} from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"
import PasswordInput from "./PasswordInput"
// import facebookLogo from "../assets/facebook-logo.png"
// import googleLogo from "../assets/google-logo.png"


function LoginForm() {
  const navigate = useNavigate();

  return (
    <FormControl
      sx={{
        width: "300px",
        display: "flex",
        flexDirection: "column",
        alignSelf: "center"
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
      <PasswordInput placeholder="Senha" />
      <FormHelperText
        onClick={() => navigate("/recover-password")}
        color={"white"}
        fontFamily="Abhaya Libre, serif"
        sx={{
          alignSelf: "flex-end",
          cursor: 'pointer'
        }}
      >
        Esqueceu a senha?
      </FormHelperText>
      <Button
        sx={{
          backgroundColor: "#4461F2",
          color: "white",
          fontFamily: "Abhaya Libre, serif",
          marginTop: '25px'
        }}
      >
        Entrar
      </Button>

      {/* <Flex alignItems="center" marginTop="30px" justifyContent="center" width="100%">
        <Box
          sx={{
            backgroundColor: "#DFDFDF",
            width: "50px",
            height: "1px",
          }}
          flex="1"
        ></Box>
        <Text
          sx={{
            color: "white",
            fontFamily: "Abhaya Libre, serif",
            fontSize: "15px",
            margin: "0px 20px"
          }}
        >
          Ou continue com
        </Text>
        <Box
          sx={{
            backgroundColor: "#DFDFDF",
            width: "50px",
            height: "1px",
          }}
          flex="1"
        ></Box>
      </Flex>
      <Wrap display="flex" justifyContent="center" alignItems="center" marginTop="25px">
        <WrapItem display="flex" alignItems="center">
          <Avatar boxSize="42px" name="Entrar com Facebook" src={facebookLogo} />
        </WrapItem>
        <WrapItem>
          <Avatar marginLeft="50px" boxSize="35px" name="Entrar com Google" src={googleLogo} />
        </WrapItem>
      </Wrap> */}
    </FormControl>
  )
}

export default LoginForm
