import getCryptoCoins from "../services/cryptoCoins.js";

const getPrices = async (req, res) => {
  try {
    const prices = await getCryptoCoins();
    res.status(200).json(prices);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch crypto prices" });
  }
};

export default getPrices;
