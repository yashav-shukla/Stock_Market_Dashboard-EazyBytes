import { create } from 'zustand';
import { supabase } from '../services/supabase/client';
import type { PortfolioItem } from '../types/stock';

interface PortfolioState {
  items: PortfolioItem[];
  loading: boolean;
  addStock: (symbol: string, shares: number, price: number) => Promise<void>;
  removeStock: (symbol: string) => Promise<void>;
  fetchPortfolio: () => Promise<void>;
}

export const usePortfolioStore = create<PortfolioState>((set) => ({
  items: [],
  loading: false,
  addStock: async (symbol, shares, price) => {
    const { error } = await supabase
      .from('portfolio')
      .insert([{ symbol, shares, purchase_price: price }]);
    if (error) throw error;
  },
  removeStock: async (symbol) => {
    const { error } = await supabase
      .from('portfolio')
      .delete()
      .eq('symbol', symbol);
    if (error) throw error;
  },
  fetchPortfolio: async () => {
    set({ loading: true });
    const { data, error } = await supabase
      .from('portfolio')
      .select('*');
    if (error) throw error;
    set({ items: data, loading: false });
  },
}));