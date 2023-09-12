import "./Login.css"
import logo from "../../assets/logo.png"
import LoginForm from "../../Components/LoginForm"
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react"
import SignUpForm from "../../Components/SignUpForm"
import { Dispatch, SetStateAction } from "react"

function Login({ setReloadToken }: { setReloadToken: Dispatch<SetStateAction<boolean>> }) {
  return (
    <main id="login-page">
      <h1 id="title">Star Trail</h1>
      <h2 id="welcome">Entre e trilhe seu caminho!</h2>
      <img id="stars" width={350} src={logo} alt="Logo da Star Trail" />
      <Tabs
        align="end"
        id="tabs"
      >
        <TabList
          id="tab-list"
          sx={{
            color: "white",
            borderBottom: "none",
            fontFamily: "Abhaya Libre, serif",
            position: "absolute",
            top: "25px"
          }}
        >
          <Tab
            sx={{
              color: "white",
              borderBottomColor: "transparent",
            }}
            _selected={{
              borderBottomColor: "#9FAFFF"
            }}
          >
            Entrar
          </Tab>
          <Tab
            sx={{
              color: "white",
              borderBottomColor: "transparent",
            }}
            _selected={{
              borderBottomColor: "#9FAFFF"
            }}
          >
            Cadastrar
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <LoginForm setReloadToken={setReloadToken} />
          </TabPanel>
          <TabPanel>
            <SignUpForm setReloadToken={setReloadToken} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </main>
  )
}

export default Login
