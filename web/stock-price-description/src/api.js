const API_BASE_URL = "YOUR_API_URL_HERE"

export async function fetchStockStudy({ tickers, startDate, endDate }) {
    console.log(`${tickers}, ${startDate}, ${endDate}`)
    const response = await fetch(`${API_BASE_URL}/study`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tickers, startDate, endDate }),
    })
    if (!response.ok) throw new Error(`Request failed: ${response.status}`)
    return response.json()
}   
