import { useState, useEffect } from 'react'
import './App.css'
import CoinInfo from './components/CoinInfo';

function App() {
  const [coins, setCoins] = useState(null);
  const [error, setError] = useState(null);
  const API_Key = import.meta.env.VITE_APP_API_KEY;


  useEffect(() => {
    const fetchAllCoinData = async () => { 
      try {
        const response = await fetch(`https://min-api.cryptocompare.com/data/all/coinlist?api_key=${API_Key}`);
        if(!response.ok) {
          throw new Error (`HTTP Error! status: ${response.status}`);
        }
        const json = await response.json();
        console.log('🔍 API Response received:', json);
        console.log('🔍 First coin properties:', Object.keys(Object.values(json.Data)[0]));
        console.log('🔍 First coin full object:', Object.values(json.Data)[0]);
        setCoins(json);
      } catch(error) {
        setError(error.message);
      }
    }
    fetchAllCoinData();
  }, [API_Key]);


  return (
  <div className="whole-page">
    <h1>Crypto App</h1>

    {error && 
      <div className="error">
        {error}
      </div>
    }
    <ul>
      {coins && 
        Object.values(coins.Data)
        .filter((coin) => 
          coin.IsTrading && 
          coin.Algorithm !== "N/A" &&
          coin.ProofType !== "N/A"
        ).map((coin) => (
          <CoinInfo 
          key={coin.Symbol}
          image={coin.ImageUrl}
          name={coin.FullName}
          symbol={coin.Symbol}
          />
        ))}
    </ul>
  </div>
  )
}

export default App
