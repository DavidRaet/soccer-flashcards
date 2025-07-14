import { useEffect, useState } from "react"
const CoinInfo = ({image, name, symbol}) => {
    const API_KEY = import.meta.env.VITE_APP_API_KEY
    const [price, setPrice] = useState(null);
    const [error, setError] = useState(null);
    useEffect(() => {
        const getCoinPrice = async () => {
            try {
                const response = await fetch(`https://min-api.cryptocompare.com/data/price?fsym=${symbol}&tsyms=USD&api_key=${API_KEY}`);
                if(!response.ok){
                    throw new Error(`HTTP Error! status: ${response.status}`);
                }
                const json = await response.json();
                console.log(`Price data for ${symbol}:`, json);
                setPrice(json);
            } catch(error) {
                setError(error.message);
            }
        }
        getCoinPrice();
    }, [symbol, API_KEY]);

    return (
        <div className="coin-panel">
            {price ? (
                <div>
                    <li className="main-list" key={symbol}>
                        <img src={`https://www.cryptocompare.com${image}`} alt={`Small icon for ${name} crypto coin`} />
                        {name}  
                        {price && price.USD ? `${price.USD} USD` : null}
                    </li>
                </div>
            ): (
                <div className="error">{error}</div>
            )}
        </div>
    )
}

export default CoinInfo