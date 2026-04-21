import { Container, Stack } from "@chakra-ui/react"
import TickerSelector from "./components/ticker-selector"
import StudyControls from "./components/study-controls"

function App() {
  return (
    <Container>
      <Stack>
        <StudyControls></StudyControls>
      </Stack>
    </Container>
  )
}

export default App
