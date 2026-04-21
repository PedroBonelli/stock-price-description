import { TagsInput, Span } from "@chakra-ui/react"


function TickerSelector({ value, onValueChange }){
    return(
    <TagsInput.Root value={value} onValueChange={({ value }) => onValueChange(value)} size={"lg"}>
        <TagsInput.Label>Tickers</TagsInput.Label>
        <TagsInput.Control>
            <TagsInput.Items />
            <TagsInput.Input placeholder="Adicionar ticker..." />
        </TagsInput.Control>
        <Span textStyle="xs" color="fg.muted" ms="auto">
            Pressione Enter ou Return para adicionar ticker
        </Span>
    </TagsInput.Root>
    )
}

export default TickerSelector