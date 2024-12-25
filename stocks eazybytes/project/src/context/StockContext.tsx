import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { getQuotes, subscribeToQuotes } from '../lib/stockApi';
import type { MarketData } from '../types/market';

interface StockState {
  quotes: Record<string, MarketData>;
  loading: boolean;
  error: string | null;
}

type StockAction =
  | { type: 'SET_QUOTES'; payload: Record<string, MarketData> }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string };

const StockContext = createContext<{
  state: StockState;
  dispatch: React.Dispatch<StockAction>;
} | undefined>(undefined);

const stockReducer = (state: StockState, action: StockAction): StockState => {
  switch (action.type) {
    case 'SET_QUOTES':
      return { ...state, quotes: action.payload, loading: false };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

export const StockProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(stockReducer, {
    quotes: {},
    loading: true,
    error: null,
  });

  useEffect(() => {
    const symbols = ['AAPL', 'GOOGL', 'MSFT', 'AMZN'];
    
    const initializeQuotes = async () => {
      try {
        const quotes = await getQuotes(symbols);
        dispatch({ type: 'SET_QUOTES', payload: quotes });
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: 'Failed to fetch quotes' });
      }
    };

    const unsubscribe = subscribeToQuotes(symbols, (quotes) => {
      dispatch({ type: 'SET_QUOTES', payload: quotes });
    });

    initializeQuotes();
    return () => unsubscribe();
  }, []);

  return (
    <StockContext.Provider value={{ state, dispatch }}>
      {children}
    </StockContext.Provider>
  );
};

export const useStock = () => {
  const context = useContext(StockContext);
  if (context === undefined) {
    throw new Error('useStock must be used within a StockProvider');
  }
  return context;
};