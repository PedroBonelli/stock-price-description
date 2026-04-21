import { useState } from "react"
import { HStack, Stack, Button } from "@chakra-ui/react"
import StudyControlsDatePicker from "./study-controls-date-picker"
import TickerSelector from "./ticker-selector"
import { fetchStockStudy } from "../api"

function StudyControls(){
    const [tickers, setTickers] = useState(["AAPL", "MSFT", "GOOG"])
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [loading, setLoading] = useState(false)

    async function handleSubmit() {
        setLoading(true)
        try {
            console.log(startDate)
            console.log(endDate)
            const data = await fetchStockStudy({ tickers, startDate, endDate })
            console.log(data) // replace with actual result handling
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Stack>
            <TickerSelector value={tickers} onValueChange={setTickers} />
            <HStack>
                <StudyControlsDatePicker
                    fieldName="Data Inicial de Referência"
                    setDateValue={setStartDate}
                />
                <StudyControlsDatePicker
                    fieldName="Data Final de Referência"
                    setDateValue={setEndDate}
                />
                <Button onClick={handleSubmit} loading={loading}>
                    Analisar
                </Button>
            </HStack>
        </Stack>
    )
}

export default StudyControls