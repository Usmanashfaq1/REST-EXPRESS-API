import dotenv from "dotenv/config";
import axios from "axios";

// ✅ Ensure you're on Node.js 18+ to use native fetch
const API_KEY = process.env.COINGECKO_API_KEY;

// ⏱ Setup a timeout using AbortController
const getCryptoCoins = async () => {
  try {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets",
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "User-Agent": "crypto-tracker-server",
          Accept: "application/json",
        },
        params: {
          vs_currency: "usd",
          ids: "bitcoin,ethereum",
          order: "market_cap_desc",
          per_page: 100,
          page: 1,
          sparkline: false,
        },
        timeout: 5000, // ⏱ optional: fail after 5 seconds
      }
    );

    return response.data;
  } catch (error) {
    console.error("API request failed:", error.message);

  }
};


export default getCryptoCoins;


