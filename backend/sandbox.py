import yfinance as yf, pandas as pd, numpy as np 
from scipy import stats
import seaborn as sns
import matplotlib.pyplot as plt

aapl_hist : pd.DataFrame | None = yf.download(tickers="AAPL", start="2014-01-01", end="2024-01-01", auto_adjust=True)
if aapl_hist is None:
    print("ticker not found")
else:
    aapl_close_prices = aapl_hist["Close"].squeeze()
    aapl_log_daily_returns = pd.Series(np.log(aapl_close_prices / aapl_close_prices.shift(1))).dropna()
    skewness = stats.skew(aapl_log_daily_returns)
    kurtosis = stats.kurtosis(aapl_log_daily_returns)
    mean = aapl_log_daily_returns.mean()
    stde = aapl_log_daily_returns.std()
    w, p_value = stats.shapiro(aapl_log_daily_returns.sample(n=500, random_state=42))
    print(f'stats => mean {mean:.4f} stde {stde:.4f} skewness {skewness:.4f} kurtosis {kurtosis:.4f}')
    print(f'shapiro-wilk => W ({w:.4f}) P-value ({p_value:.4f})')
    plt.figure(figsize=(8,6))
    stats.probplot(aapl_log_daily_returns, dist="norm", plot=plt)
    plt.title("Normal QQ Plot")
    plt.show()