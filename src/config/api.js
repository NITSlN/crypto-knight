export const trendingCoins = (currency) => {
  return `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=geckodesc&per_page=10&page=1&sparkline=false`
}
export const SingleCoin = (id) => `https://api.coingecko.com/api/v3/coins/${id}`


export const HistoricalChart = (id, days = 365, currency) =>
  `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`
