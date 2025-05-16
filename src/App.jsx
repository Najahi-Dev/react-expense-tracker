import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [transactions, setTransactions] = useState(() => {
    return JSON.parse(localStorage.getItem('transactions')) || [];
  });
  const [text, setText] = useState('');
  const [amount, setAmount] = useState('');

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!text || !amount) return;

    const newTransaction = {
      id: Date.now(),
      text,
      amount: parseFloat(amount)
    };

    setTransactions([newTransaction, ...transactions]);
    setText('');
    setAmount('');
  };

  const income = transactions
    .filter(t => t.amount > 0)
    .reduce((acc, t) => acc + t.amount, 0);

  const expense = transactions
    .filter(t => t.amount < 0)
    .reduce((acc, t) => acc + t.amount, 0);

  const balance = income + expense;

  return (
    <div className='container'>
      <h1>💰 Expense Tracker</h1>
      <h3>Balance: ${balance.toFixed(2)}</h3>
      <div className='sep'></div>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder='Enter Description'
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <input
          type="text"
          placeholder='Enter Amount'
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button>Submit</button>
      </form>

      <div className="summary">
        <p>Income: ₹{income.toFixed(2)}</p>
        <p>Expense: ₹{Math.abs(expense).toFixed(2)}</p>
      </div>

      <ul className="list">
        {transactions.map((t) => (
          <li key={t.id} className={t.amount > 0 ? 'plus' : 'minus'}>
            {t.text}
            <span>₹{t.amount.toFixed(2)}</span>
            <button onClick={() => deleteTransaction(t.id)}>❌</button>
          </li>
        ))}
      </ul>

    </div>
  )
}

export default App
