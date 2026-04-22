import { Box, Text, Stack, HStack } from "@chakra-ui/react"
import { Image } from "@chakra-ui/react"


function StudyTickerResult({ ticker, descriptors, plotURL}){

    console.log(descriptors)

    return (
        <Box borderWidth="1px" borderRadius="md" p={4} minW="200px">
            <Text fontWeight="bold" mb={2}>{ticker}</Text>
            <HStack gap={7} align="flex-end">
                <Image src={plotURL} height="350px" fit="contain" rounded="md"></Image>
                <Stack>
                    <Text><Text fontWeight="bold">Excess Kurtosis</Text> {descriptors.excessKurtosis.toFixed(4)}</Text>
                    <Text><Text fontWeight="bold">Shapiro p-value</Text> {(descriptors.shapiroWilkinsPValue*100).toFixed(4)}%</Text>
                </Stack>
            </HStack>
        </Box>
    )
}

export default StudyTickerResult
