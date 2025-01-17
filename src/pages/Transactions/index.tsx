import { Header } from "../../Components/Header";
import { Summary } from "../../Components/Summary";
import { SearchForm } from "./Components/SearchForm";
import { PriceHighLight, TransactionsContainer, TransactiosTable } from "./styles";
import { TransactionContext } from "../../contexts/TransactionsContext";
import { dateFormatter, priceFormatter } from "../../utils/formatter";
import { useContextSelector } from "use-context-selector";


export function Transactions (){
  const transactions = useContextSelector(
    TransactionContext, 
    (context) => {
    return context.transactions
    }
  )

  return (
    <div>
      <Header/>
      <Summary/>
      
      <TransactionsContainer>
        <SearchForm/>
        <TransactiosTable>
          <tbody>
            {transactions.map( transaction => {
              return (
                <tr key={transaction.id}>
              <td width='50%'>{transaction.description}</td>
              <td>
              <PriceHighLight variant={transaction.type}>
                  {transaction.type === 'outcome' && '- '}
                  {priceFormatter.format(transaction.price)}
                </PriceHighLight>
              </td>
              <td>{transaction.category}</td>
              <td>{dateFormatter.format(new Date(transaction.createdAt))}</td>
            </tr>
              )
            })}            
          </tbody>
        </TransactiosTable>
      </TransactionsContainer>
    </div>
  )
}