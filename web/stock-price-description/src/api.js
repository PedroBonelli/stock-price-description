const API_BASE_URL = "http://localhost:8000"

export async function fetchNormalityStudy({ tickers, startDate, endDate }) {
    const queryParams = new URLSearchParams();
    for (const ticker of tickers) {
        queryParams.append("tickers", ticker)
    }
    queryParams.append("start_date", formatDate(startDate))
    queryParams.append("end_date", formatDate(endDate))

    const response = await fetch(`${API_BASE_URL}/normality?${queryParams}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    })
    if (!response.ok) throw new Error(`Request failed: ${response.status}`)
    return response.json()
}   

function formatDate(raw_date){
   let [d, m, y] = raw_date.split('/')
   return `${y}-${m}-${d}`
}