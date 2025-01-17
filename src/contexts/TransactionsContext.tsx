import { ReactNode, useCallback, useEffect, useState } from "react";
import { api } from "../lib/axios";
import { createContext } from "use-context-selector";

interface Transaction {
  id: number;
  description: string;
  type: 'income' | 'outcome';
  price: number;
  category: string;
  createdAt: string;
}

interface CreateTransactionInput {
  description: string;
  type: 'income' | 'outcome';
  price: number,
  category: string,
}

interface TransactionContextType {
  transactions: Transaction[],
  fetchTransactions: (query?: string) => Promise<void>,
  createTransaction: (data: CreateTransactionInput) => Promise<void>
}

// eslint-disable-next-line react-refresh/only-export-components
export const TransactionContext = createContext({} as TransactionContextType)

interface TransactionsContextProps {
  children: ReactNode
}

export function TransactionsProvider({children}: TransactionsContextProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  
  const fetchTransactions = useCallback( async ( query?: string ) => {
    
    const response = await api.get('transactions', {
      params: {
        _sort: 'createdAt',
        _order: 'desc',
        q: query,
      }
    })
    setTransactions(response.data)
  },
  []
  )

  const createTransaction = useCallback( async ( data: CreateTransactionInput) => {
    const { category, description, price, type } = data

    const response = await api.post('transactions', {
      description,
      category,
      price,
      type,
      createdAt: new Date(),
    })

    setTransactions( state => [response.data, ...state])
  },
  []
  )
  
  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions])
  
  return (
    <TransactionContext.Provider value={{ 
      transactions, 
      fetchTransactions,
      createTransaction 
    }}> 
      {children}
    </TransactionContext.Provider>
  )
}