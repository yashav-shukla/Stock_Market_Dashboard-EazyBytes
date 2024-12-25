import { MarketData, MarketTrend } from '../types/market';

export const calculateRSI = (prices: number[]): number => {
  const periods = 14;
  const gains: number[] = [];
  const losses: number[] = [];

  for (let i = 1; i < prices.length; i++) {
    const difference = prices[i] - prices[i - 1];
    if (difference >= 0) {
      gains.push(difference);
      losses.push(0);
    } else {
      gains.push(0);
      losses.push(Math.abs(difference));
    }
  }

  const avgGain = gains.slice(-periods).reduce((a, b) => a + b) / periods;
  const avgLoss = losses.slice(-periods).reduce((a, b) => a + b) / periods;
  
  const rs = avgGain / avgLoss;
  return 100 - (100 / (1 + rs));
};

export const analyzeTrend = (data: MarketData[]): MarketTrend => {
  const prices = data.map(d => d.price);
  const volumes = data.map(d => d.volume);
  const rsi = calculateRSI(prices);
  
  const priceChange = ((prices[prices.length - 1] - prices[0]) / prices[0]) * 100;
  const averageVolume = volumes.reduce((a, b) => a + b) / volumes.length;
  
  return {
    timeframe: '1D',
    direction: priceChange > 0 ? 'up' : priceChange < 0 ? 'down' : 'neutral',
    strength: rsi,
    volume: averageVolume,
    priceChange
  };
};