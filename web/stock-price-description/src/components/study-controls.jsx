import { HStack, Stack, Button } from "@chakra-ui/react"
import StudyControlsDatePicker from "./study-controls-date-picker"
import TickerSelector from "./ticker-selector"

function StudyControls({tickers, setTickers, setStartDate, setEndDate, handleSubmit}){

    return (
        <Stack gap={5}>
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
                <Button onClick={() => handleSubmit()} marginTop="25px" flex="1">
                    Analisar
                </Button>
            </HStack>
        </Stack>
    )
}

export default StudyControls