import { Wrap, WrapItem, Stack, SimpleGrid } from "@chakra-ui/react"
import StudyTickerResult from "./study-ticker-result"

function StudyResults({ results }){
    if (!results) return null

    console.log(results)

    return (
        <SimpleGrid columns={[null, null, 2]} gap="10px">
            {Object.entries(results.studyResults).map(([tickerName, ticker]) => (
                <StudyTickerResult ticker={tickerName} descriptors={ticker.descriptors} plotURL={generate_plot_URL(ticker.plot)}/>
            ))}
        </SimpleGrid>
    )
}

function generate_plot_URL(raw_plot_str){
    const byteCharacters = atob(raw_plot_str);
    const byteNumbers = new Array(byteCharacters.length).fill(0).map((_, i) => byteCharacters.charCodeAt(i));
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'image/png' });
    const imageUrl = URL.createObjectURL(blob);
    return imageUrl
}

export default StudyResults
