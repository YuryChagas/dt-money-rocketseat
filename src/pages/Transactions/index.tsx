import { useEffect, useState } from "react";
import { Header } from "../../Components/Header";
import { Summary } from "../../Components/Summary";
import { SearchForm } from "./Components/SearchForm";
import { PriceHighLight, TransactionsContainer, TransactiosTable } from "./styles";

interface Transaction {
  id: number;
  description: string;
  type: 'income' | 'outcome';
  price: number;
  category: string;
  createdAt: string;
}

export function Transactions (){
  const [Transactions, setTransactions] = useState<Transaction[]>([])

  async function loadTransactions (){
    const response = await fetch('http://localhost:3000/transactions')
    const data = await response.json();

    setTransactions(data)
  }

    useEffect(() => {
      loadTransactions();
    }, [])

  return (
    <div>
      <Header/>
      <Summary/>
      
      <TransactionsContainer>
        <SearchForm/>
        <TransactiosTable>
          <tbody>
            {Transactions.map( transaction => {
              return (
                <tr key={transaction.id}>
              <td width='50%'>{transaction.description}</td>
              <td>
              <PriceHighLight variant={transaction.type}>
                  {transaction.price}
                </PriceHighLight>
              </td>
              <td>{transaction.category}</td>
              <td>{transaction.createdAt}</td>
            </tr>
              )
            })}            
          </tbody>
        </TransactiosTable>
      </TransactionsContainer>
    </div>
  )
}