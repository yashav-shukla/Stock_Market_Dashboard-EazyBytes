import { format } from 'date-fns';

export const formatCurrency = (value: number): string => {
  return `$${value.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

export const formatDate = (date: string): string => {
  return format(new Date(date), 'MMM d');
};

export const formatFullDate = (date: string): string => {
  return format(new Date(date), 'MMM d, yyyy');
};