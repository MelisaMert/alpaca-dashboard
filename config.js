const stockMarketConfig = {
  API_KEY: "L4TQD9ACJ8QWMEJA"
}

export const config = {
    ALPACA_API_KEY_ID: "PKSNNLZU1KZXCZJPERST",
    ALPACA_API_SECRET_KEY: "l6H14GFSl5NUsKqh1gGHRgtiAtg7LhfdvTLU3qSj", 
    BASE_URL: "https://paper-api.alpaca.markets/",
    POLYGON_URL: "https://api.polygon.io/"
}

export const getStockAPI = (Stock_Symbol) => {
    return `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${Stock_Symbol}&outputsize=compact&apikey=${stockMarketConfig.API_KEY}`;
}

