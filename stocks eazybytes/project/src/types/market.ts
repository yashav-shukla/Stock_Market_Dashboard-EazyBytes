export interface MarketData {
  symbol: string;
  price: number;
  change: number;
  volume: number;
  high: number;
  low: number;
  open: number;
  previousClose: number;
}

export interface MarketTrend {
  timeframe: '1D' | '1W' | '1M' | '3M' | '1Y';
  direction: 'up' | 'down' | 'neutral';
  strength: number; // 0-100
  volume: number;
  priceChange: number;
}