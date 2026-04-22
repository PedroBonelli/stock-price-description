from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from normality import run_normality_study
import logging

logger = logging.getLogger("uvicorn.error")
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins="http://localhost:5173",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message":"api is running :)"}

@app.get("/normality")
async def get_ticker_stats(tickers : list[str] = Query(), start_date : str = Query(), end_date : str = Query()):
    logger.info(f'{tickers} - {start_date} - {end_date}')
    study_results = run_normality_study(tickers, start_date, end_date)
    return {"studyResults" : study_results}