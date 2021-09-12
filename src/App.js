import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Coin from "./components/Coin";

// https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=1&sparkline=false

function App() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      )
      .then((resp) => {
        setCoins(resp.data);
        // console.log(resp.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="coin-app">
      <div className="coin-search">
        <h1 className="coin-text">Crypto Currency Tracker</h1>
        <form>
        <input
            type="text"
            placeholder="🔍search"
            className="coin-input"
            onChange={handleChange}
          />
        </form>
      </div>
      <div className="coin-container scroll">
        <div className="coin-row">
          <p className="coin-name text-color">Coin Name</p>
          <p className="coin-sym text-color">Coin Symbol</p>
          <p className="coin-price text-color">Coin Price</p>
          <p className="coin-vol text-color">Coin Volume</p>
          <p className="coin-per text-color">Inc/Dec Rate</p>
          <p className="coin-mkt text-color">Market Capitalization</p>
        </div>
      </div>
      {filteredCoins.map((coin) => {
        return (
          <Coin
            key={coin.id}
            name={coin.name}
            image={coin.image}
            symbol={coin.symbol}
            marketcap={coin.market_cap}
            price={coin.current_price}
            priceChange={coin.price_change_percentage_24h}
            volume={coin.total_volume}
          />
        );
      })}
    </div>
  );
}

export default App;
