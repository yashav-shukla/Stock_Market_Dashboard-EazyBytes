import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { LoadingSpinner } from '../LoadingSpinner';
import { Plus, Trash2, Save } from 'lucide-react';

interface StockSymbol {
  id: string;
  symbol: string;
  name: string;
  enabled: boolean;
}

export const StockSymbolList: React.FC = () => {
  const [symbols, setSymbols] = useState<StockSymbol[]>([]);
  const [loading, setLoading] = useState(true);
  const [newSymbol, setNewSymbol] = useState({ symbol: '', name: '' });

  useEffect(() => {
    loadSymbols();
  }, []);

  const loadSymbols = async () => {
    try {
      const { data, error } = await supabase
        .from('stock_symbols')
        .select('*')
        .order('symbol');
      
      if (error) throw error;
      setSymbols(data || []);
    } catch (error) {
      console.error('Error loading symbols:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleSymbol = async (id: string, enabled: boolean) => {
    try {
      const { error } = await supabase
        .from('stock_symbols')
        .update({ enabled })
        .eq('id', id);
      
      if (error) throw error;
      setSymbols(symbols.map(s => 
        s.id === id ? { ...s, enabled } : s
      ));
    } catch (error) {
      console.error('Error updating symbol:', error);
    }
  };

  const addSymbol = async () => {
    try {
      const { data, error } = await supabase
        .from('stock_symbols')
        .insert([newSymbol])
        .select()
        .single();
      
      if (error) throw error;
      setSymbols([...symbols, data]);
      setNewSymbol({ symbol: '', name: '' });
    } catch (error) {
      console.error('Error adding symbol:', error);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Stock Symbols</h2>
        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="Symbol"
            value={newSymbol.symbol}
            onChange={e => setNewSymbol({ ...newSymbol, symbol: e.target.value.toUpperCase() })}
            className="border rounded px-3 py-1"
          />
          <input
            type="text"
            placeholder="Name"
            value={newSymbol.name}
            onChange={e => setNewSymbol({ ...newSymbol, name: e.target.value })}
            className="border rounded px-3 py-1"
          />
          <button
            onClick={addSymbol}
            className="bg-blue-500 text-white px-4 py-1 rounded flex items-center"
          >
            <Plus size={18} className="mr-1" /> Add
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Symbol
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {symbols.map((symbol) => (
              <tr key={symbol.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {symbol.symbol}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {symbol.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => toggleSymbol(symbol.id, !symbol.enabled)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      symbol.enabled
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {symbol.enabled ? 'Enabled' : 'Disabled'}
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => toggleSymbol(symbol.id, !symbol.enabled)}
                    className="text-blue-600 hover:text-blue-900 mr-3"
                  >
                    <Save size={18} />
                  </button>
                  <button className="text-red-600 hover:text-red-900">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};