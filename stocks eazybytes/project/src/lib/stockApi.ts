import yahooFinance from 'yahoo-finance2';
import type { MarketData } from '../types/market';

const WS_URL = 'wss://streamer.finance.yahoo.com';
let ws: WebSocket | null = null;
let subscribers: ((quotes: Record<string, MarketData>) => void)[] = [];

export const getQuotes = async (symbols: string[]): Promise<Record<string, MarketData>> => {
  try {
    const quotes = await yahooFinance.quote(symbols);
    return quotes.reduce((acc, quote) => ({
      ...acc,
      [quote.symbol]: {
        symbol: quote.symbol,
        price: quote.regularMarketPrice,
        change: quote.regularMarketChange,
        volume: quote.regularMarketVolume,
        high: quote.regularMarketDayHigh,
        low: quote.regularMarketDayLow,
        open: quote.regularMarketOpen,
        previousClose: quote.regularMarketPreviousClose,
      },
    }), {});
  } catch (error) {
    console.error('Failed to fetch quotes:', error);
    throw error;
  }
};

export const subscribeToQuotes = (
  symbols: string[],
  callback: (quotes: Record<string, MarketData>) => void
) => {
  subscribers.push(callback);

  if (!ws) {
    ws = new WebSocket(WS_URL);
    
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      // Transform the data and notify subscribers
      const quotes = transformWebSocketData(data);
      subscribers.forEach(cb => cb(quotes));
    };

    ws.onopen = () => {
      if (ws) {
        ws.send(JSON.stringify({
          subscribe: symbols.map(symbol => `${symbol}.US`),
        }));
      }
    };
  }

  return () => {
    subscribers = subscribers.filter(cb => cb !== callback);
    if (subscribers.length === 0 && ws) {
      ws.close();
      ws = null;
    }
  };
};

const transformWebSocketData = (data: any): Record<string, MarketData> => {
  // Transform the WebSocket data to match our MarketData type
  return {};
};