import yfinance as yf
import pandas as pd
import numpy as np
from scipy import stats
import io
import seaborn as sns
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import base64

def run_normality_study(tickers : list[str], start_date : str, end_date : str) -> dict[str, dict[str, float]]:
    study_results = {}
    ticker_close_prices = get_study_data(tickers=tickers, start_date=start_date, end_date=end_date) 
    ticker_daily_log_returns = get_daily_log_returns_from_raw_data(ticker_close_prices)
    for ticker in ticker_daily_log_returns.columns.values:
        study_results[ticker] = {"descriptors" : calculate_descriptors(ticker_daily_log_returns[ticker])}
        study_results[ticker].update({"plot" : generate_qq_plot(ticker, ticker_daily_log_returns[ticker])})
    return study_results

def calculate_descriptors(ticker_daily_log_returns : pd.Series) -> dict[str, float]:
    excess_kurtosis : float = 3 - stats.kurtosis(ticker_daily_log_returns)
    skewness : float = stats.skew(ticker_daily_log_returns)
    mean : float = ticker_daily_log_returns.mean()
    std_d : float = ticker_daily_log_returns.std()
    shap_w, shap_p = stats.shapiro(ticker_daily_log_returns.sample(n=100, random_state = 42))
    return {
        "excessKurtosis" : excess_kurtosis,
        "skewness" : skewness,
        "mean" : mean,
        "std" : std_d,
        "shapiroWilkinsPValue" : shap_p
    }

def generate_qq_plot(ticker:str, ticker_daily_log_returns : pd.Series) -> str:
    buf = io.BytesIO()
    plt.figure(figsize=(8,6), dpi=100)
    stats.probplot(ticker_daily_log_returns,dist="norm", plot=plt)
    plt.title(f"Normalidade da distribuição de {ticker}")
    plt.savefig(buf, format='webp')
    plt.close()
    buf.seek(0)
    img_b64_str = base64.b64encode(buf.read()).decode('utf-8')
    return img_b64_str

def get_study_data(tickers : list[str], start_date : str, end_date : str) -> pd.DataFrame:
    raw_tickers_data = yf.download(tickers, start=start_date, end=end_date, auto_adjust=True)
    close_prices = raw_tickers_data["Close"]
    return close_prices

def get_daily_log_returns_from_raw_data(raw_study_data : pd.DataFrame) -> pd.DataFrame:
    daily_log_returns = {}
    for ticker in raw_study_data.columns.values:
        daily_log_returns[ticker] = np.log(raw_study_data[ticker] / raw_study_data[ticker].shift(1))
    daily_log_returns = pd.DataFrame(daily_log_returns).dropna()
    return daily_log_returns
