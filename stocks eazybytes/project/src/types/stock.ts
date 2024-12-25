export interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
}

export interface Portfolio {
  stocks: PortfolioItem[];
  totalValue: number;
  dailyChange: number;
}

export interface PortfolioItem {
  symbol: string;
  shares: number;
  averagePrice: number;
  currentPrice: number;
}

export interface StockChartData {
  timestamp: string;
  price: number;
}