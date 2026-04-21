from fastapi import FastAPI
import yfinance

app = FastAPI()

@app.get("/")
def read_root():
    return {"message":"api is running :)"}

@app.get("/normality")
def get_ticker_stats(tickers : list[str], start_date : str, end_date : str):
    ticker_d = yfinance.Ticker(ticker)
    return {"ticker" : (ticker_d.info, ticker_d.get_shares)}