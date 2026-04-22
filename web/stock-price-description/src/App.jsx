import { useState } from "react"
import { Container, Stack } from "@chakra-ui/react"
import TickerSelector from "./components/ticker-selector"
import StudyControls from "./components/study-controls"
import StudyResults from "./components/study-results"
import { fetchNormalityStudy } from "./api"

function App() {
  const [tickers, setTickers] = useState(["AAPL", "MSFT", "GOOG"])
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [studyResult, setStudyResult] = useState(null) 

  async function handleSubmit() {
    try {
      const results = await fetchNormalityStudy({ tickers, startDate, endDate })
      setStudyResult(results)
      console.log(results)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <Container>
      <Stack gap={10}>
        <StudyControls tickers={tickers} setTickers={setTickers} setStartDate={setStartDate} setEndDate={setEndDate} handleSubmit={handleSubmit} />
        <StudyResults results={studyResult} />
      </Stack>
    </Container>
  )
}

export default App
